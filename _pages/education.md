---
layout: page
title: education
permalink: /education/
description: Courses I've taken, with my notes.
nav: true
nav_order: 4
---

<p>Courses I've taken. Click a title to read my notes (where available).</p>

{% assign courses = site.courses | sort: "term" | reverse %}
<ul class="course-list">
{% for course in courses %}
  <li style="margin-bottom: 0.6rem;">
    {% if course.notes %}
      <a href="{{ course.url | relative_url }}"><strong>{{ course.title }}</strong></a>
    {% else %}
      <strong>{{ course.title }}</strong>
    {% endif %}
    {% if course.term %}<span class="text-muted"> — {{ course.term }}</span>{% endif %}
    {% if course.description %}<br><span class="text-muted">{{ course.description }}</span>{% endif %}
  </li>
{% endfor %}
</ul>
