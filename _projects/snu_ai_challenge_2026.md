---
layout: page
title: "SNU AI Challenge 2026: Storyline Frame Ordering"
description: Reordering shuffled story frames to match a natural-language caption. Finalist as team DeepRed, top 12 of 206 teams.
img: assets/img/projects/snu-ai-challenge-frame-order.svg
importance: 1
category: vision-language
github: https://github.com/Birmjune/2026_SNU_AI_Challenge_DeepRed
---

Team **DeepRed**'s entry to the [SNU AI Challenge 2026](https://snuaichallenge.github.io/),
hosted by Seoul National University and its Graduate School of Data Science.
We reached the finals as one of 12 teams out of 206, and placed 10th overall.

**Task.** Given a natural-language sentence describing a storyline and four
shuffled frames from that story, predict the position of each frame in the
correct temporal order. The benchmark targets multimodal comprehension: the
model has to ground the narrative in the visual scenes rather than pick up on
low-level frame cues.

The finals scored more than raw accuracy — data utilization (15), model design
(15), optimization (10), resource efficiency (10), and infrastructure cost (10)
all counted alongside the preliminary leaderboard, so the pipeline had to stay
cheap enough to run on a single consumer GPU.

## Approach

```text
Qwen3.6-27B base
  -> Aug-C training (3 epochs, LoRA)
  -> extra epoch on hard training samples
  -> final adapter
  -> permutation TTA (K = 7)
  -> submission
```

- **Two-stage LoRA fine-tuning.** The first stage trains on the augmented
  ("Aug-C") set for 3 epochs; the epoch-2 adapter then gets one more epoch on a
  mined hard subset.
- **Hard sample mining.** 1,132 training problems that our earlier models failed
  (276 flipped-to-wrong, 856 consistently wrong) form the second-stage set. The
  package verifies these never intersect validation or test.
- **Permutation TTA.** Inference scores K = 7 frame permutations and ensembles
  them, which is where most of the accuracy over a single forward pass comes
  from.
- **4-bit inference.** NF4 quantization brings the 27B model down to a single
  RTX 3090 (24 GB), at roughly 6.6 hours for the full test set.

**Data.** 9,058 train / 477 validation / 819 test problems, on a fixed split.
Training ran on one H100 80GB; inference on one RTX 3090.

## Reproducibility

The repository is a reproduction package rather than a research dump: pinned
base-model revision, SHA256-verified adapter releases, and a `verify_package.py`
that checks manifest integrity, label-coordinate consistency, split hygiene, and
weight identity before any GPU time is spent.

Code and instructions on [GitHub](https://github.com/Birmjune/2026_SNU_AI_Challenge_DeepRed).
