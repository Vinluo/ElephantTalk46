---
title: 'Signal Fields: A Calm Motion System'
description: 'Designing a layered background that feels alive without stealing focus from the words.'
pubDate: 'Jan 06 2025'
heroImage: '../../assets/blog-placeholder-1.jpg'
category: 'Visual Systems'
tags: ['motion', 'background', 'css', 'canvas']
readingTime: '6 min read'
featured: true
draft: false
---

A good ambient layer is more about restraint than spectacle. This entry tracks the setup for a
slow-moving background that lives behind the content grid. The rule: every motion must be subtle,
repeatable, and decoupled from the text itself.

## Baseline

Start with a light foundation so typography stays crisp. The base layer can be handled in CSS using
radial gradients and a low-opacity grid. The animated layer sits above it using a single canvas and
a handful of drifting nodes.

## Canvas drift

The canvas does not need to run heavy shader code. A few soft orbs with blended gradients do the
job. Update positions slowly, redraw only the orbs, and cap the device pixel ratio to avoid costly
repaints on large screens.

## Keeping it quiet

Use `prefers-reduced-motion` to shut animation down for those who want a static page. When the
browser requests reduced motion, draw the frame once and stop the loop.
