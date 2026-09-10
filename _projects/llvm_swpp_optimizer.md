---
layout: page
title: LLVM Optimization for a Custom Target Machine
description: A target-specific LLVM IR optimization pipeline combining custom arithmetic, memory, and loop transformations. 6th of 24 teams.
importance: 6
category: systems
github: https://github.com/Birmjune/swpp202601-team15
---

Team project for **Principles and Practices of Software Development** (SNU,
Spring 2026). Our team placed **6th out of 24 teams** in the final competition.

**Task.** Reduce program execution cost on the course's custom target machine
by optimizing **LLVM IR** before it is translated into SWPP assembly. The
compiler framework and backend were provided; the student project covered the
optimization stage.

Optimization has to reflect the target machine's cost model. An operation that
looks simpler at the IR level is not necessarily cheaper after lowering, and a
transformation can change which optimizations remain possible later in the
pipeline.

## Approach

Our pipeline combines standard LLVM optimizations with custom passes for the
target machine:

- **Arithmetic transformations.** Shift-to-multiply,
  logical-shift-to-division, and bitwise-AND-to-remainder transformations, plus
  parity tracking and a pass that arranges multiplication, division, or
  remainder operations next to addition or subtraction for backend fusion.
- **Memory transformations.** Passes for constant-sized allocations, global
  storage, redundant zero initialization, and target-specific load handling:
  constant-malloc-to-stack and global-to-stack transformations, alongside
  constant-global elimination.
- **Loop transformations.** Selective loop rotation, accumulator promotion, and
  custom loop unrolling, running alongside LLVM analyses and cleanup passes.
- **Standard LLVM passes.** Inlining, EarlyCSE, GVN, SimplifyCFG, and
  aggressive dead-code elimination simplify the IR around the custom
  transformations.

The optimizer also registers a **SWPP cost analysis**, which gives the
target-aware passes a common analysis interface.

## Pass ordering

Several passes have to run in a particular order:

1. **Global relocation runs late.** Global-to-stack conversion sits after the
   main optimization sequence, with a source comment explaining the interaction
   between formally undefined initial contents and physically zeroed storage.
2. **Load conversion follows relocation.** Target-specific load handling runs
   after global-to-stack conversion, so earlier transformations can still work
   with ordinary loads.
3. **Address rewriting is delayed.** Parity-based address transformations run
   late because the pointer-to-integer conversions they introduce can obscure
   pointer provenance for earlier analyses.
4. **Fusion preparation runs last.** The arithmetic adjacency pass sits at the
   end, so later IR transformations do not reorder operations before backend
   code generation.

## Result and scope

The team finished **6th of 24** in the course competition, on the course's
target machine and evaluation workloads. Nothing here implies equivalent
speedups on a general-purpose CPU.

The pipeline described above is the team's combined work. The surrounding
compiler infrastructure and backend belong to the provided course framework.

## Running the compiler

The repository documents a build using **LLVM 22.1.0**, CMake, and Ninja. Once
built, the compiler translates an LLVM IR file into SWPP assembly:

```sh
build/swpp-compiler input.ll a.s --verbose
```

The optional verbose output exposes IR for inspection. Tests run with `ctest`
from the configured build directory.

Code and build instructions on
[GitHub](https://github.com/Birmjune/swpp202601-team15). The
[optimization pipeline](https://github.com/Birmjune/swpp202601-team15/blob/main/src/lib/opt.cpp)
shows the pass composition and ordering.
