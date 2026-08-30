---
layout: page
title: "Afterglow: Turning an Event's Photos Back Into the Event"
description: A hackathon web app that collects photos from everyone at an event via QR code and replays them as an auto-generated highlight video. Entrepreneur Award at the 3rd SKYST Joint Hackathon.
img: assets/img/projects/afterglow-list.png
importance: 4
category: web
github: https://github.com/CSEneversleep/cns-next
---

Built over the **3rd SKYST Joint Hackathon** with team *CSE never sleeps* (four
people). The judges gave it the **Entrepreneur Award**, first place on the
business-idea criterion.

The hackathon's brief was unusual: listen to 신해철's *그대에게* and implement,
in code, the image it puts in your head.

We took the line *"이 세상 어느 곳에서도
나는 그대 숨결을 느낄 수 있어요"* and read it as a problem about memory: an event
is vivid while it happens and faint a month later, and the photos that would fix
that are scattered across everyone's phones.

**Afterglow** collects them back into one place and replays them.

{% include figure.liquid loading="eager" path="assets/img/projects/afterglow-list.png" class="img-fluid rounded z-depth-1" %}

<div class="caption">
    The gallery view, holding photos uploaded by everyone who attended.
</div>

## Flow

Create an event, and it gets a QR code. Anyone at the event scans it and uploads
straight from their phone, with no account and no app. The photos land in one
shared gallery, viewable as a grid, as a slideshow, or as a highlight video the
app generates on its own.

## The video is a recording of the page

The interesting part is how the highlight video gets made. There is no video
encoder and no rendering pipeline anywhere in the stack:

1. **GPT-4o tags every photo.** Each uploaded image is sent to the model, which
   returns seven keywords as strict JSON. The client is set to retry with
   exponential backoff, and a photo that fails to parse is dropped rather than
   allowed to break the batch.
2. **Photos group by keyword.** A photo tagged `햄버거` and `사람` joins both
   buckets, so each keyword becomes a themed slide.
3. **Each slide lays itself out.** A bucket of *n* photos is shown as a
   &radic;*n* &times; &radic;*n* grid, rounded down, with the overflow dropped, so
   the slide always fills cleanly whatever the count.
4. **The browser records itself.** framer-motion animates the transitions, and
   `captureStream(30)` plus `MediaRecorder` capture the live DOM node into a
   webm the browser hands straight back to the user.

Turning "generate a video" into "animate a page and press record" is the right
trade under a hackathon clock. It removes an entire class of infrastructure
(encoders, workers, a job queue, storage for renders), and the output is
indistinguishable to anyone watching it.

{% include figure.liquid loading="eager" path="assets/img/projects/afterglow-slide.png" class="img-fluid rounded z-depth-1" %}

<div class="caption">
    The slideshow view the recorder captures, over the animated star-field background.
</div>

## My part

I built the **gallery view** (the thumbnail grid and the modal that opens a photo
full size), the **slideshow** (shared with a teammate), and the **star-field
background** that runs behind the whole app.

The AI highlight-video feature was a teammate's; the backend, database, and Git
workflow were the team lead's.

## Stack

Next.js and React on the front, Firebase and S3 behind it, OpenAI for tagging and
the QRServer API for the codes.

Code on [GitHub](https://github.com/CSEneversleep/cns-next).
