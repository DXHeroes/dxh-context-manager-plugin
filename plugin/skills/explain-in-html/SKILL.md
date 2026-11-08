---
name: explain-in-html
description: Make one self-contained HTML page that explains a topic visually, with diagrams, connected steps, timelines and comparisons, and that opens offline from a file. Use when the user says "explain in html", "make a page about" or "visual explainer", or when a picture would explain a thing better than prose.
---

# Explain in HTML

*A good diagram is understood in a minute, where the same idea in prose takes ten.*

## What it achieves

One page a person opens from a file, on a laptop or a phone, and understands the topic from. The diagrams carry the explanation and the text supports them.

## What it touches

It writes one file, `_artifacts/<YYYY-MM-DD>_<slug>/index.html`, with today's date and a short slug of the topic. It reads what the topic needs: the files the user names, `_context/`, the code. It changes nothing else. Changes the user asks for afterwards go into the same page.

## The page

- **Self-contained**: the CSS in a `<style>` block, the diagrams as inline SVG or HTML and CSS. No external script, stylesheet, font or image, and no network request of any kind. It opens offline from the file.
- **Visual first**: connected steps, timelines, comparisons side by side, a labelled drawing of the parts. Each diagram has a caption that says what it shows.
- **Mobile width works**: the layout falls to one column on a narrow screen, every SVG scales through its `viewBox`, nothing scrolls sideways.
- **Plain words**: the user's language, short sentences, a `<title>` that names the topic.

## The style

The kit's own. Use these values as they are:

```css
:root {
  --bg: #F5F1E8;      /* warm cream background */
  --ink: #2B2A26;     /* text */
  --accent: #CC785C;  /* the one accent, terracotta */
  --line: #D9D2C5;    /* hairlines */
  --muted: #6B665C;   /* secondary text */
  --panel: #FFFFFF;   /* cards and panels, when the page needs them */
  --font-head: "Fraunces", "Iowan Old Style", Georgia, serif;
  --font-body: "Geist", "Segoe UI", system-ui, sans-serif;
}
```

Headings use `var(--font-head)`, the body uses `var(--font-body)`. The named fonts show when the machine has them, and the rest of each stack catches the page otherwise. The rest of the stylesheet uses these variables only, so the whole theme can be swapped in one place.

Generous space and hairlines. No shadows, no gradients. One accent, used sparingly to mark what matters.

## Honest content

Every claim that is not common knowledge says on the page where it comes from: a file, a document and its date, a person and a date. An estimate is labelled as an estimate. Never invent a number, a data point or a chart value. Where data is missing, the page says so. The sources are listed at the foot of the page.

## How it ends

Check the page as far as you can. Open it and look at it, at desktop and at phone width when you can. Check that nothing in it loads from outside the file, and that the only addresses in it are source links a reader may click. Say what you checked and what you could not check.

Return the path and one sentence on what the page shows.
