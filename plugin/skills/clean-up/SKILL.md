---
name: clean-up
description: Brings this folder's context to the current truth at the end of a session, consumes the handoff the session started from, and commits when git is on. Use when the user says "clean up", "wrap up", "close the session" or "end of session", or is about to stop.
---

# Clean up

*The session ends but what it learnt stays, written where the next session will look for it.*

## What it achieves

`_context/` says what is true now, so a fresh session can start from it and lose nothing. Run it alone when the work does not continue. When it continues, the handoff skill follows it.

## What it writes

Four things, and only the ones this session gave content to. A file with nothing new is left alone.
- `state.md`, rewritten where the picture changed, never appended to: the TLDR first, the open loops under it, and at the root the Projects list.
- `log.md`, today's lines added at the top, one per significant thing: `- <YYYY-MM-DD> <what happened> (<source>)`. Old entries are never edited.
- `decisions.md`, when something was decided that is hard to reverse, surprising without context and a real trade-off. With its why, numbered after the last entry. Numbers are never reused.
- The thread of this session's conversation, completed, with its row in `threads/_overview.md` current: file, topic, status (`open` or `closed`) and last session. A session that only processed inputs has no thread.

A new thread is `threads/<NNN>-<slug>.md`, the next number padded to three digits. One thread per topic, spanning sessions, one dated section per session. It starts:

```yaml
---
type: thread
title: <the topic>
started: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---
```

## At the root

Check the registry. Every path in `_context/projects.md` should still exist. A missing one is reported, never deleted: the user may have moved it. Then refresh the overview: the root's TLDR and its Projects list carry one line per project, what it is and what comes next with its date, taken from each project's own state TLDR (read it there, write nothing there). The root is the one place the user sees all their work at once, so it never says "nothing recorded yet" while projects exist.

## Keep it lean

Size is a feeling, not a count. A context file may run well past 400 lines. When one stops being readable in a few minutes, fold its old detail into its summary and log the fold with the reason. A thread past about 200 lines keeps its recent two or three sessions in full and the older ones as key outcomes. Keep whatever explains a live decision, a constraint, a risk or a failed attempt. Age alone is no reason to cut. The originals stay in `_inputs/processed/`.

## The handoff it started from

If this session started from a handoff, mark it consumed with two lines of its frontmatter:

```yaml
status: consumed
consumed_by: <YYYY-MM-DD> <one-phrase theme of this session>
```

Never delete or move a handoff. Once it is consumed, the Next line of the state's TLDR no longer points at it: rewrite that line to say what comes next now.

## Git

Only when `_context/about.md` says `git: on` and this folder is in a git repository: commit this folder's changes and nothing outside it, as `clean-up <YYYY-MM-DD>: <theme>`. No push unless the user has asked for one. Never rewrite history. Otherwise say nothing about git: the word does not appear in the report unless a commit was made.

## How it ends

Lead with one line the user can trust: the context is current and the work is safe. Then the files you wrote, by name, in plain words, and what is open. When the work continues, the last line says that "handoff" comes next. Never say that nothing changed when you wrote a file. When nothing needed writing, say that the context already held everything from this session. The kit's own words (fold, consume, thread, lifecycle) stay in the files; the reply says what happened to which file.
