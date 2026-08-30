---
layout: page
title: "SNU AI Challenge 2026: Storyline Frame Ordering"
description: Reordering shuffled story frames to match a natural-language caption. Finalist as team DeepRed, one of 12 teams out of 206.
img: assets/img/projects/snu-ai-challenge-task.png
importance: 1
category: vision-language
github: https://github.com/Birmjune/2026_SNU_AI_Challenge_DeepRed
---

Team **DeepRed**'s entry to the [SNU AI Challenge 2026](https://snuaichallenge.github.io/),
hosted by Seoul National University and its Graduate School of Data Science.
We reached the finals as one of 12 teams out of 206, and placed 10th there.

**Task.** Given a natural-language sentence describing a storyline and four
shuffled frames from that story, predict the position of each frame in the
correct temporal order. The benchmark targets multimodal comprehension: the
model has to ground the narrative in the visual scenes rather than pick up on
low-level frame cues.

{% include figure.liquid loading="eager" path="assets/img/projects/snu-ai-challenge-task.png" class="img-fluid rounded z-depth-1" %}

<div class="caption">
    The task, as illustrated by the organizers: four shuffled frames plus the caption
    "고양이가 의자에 올라가 낮잠을 잔다" (a cat climbs onto a chair and takes a nap),
    with the frames restored to their narrative order. Figure from the
    <a href="https://snuaichallenge.github.io/">SNU AI Challenge 2026 site</a>.
</div>

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
- **What the augmentation does.** Aug-C perturbs each example on both modalities:
  the frames get reshuffled into fresh permutations, and the caption gets cut into
  partial sentences. Both weaken the text shortcut — with only a fragment of the
  caption to work from, the model has to extract the ordering evidence from the
  images themselves rather than pattern-match on the sentence.
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
