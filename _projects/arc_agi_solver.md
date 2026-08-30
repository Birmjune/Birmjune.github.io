---
layout: page
title: Easy ARC-AGI Challenge Solver
description: An 8B LLM taught to read ARC grids one cell per token, then retrained on each puzzle at test time. 10th of 35 teams, 63/100 private.
img: assets/img/projects/arc-agi-007bbfb7.svg
importance: 2
category: deep learning
github: https://github.com/Birmjune/Easy-ARC-AGI-solver
---

Team project for **Basics of Deep Learning** (SNU, 2025 Spring). Out of 35 teams
we placed 7th on the public leaderboard and 10th on the private one, at 63/100.

**Task.** [ARC-AGI](https://arcprize.org/) (Abstraction and Reasoning Corpus)
shows a handful of input/output grid pairs, asks you to infer the transformation
rule they share, and then apply it to an unseen input. There is no training set
for the rule itself: each puzzle carries its own two or three demonstrations and
nothing else. This solver targets a tractable slice of the benchmark: grids up to
10&times;10.

{% include figure.liquid loading="eager" path="assets/img/projects/arc-agi-007bbfb7.svg" class="img-fluid rounded z-depth-1" %}

<div class="caption">
    ARC-AGI task 007bbfb7. The rule (copy the 3&times;3 pattern into every cell the
    pattern itself marks as filled) has to be inferred from the demonstrations, not
    from any label.
</div>

## Approach

The solver is a fine-tuned **Llama-3.1-8B-Instruct**, loaded in 4-bit through
unsloth. Four things do the work:

- **One cell, one token.** Grids are serialized as text, so tokenization decides
  whether the model can even see the geometry. We prune the embedding down to
  single-character tokens, which stops the tokenizer from merging runs of cells
  into arbitrary multi-character pieces and keeps row and column positions
  aligned across the sequence.
- **Data, where there is none.** A rule in ARC is defined by two or three
  demonstrations, which is not enough to fine-tune on. The loader takes the
  Re-ARC route instead: each source file holds many procedurally generated
  instances of a single rule, and it resamples them into 200 synthetic tasks per
  file, each one 6 demonstration pairs plus a held-out test pair. The model
  therefore meets the same rule across many different concrete grids rather than
  memorizing a handful.
- **Symmetry augmentation.** Every task is expanded under transposition,
  rotation, color permutation, and shuffling of the demonstration order. All four
  preserve the underlying rule, so they multiply a tiny dataset without teaching
  the model anything false; they also discourage it from latching onto a specific
  color or orientation.
- **Test-time training.** Each puzzle's own demonstrations become a
  leave-one-out training set, and the model takes a short fine-tune on them
  before it answers. This is the step that fits the ARC setting: the rule lives
  in those two or three pairs, so the cheapest way to learn it is to train on
  them directly rather than hope one forward pass generalizes.
- **Majority vote over augmentations.** At inference the same puzzle is solved
  under several augmentations and the answers are voted, which cancels the
  orientation- and color-specific mistakes a single pass makes.

LoRA runs at r = 256, &alpha; = 24 with rsLoRA, over the attention and MLP
projections plus `embed_tokens` and `lm_head`: the embedding matrix has to be
trainable because the token surgery above changed what the tokens mean.

Training used batch size 2 &times; 8 gradient accumulation, cosine schedule, lr 1e-4 with a
lower 1e-5 for embeddings, `adamw_8bit`. The adapter is then merged into the base
weights and re-quantized to 4-bit for inference.

A separate CPU worker runs in parallel with the GPU path, searching a set of
hand-coded patterns; whichever finishes first answers. It contributes little and
the repo notes it can be removed.

## Credit

The training harness is adapted from Daniel Franzen and Jan Disselhoff's
Apache-2.0 licensed ARC Prize 2024 solution; the token-pruning and augmentation
utilities in `arc/training_code/` carry their copyright headers.

Code and instructions on [GitHub](https://github.com/Birmjune/Easy-ARC-AGI-solver).
