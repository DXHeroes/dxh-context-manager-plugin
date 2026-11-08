---
name: handoff
description: Writes the starting point for the next session into _handoffs/ when the work continues, after clean up. Use when the user says "handoff", "hand off" or "write a handoff", or wants to pick the work up in a fresh chat.
---

# Handoff

*A fresh session remembers nothing, so the thread of the work is written down before this one ends.*

## What it achieves

The next session, told "continue where we left off", reads the state's TLDR and this file and carries on as if it had been here. Write one only when the work continues. It follows clean up: the context files already hold the truth, and the handoff carries only what they do not, the thread of the work. If this session has not been cleaned up yet, run the clean-up skill first and say so.

## The file

`_handoffs/handoff-<YYYY-MM-DD>-<HHMM>.md`, local time, 24 hour clock, the moment it is written, read from the system clock and never guessed. It starts:

```yaml
---
type: handoff
title: <what the next session continues, a short phrase>
status: open
created: <YYYY-MM-DDTHH:MM>
consumed_by:
supersedes: <file name of the open handoff this one replaces, or empty>
---
```

## The lifecycle

`status` is `open`, `consumed` or `superseded`. One open handoff per folder: a handoff here that is still `status: open` is flipped to `status: superseded` and named in `supersedes:`. A consumed one is left as it is. The next session's clean up marks this one `consumed`. Never delete or move a handoff.

## The body

- What was done.
- What is verified, and what is only assumed.
- Decisions taken and why. Those already in `decisions.md` are named by number, not retold.
- Dead ends: what was tried and why it failed, so nobody tries it again.
- What is next, in order.
- A reading map: relative links, from this file's place, to what the next session needs (`../_context/state.md`).
- A starting prompt the user can paste into a new chat, saying what the next session is for:

```
Continue where we left off: <what the next session is for>.
Handoff: _handoffs/handoff-<YYYY-MM-DD>-<HHMM>.md
```

No length cap, no padding. Nothing that `state.md` already says: link to it instead.

## The state's next line

Rewrite the Next line of the TLDR in `_context/state.md`, its label kept, so it names the next session's purpose and links the handoff:

```
<what the next session is for>, from [the handoff](../_handoffs/handoff-<YYYY-MM-DD>-<HHMM>.md)
```

## Git

As clean up does: only when `_context/about.md` says `git: on` and this folder is in a git repository, commit this folder's changes as `handoff <YYYY-MM-DD>: <theme>`. Otherwise say nothing about git.

## How it ends

The path of the new file and one sentence on what the next session is for.
