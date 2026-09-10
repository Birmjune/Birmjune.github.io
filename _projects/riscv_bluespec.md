---
layout: page
title: RISC-V CPU in Bluespec
description: From a four-cycle CPU to pipelined RISC-V processors, covering hazard handling, forwarding, and cache organization.
img: assets/img/projects/riscv-pipeline.svg
importance: 5
category: systems
github: https://github.com/Birmjune/RISC-V_BluespecVerilog
---

Course project for **Computer Architecture** (SNU, Spring 2025), implementing RISC-V processors in **Bluespec SystemVerilog (BSV)** through a sequence of architecture labs.

**Task.** Build progressively more capable processor implementations, moving from a non-pipelined CPU to overlapping instruction execution and a cached memory interface. Each step raises a different question: which operations can run concurrently, when an instruction has to wait, and what to do once the processor has already fetched instructions from the wrong path.

{% include figure.liquid loading="eager" path="assets/img/projects/riscv-pipeline.svg" class="img-fluid rounded z-depth-1" %}

<div class="caption">
    The five-stage pipeline: instruction fetch, decode, execute, memory access, and writeback. Each stage holds a different instruction, so up to five are in flight at once.
</div>

## Earlier labs

The earlier labs introduce hardware composition and pipelining on smaller designs:

- **Barrel shifter.** Construct a shifter from multiplexers, then implement a pipelined version.
- **FFT.** Implement folded and pipelined organizations of the same computation, covering different ways to spread hardware work over time.
- **Four-cycle CPU.** Implement a non-pipelined RISC-V processor as the starting point for the later pipeline designs.

## Pipeline designs and hazards

The processor labs then work through three designs:

| Design | Main focus |
| --- | --- |
| Three-stage pipeline | Handling control hazards using epochs |
| Five-stage pipeline with a scoreboard | Tracking dependencies to handle data hazards |
| Five-stage pipeline with forwarding | Passing results to dependent instructions before register writeback |
{: .md-table}

**Control hazards.** A branch can invalidate instructions already in flight. The epoch-based designs distinguish instructions belonging to the current execution path from those that have to be discarded.

**Data hazards.** Overlapping instructions can need values that earlier instructions have not yet written back. The two five-stage variants use scoreboard-based handling and forwarding respectively, which makes the treatment of dependencies an explicit design choice.

## Cache organization

The final lab adds a local cache to a three-stage processor and measures **cache miss rate and execution cycles** while varying block size and associativity. Those numbers hold for the provided workloads; they do not establish a best cache configuration in general.

## Scope

The repository holds coursework implementations built on materials and labs provided by the SNU Computer Architecture course. It documents several processor designs, not one finished CPU, and the README carries no consolidated performance comparison, so no aggregate speedup is claimed here.

The RISC-V launcher compiles with `./risc-v -c` and runs with `./risc-v -r`.

Code and lab descriptions on [GitHub](https://github.com/Birmjune/RISC-V_BluespecVerilog).
