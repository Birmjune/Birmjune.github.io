---
title: CS
layout: archive
permalink: /CS
author_profile: true
sidebar:
  nav: sidebar-category
---

{% assign posts = site.categories.CS %}
<p>{{ posts.size }} posts in this category</p>

{% for post in posts %}
  {% include archive-single.html type="page.entries_layout" %}
{% endfor %}
