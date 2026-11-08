---
name: grill-me
description: Interview the user about a plan or a design, in rounds of numbered questions, until you both share one understanding of it and nothing rests on a guess. Use when the user says "grill me", "grill me fast", "grill me mid", "grill me long" or "stress-test this plan".
---

# Grill me

*A plan questioned before the work starts costs far less than one questioned halfway through.*

This interview is how a finished plan gets the questions a team would ask at refinement, before the work starts.

## What it achieves

You and the user end with the same picture of the plan. Every decision in it was made by the user, out loud, and nothing is silently assumed.

## What it touches

It reads the plan or design the user points to, often in `_artifacts/`, then `_context/state.md`, `_context/decisions.md` and anything else in this folder a question needs. It writes nothing of its own while the interview runs. The conversation goes into `_context/threads/` as any real conversation does.

## The level

One word from the user sets it. Without one, use mid.

- **fast**: one round, the questions whose answers would reshape the plan most.
- **mid**: round after round along the frontier, until nothing is silently assumed.
- **long**: every branch, including the small ones you would otherwise settle with a sensible default.

## The interview

Map the plan as a tree of decisions. Each decision branches into the decisions that hang off it. The frontier is every decision whose prerequisites are settled: the questions you can ask now without guessing at answers you have not heard yet.

Ask the whole frontier in one round, then wait for the answers. A question that depends on another open question in the same round belongs to a later round. Each answer moves the frontier, so work it out again before the next round. If the user asks for fewer questions per round, down to one, keep to that for the rest of the session.

Number the questions across rounds, so a number always means the same question. Each question takes this shape:

```
Q7. Who signs off the cut-over date?
Goal: the plan says the move must not stop the month-end close.
A. The finance lead
B. The project owner
C. Both, in writing
Recommended: C, because the close is finance's risk and the date is the project's.
```

The question sits on one line. The options follow one per line, where there are options. The recommendation stands on its own line, with its reason.

## Root every question

Tie each question to the goal of the plan, or to `_context/state.md` when the plan states none. That is the line under the question, so the user sees why it is asked. A question you cannot tie to the goal is asked as keep or cut, nothing more:

```
Q12. Keep or cut: a dark mode for the report page?
A. Keep
B. Cut
Recommended: B, because the goal names no reader who needs it.
```

## Facts are yours, decisions are theirs

Find facts yourself, in the files of this folder, the code and the context. Never ask the user for something you can read. A fact you are still looking up holds back only the questions that depend on it, so ask the rest now.

The decisions are the user's. Put each one to them and wait. Where fast or mid leaves a small branch to a default, say which default you took.

## How it ends

At fast, the interview ends after its one round. At mid and long, it ends when the frontier is empty: every branch visited, nothing silently assumed. Say so, and sum up in a few lines what was decided and which defaults you took.

Then offer to fold the answers in: each decision with its why into `_context/decisions.md`, the changed picture into `_context/state.md`, and the answers into the plan or spec in `_artifacts/`. Do not act on the plan, and do not fold anything, until the user says so.
