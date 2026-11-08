---
type: readme
title: "DXH Context Manager"
version: "2.0.0"
---
# DXH Context Manager

*This guide tells you why each piece of the kit exists, so you can use it well and the agent can check what the kit would do.*

The kit is a small folder convention and eight skills. With it, a coding agent carries the context of your work from one session to the next, and you never write or manage that context by hand. The agent reads it, writes it and keeps it short. One folder shape serves this root and every project inside it. Along the way the kit teaches how language models work, because the reason behind each piece is a lesson in itself.

This copy is yours to build around and make your own. Nothing is ever pushed into your files. The skills come from the DXH Context Manager plugin, and a new version of them reaches you when you update the plugin.

## Start here

1. **Install the plugin, open an empty folder and say "set up".** Install the DXH Context Manager plugin (`ctx`) in your tool, as github.com/DXHeroes/dxh-context-manager-plugin shows. Open an empty folder as the workspace root, not a folder above it. When the tool asks whether you trust the folder, say yes. Then say "set up" ("init" works too, as a word, but not as `/init`, which is your tool's own command), and the setup skill makes that folder your root. The first "set up" and the first "new project" ask once to read the plugin's own folder, where the starting files are: allow it.
2. **Answer four questions, once.** Right after setup, the agent asks whether to use git here, which language to talk in, who you are and what you work on. The agent writes the answers into `_context/about.md`, offers a two-minute look around, and never asks again.
3. **Say "new project".** Describe the work in a sentence or two. The agent makes a project folder under `projects/`, or wherever you point it, and lists it in `_context/projects.md`.
4. **Open the new project on its own.** In VS Code, open a new window, choose "Open Folder" and pick the project folder. In a terminal tool such as the Codex CLI, open a new terminal in the project folder and start the tool there. Each project is its own workspace. Work there in plain words. When you have notes or documents, drop them into `_inputs/` and say "process".
5. **Say "clean up" when you stop.** If the work continues, say "handoff" after it.

**Next time, say "continue where we left off".** The agent reads the state and the open handoff, then picks up where the last session ended.

## The story

**Context is the key.** A language model predicts the next word from what is in front of it, and from nothing else. Poor input gives poor output, however good the model is. Ask for a website without saying what it is for, and you get a website you do not want.

**Context has a cost and a shape.** More is not always better. The wrong kind bloats a session and pulls the model's attention away from the task. A session that runs past several hundred thousand tokens gets worse the longer it goes. When the tool compacts a long session to make room, it picks what to keep, and you have no say in it.

**So work in fresh sessions and keep the knowledge in files.** A fresh session spends its sharpest attention on the task in front of it. A file outlives every session. Many sessions, agents and sub-agents can read it, point at it and build on it. A few plain rules about those files do most of the work, about 80 % in the author's experience.

**"But I don't want to write and manage that context myself."** Nobody does, and managing context by hand can cost more time than the agent saves. That is why the kit exists. You open a chat in the work folder and say what you want. When you stop, you say "clean up", and "handoff" if the work goes on. Next time you say "continue where we left off". For a new piece of work you say "new project". The agent does the writing.

**Every question you raise along the way is a problem you have already met.** Why does the agent forget what we agreed yesterday? Why did that long chat go strange at the end? Why do I keep explaining my job to it? The kit names each of these and shows the fix. The rest of this guide is those answers.

## The loop

Four words carry the whole method: "new project", "process", "clean up" and "handoff". You say "new project" once for each piece of work. After that the loop is the same every day.

```
          "new project"         once, for each piece of work
                |
                v
   +---> talk and work ........ drop sources into _inputs/, say "process"
   |            |
   |            v
   |       "clean up"           the context brought to the current truth
   |            |
   |            v
   |       "handoff"            only if the work continues
   |            |
   |            v
   +---- new chat ............. "continue where we left off"
```

- **Talk and work.** Say what you want in plain words. Every deliverable lands in `_artifacts/`, in a folder named by date and topic, so nothing runs loose around the folder.
- **Process.** When you have sources, such as notes, an email, a document or a meeting transcript, drop them into `_inputs/` or paste them into the chat. Say "process". The agent folds them into the context and keeps the originals.
- **Clean up.** At the end of a session the agent brings the state, the log, the decisions and the record of the conversation up to date. If the work does not continue, this is the last word.
- **Handoff.** If the work continues, the agent writes the starting point for the next session: what was done, what is open, what to read first. There is one open handoff per folder.
- **Continue where we left off.** In a new chat the agent reads the state and the newest open handoff, decides what else it needs, and carries on. The next clean up marks that handoff as consumed.

Everything else is a helper you reach for when you need it: "grill me", "explain in html" and "deep research".

## What you can say

Plain words are enough, in every tool. You need no command. If you like one, the skills are also `/ctx:<name>` in Claude Code and in Copilot in VS Code, and `/<name>` in the Copilot CLI. In Codex you type `$` to mention a skill, and it is listed as `ctx:<name>`.

| Say | What happens | What it writes |
|---|---|---|
| **"set up"**, or "init" | Makes the folder you are in the root, once. Copies the root's files from the plugin and overwrites nothing that is already there, then starts the first opening. If the folder already has an `AGENTS.md` or `CLAUDE.md`, it says what it will add to it and waits for you to type "go". In a folder that is already a root or a project, it says so and stops. | `AGENTS.md`, `CLAUDE.md`, this guide, `_context/` with the registry, and the empty folders `_inputs/`, `_artifacts/`, `_handoffs/` and `projects/` |
| **"new project"**, or "seed this folder" | Asks once for a name and a line on what the work is. The folder goes under `projects/` unless you name another place. Makes the folder from the plugin's blank project and copies the instructions and `about.md` into it. For a folder you already have, it adds only what is missing and overwrites nothing. Before it touches your own instructions file, it says what it will add and waits for you to type "go". | The project folder and its first state, or the missing entries and one marked block in your instructions file. A row in `_context/projects.md` either way. |
| **"process"** | In a project, folds every file in `_inputs/`, or what you pasted, into the context. At the root, sends each file to the project it belongs to. | `state.md`, `decisions.md` and `log.md`, with the originals moved to `_inputs/processed/` unchanged |
| **"clean up"** | Brings the context to the current truth at the end of a session. Folds old detail when a file has grown hard to read. Marks the handoff this session started from as consumed. Commits if git is on. | `state.md`, `log.md`, `decisions.md`, the session's thread and `threads/_overview.md` |
| **"handoff"** | Said only when the work continues. Writes the starting point for the next session, with a short prompt you can paste into a new chat. | `_handoffs/handoff-<YYYY-MM-DD>-<HHMM>.md` with `status: open` |
| **"grill me"**, with "fast", "mid" or "long" | Interviews you about a plan until you both understand it the same way. Numbered questions, options where there are options, and a recommended answer for each. "fast" is one round, "mid" is the default, "long" covers every branch. | Nothing until you agree. Then the answers go into `decisions.md`, the state and the plan. |
| **"explain in html"** | Makes one visual page on a topic, with diagrams, that opens offline from a file. | `_artifacts/<YYYY-MM-DD>_<topic>/index.html` |
| **"deep research"** | Runs a sourced investigation, about 30 minutes unless you set another budget. Says what it read, what it inferred and what it could not reach. | `_artifacts/<YYYY-MM-DD>_<topic>/report.md`, and nothing in `_context/` until you say "process" |
| **"continue where we left off"** | Not a skill. The agent reads the state and the newest open handoff, then carries on. | Nothing until you work |
| **The first opening** | Not a word you say. It happens once, when `about.md` says `onboarded: false`. The agent asks four things in one message (git, language, who you are, what you work on) and offers a look around. | `_context/about.md`, and a first commit if you chose git |

## The folders

The root is the folder you opened first. It looks like this.

```
<root>/
  AGENTS.md                    the always-on instructions, the same in every project
  CLAUDE.md                    a pointer that sends Claude Code to AGENTS.md
  README.md                    this guide
  _context/
    state.md                   the current picture, summary first
    log.md                     what happened, dated, newest first
    decisions.md               what was decided, and why
    threads/_overview.md       what was discussed, one file per topic
    about.md                   you, your company, your machine, how you work
    projects.md                the registry: your projects and where they live
  _inputs/                     drop sources here, then say "process"
    processed/                 the originals, kept unchanged
  _artifacts/                  every deliverable, in a dated folder
  _handoffs/                   the starting points for the next session
  projects/                    where new projects go unless you say otherwise
```

A project looks like this, wherever it lives.

```
<project>/
  AGENTS.md                    a copy of the root's instructions, with CLAUDE.md beside it
  _context/                    state.md, log.md, decisions.md, threads/, about.md
  _inputs/                     sources to fold in, and processed/ for the originals
  _artifacts/                  the project's deliverables
  _handoffs/                   the project's starting points
```

- **Five entries make a project complete.** `AGENTS.md` with `CLAUDE.md` beside it, `_context/`, `_inputs/`, `_artifacts/` and `_handoffs/`. With these, a project works on its own.
- **A torn-away project keeps working.** Move it, zip it or take it to another machine. Nothing in it points back to the root.
- **A folder you already have can be seeded.** At the root, say "seed this folder" and give its path. The same five entries are added to it, and nothing that is there is overwritten.
- **The root is the one folder with more.** It also has the registry and this guide. That is how you and the agent tell it apart.

The underscore keeps the kit's folders together in your file explorer, apart from your own. `_context/` holds what is true. Its `threads/` folder holds what was discussed, so the reasoning behind a decision is not lost. Every Markdown file the agent writes starts with a short YAML header, such as `type:` and `title:`, which both the agent and a simple script can read. One small pointer file, `CLAUDE.md`, sends Claude Code to `AGENTS.md`. Codex and Copilot read `AGENTS.md` on their own.

## Two kinds of context

Context comes in two kinds, and the kit treats them in opposite ways.

| | Informational context | Instructional context |
|---|---|---|
| **What it is** | Facts about the world of the work | Directions on how to do the work |
| **Examples** | Who you are, your company and product, the people, the history, the decisions and their why, the tools you can reach, how you like to work | Which script to run, which call to make, which step comes in which order, checklists and gates |
| **Where it lives** | `_context/`, `about.md`, the processed inputs, the handoffs | `AGENTS.md` and the skills |
| **The rule** | More is better, within reason. It grows, and clean up keeps it readable. | Less is more. It says what and why, never how, and shrinks as models get stronger. |

Informational context pays even on small tasks. A bug fix goes better when the agent knows who you are, which company, which product and why it exists. A detail that looks irrelevant, such as a resource your company can reach, is often what lets the agent find its way.

Instructional context works the other way. A strong model knows how to do most things better than a list of steps written in advance. A procedure that helps one task boxes in the next one, and bloated instructions lead to nonsense. That is why `AGENTS.md` is short, and why each skill describes the outcome and the files it touches rather than a procedure. When you change the kit, add information freely and instructions sparingly.

## Why this works

- **The model is stateless.** Each session starts with nothing but what it is given. Files are its memory, and the kit decides which files exist and what goes in them.
- **Long sessions degrade, and compaction is not yours to steer.** So each session starts fresh and stays sharp. The handoff carries the thread to the next one, written while the agent still has the whole session in front of it.
- **Every fact says where it comes from.** A file, a person and a date, or what you said and when. The agent marks what it infers and writes *not yet known* rather than guess. You can check any claim.
- **Overviews come first.** Every context file opens with a short summary. The agent reads the summaries, then only the depth the task needs. A summary carries the idea even when the words would not match a search, so it finds what a keyword search misses.
- **The originals are kept.** Every processed source stays in `_inputs/processed/`, unchanged. A summary can always be checked against its source.
- **You can open every file the agent knows.** Hosted chat memory keeps something, somewhere, under rules you cannot read. Here everything is a plain file. When you know good things went in, you have less to check in what comes out.

## The root, the projects and far-away folders

People who used earlier versions of this kit got three things wrong. Each has a plain answer.

### There is no connection to keep

People moved a project out of the root and feared they had broken something. Nothing breaks. A project carries its own instructions and context, copied when it was made and changed only by you. The skills come from the plugin, the same in every project. Nothing links back to the root, so a moved root strands nobody. Open each project on its own, the project folder as the workspace root or as the terminal's folder. The agent works inside the folder it was opened in. Some tools load a parent folder's instructions on their own; the agent treats them as not applying.

### A project can live anywhere

A repository sits where it sits. When you say "new project" or "seed this folder", you can give any path on the machine. The agent copies the files there with its own file tools, which works on Windows, macOS and Linux with nothing else installed. It then adds the path to the registry, `_context/projects.md`. From then on the root knows the folder, and you see all your projects in one list. If you move a project later, edit its line in the registry. Clean up at the root reports a path that no longer exists.

### One place can feed many projects

The root's `_inputs/` is the intake for every project. Picture a small script, which an agent can write for you, that runs every morning. It saves the Jira tasks that changed and the Confluence pages someone edited as Markdown files into the root's `_inputs/`, each with a short YAML header.

At the root you say "process". The agent sends each file to the project it belongs to, by the `projects:` line in its header, or else by its content against the one-line descriptions in the registry. A file that fits nowhere stays where it is and is reported. When you next open a project and say "process", its agent is up to date.

The idea is the lesson. Context goes where it belongs, and the registry is the map. It works where a company would never let a tool read everyone's mail, because you choose what the script drops. The kit adds nothing more: no tags beyond `projects:`, no taxonomy table, no schedule of its own.

### One person per project folder

This version assumes one person per project folder. A team that shares one repository would also share one state and one open handoff, and the kit has no rules for that. It is a question for a more advanced setup, named here so you do not find it out the hard way.

## Principles

The kit stands on fourteen principles, numbered from zero because zero is the one the others serve. Each has its reason and the place you can see it at work. A short version sits in `AGENTS.md`, so the agent can correct itself against it.

**0. The agent always has what it needs, and asks nothing extra of you.**
- Why: you cannot predict which piece of context a task will need, and handing over everything dilutes the agent. So the files are shaped for the agent to find what it needs.
- You see it in: every folder has a file the agent reads first, and no step of the loop asks you to write context.

**1. Context is everything.**
- Why: the model predicts the next word from what is in front of it. Poor input gives poor output, and the rest stands on this.
- You see it in: the kit itself, and the first line of the story above.

**2. More informational context, within reason.**
- Why: models and their windows are now large enough that every piece of real information pays, even on a small task.
- You see it in: `about.md` and the state name the person, the company and the goal in a few lines, and nothing is thrown away for being old.

**3. Less instructional context, so the agent is not boxed in.**
- Why: telling a strong model exactly which step to take is counterproductive, and more so as models improve.
- You see it in: a short `AGENTS.md` that says what and why, and skills that describe the outcome, not a procedure.

**4. The manager does the processing, not you.**
- Why: managing a lot of context by hand costs more than the agent gives back. Models are good at processing information, and context management is information processing.
- You see it in: the agent rewrites the state, folds the inputs, writes the handoffs and keeps the overviews current. You only say when.

**5. Few actions, few folders, few rules.**
- Why: think of a microwave with one knob for heat and one for time. Anyone uses it at once. The light versions of this kit showed that people adopt what is that simple.
- You see it in: four daily words, a tree you can hold in your head, and the kit's folders grouped by an underscore.

**6. Determinism where it pays.**
- Why: a little rigidity helps you and the agent and costs nothing. A folder named by date and topic tells you when and what for. A YAML header lets both the agent and a script read a file.
- You see it in: the `_artifacts/<YYYY-MM-DD>_<topic>/` folders and the header on every Markdown file.

**7. Tool, licence and hardware agnostic, with one plugin to install and nothing else.**
- Why: companies block installs and outside services, and a kit that depends on them is useless there. So the kit asks for one plugin in the tool you already use, and nothing more.
- You see it in: plain Markdown and the shared skills standard, with no hook, server or outside service. The plugin brings the skills and is the only part that knows your tool. The folders are plain files that work without it.

**8. Self-nesting and self-contained.**
- Why: people tear projects away, move the root and seed repositories they already have. A project that reads its skills from the root by a link breaks the first time the root moves.
- You see it in: one folder shape for root and project, instructions copied once and changed only by you, skills that come from the plugin, and a registry that only lists paths.

**9. You can see what the agent knows.**
- Why: you learn to trust a model by seeing what it had in front of it. When good things went in, you need not check everything that comes out.
- You see it in: every fact the agent holds is in a file you can open, with its source named.

**10. Overviews first, depth on demand.**
- Why: reading everything spends the attention the task needs. A short summary tells a smart reader whether to go deeper.
- You see it in: a TLDR at the top of every context file, and an overview file for the threads.

**11. It keeps itself lean.**
- Why: context that grows without limit stops being useful.
- You see it in: at clean up the agent folds old detail into its summary once a file stops being readable in a few minutes, and logs the fold. Size is a feeling, not a line count.

**12. It carries its own principles.**
- Why: an agent that knows the principles can correct itself and improve the kit along them.
- You see it in: the short list in `AGENTS.md`, this section, and habits such as writing the why next to the what.

**13. It teaches by its story.**
- Why: the reason behind each piece explains how language models work better than a lecture, and it works without a trainer in the room.
- You see it in: this guide and the one-line why at the top of every file.

## This copy

Version 2.0.0.

Made by DX Heroes

The rules in `AGENTS.md` and everything in `_context/` are yours. Change the instructions, add a skill of your own, drop what you do not use. When you do, keep the two kinds of context in mind. The skills come from the plugin and update when you update it. When a skill of your own has the same name as one of the plugin's, `AGENTS.md` tells the agent to use yours. A later version brings "upgrade", which refreshes only the marked block of rules in `AGENTS.md`, and only after asking.

The files follow the same approach as a published open format, the Open Knowledge Format (Google Cloud, version 0.2, June 2026, github.com/GoogleCloudPlatform/open-knowledge-format). It is a folder of Markdown files, each with a small YAML header, and overview files read first. The kit keeps its own header keys and does not depend on the format. Any tool that can open a text file can read everything here.
