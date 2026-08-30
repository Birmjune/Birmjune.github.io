---
layout: page
title: "Image2Answer: 4-Option MCQ Solver"
description: A CLIP-then-VLM cascade for image multiple-choice questions. One of 41 finalists out of 1,483 entrants at SCPC 2025.
img: assets/img/projects/image2answer-demo.png
importance: 3
category: vision-language
github: https://github.com/Birmjune/Image2Answer-4optionMCQ
---

Submission for the **Samsung Collegiate Programming Challenge (SCPC) 2025, AI
track**, which reached the finals as one of 41 finalists out of 1,483 entrants.

**Task.** Read an image and a question about it, then pick one of four written
options. The model must emit a single character: `A`, `B`, `C`, or `D`.

{% include figure.liquid loading="eager" path="assets/img/projects/image2answer-demo.png" class="img-fluid rounded z-depth-1" %}

<div class="caption">
    The worked example from the repo. All four options are plausible reasons to work
    out, so the text alone cannot separate them; the gym floor in the image is the
    only evidence that picks (A).
</div>

## The constraint shaped the solution

Two rules defined the problem more than the task did:

- the whole solution had to stay under **3B parameters**, and
- every public model in it had to have been **released before 2024**.

That rules out reaching for a large modern VLM and calling it done. The budget
buys roughly one small VLM, and a small VLM asked to answer every question
outright is mediocre at it.

So the pipeline spends its parameters unevenly. A cheap, high-precision model
answers the questions it is sure about, and the expensive one is reserved for the
rest.

## Pipeline

**1. CLIP, with an abstention rule.** `EVA02-L-14-336` (open_clip, `merged2b_s6b_b61k`)
encodes the image and all four option strings, and scores them by cosine
similarity. Each image is run through several test-time augmentations. The answer
is accepted only when every augmentation agrees *and* the mean softmax margin
between the top two options exceeds 0.4. Otherwise CLIP abstains and returns
nothing.

This is the load-bearing idea. CLIP alone is a weak MCQ solver, because many
options are semantically close and it has no notion of a question. But when it
is *confident and stable under augmentation*, it is right often enough to trust.
The threshold turns a mediocre classifier into a precise filter.

**2. MobileVLM-1.7B on what's left.** Only the abstained questions reach the VLM,
which sees the image and a prompt that lists the four options and demands a
single letter. Decoding is greedy (temperature 0, one beam), since the output is
one token of signal and sampling only adds variance.

**3. Snapping stray answers back.** A 1.7B model does not always obey "answer
with one letter". If the output isn't a bare `A`–`D`, the first character is
tried; failing that, `all-MiniLM-L6-v2` embeds the generated text and the four
option strings and picks the nearest option by cosine similarity. This recovers
answers that were correct in substance but wrong in format.

The three models together stay inside the parameter ceiling, and each one is only
asked to do the part it is actually good at.

## Running it

Images go in `/open`, alongside a CSV with `img_path, Question, A, B, C, D`.
Weights for EVA02 and MobileVLM-1.7B go in `/models`. `Inference_final.ipynb`
runs end to end.

Code and details on [GitHub](https://github.com/Birmjune/Image2Answer-4optionMCQ).
