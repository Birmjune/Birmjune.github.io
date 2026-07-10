---
layout: page
title: Projects
permalink: /projects/
description: A collection of things I've built.
nav: true
nav_order: 3
---

<div class="projects">
{% assign sorted_projects = site.projects | sort: "importance" %}
<div class="row row-cols-1">
  {% for project in sorted_projects %}
    {% include projects_horizontal.liquid %}
  {% endfor %}
</div>
</div>
