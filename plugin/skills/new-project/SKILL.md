---
name: new-project
description: Creates a new project folder from the blank project template, or seeds a folder the user already has with the five entries of a project, and registers it at the root. Use when the user says "new project", "create a new project", "start a project", "seed this folder" or "seed this repo", or wants the kit in a repository they already work in.
---

# New project

*Each piece of work gets a folder of its own, so every chat starts oriented and nothing from other work leaks in.*

## What it achieves

A folder that works on its own from its first chat. Five entries make it whole: `AGENTS.md` with its pointer files, `_context/`, `_inputs/`, `_artifacts/` and `_handoffs/`. The root's registry knows where it is. Nothing in it links back to the root, so it keeps working when moved or torn away.

This runs at the root, where `_context/projects.md` is. Opened in a project, say that new projects are made from the root's window. Make a nested one only when the user names that path explicitly.

## Blank: a new folder

Ask once, in one message, for what the user has not given: the project name and one to three sentences on what it is. Ask nothing else. The folder goes to `projects/<slug>/` under this root unless the user names another path, and any path on the machine is fine. The slug is the name in lower case ASCII with hyphens.

Refuse a destination that already exists, and offer the seed branch for it.

- Copy the `templates/project/` folder beside this file to the destination and replace its three placeholders in every file that came from it: `{{PROJECT_NAME}}`, `{{PROJECT_DESCRIPTION}}` and `{{DATE}}` (today, `YYYY-MM-DD`). None may be left. Copy with one plain copy command where the tool allows it without asking. If the command is refused or needs an approval, do not retry it and do not copy through a temporary folder: read each template file and write it unchanged into place. A refused copy command is not a refused read. Only when reading a template file itself is refused, name the plugin's folder in one line, ask the user to allow reading it, and continue once they have. Never ask the user to copy anything by hand.
- When the templates cannot be found beside this file, look for this plugin's installed copy: in Claude Code under `~/.claude/plugins/cache/dxh-context-manager/ctx/<version>/`, in Codex under `~/.codex/plugins/cache/dxh-context-manager/ctx/<version>/`, in the Copilot CLI under `~/.copilot/installed-plugins/dxh-context-manager/ctx/`. Use `skills/new-project/templates/project/` inside it, and name the path you used. If none is there, say so and stop.
- Copy from this root, as they are here: `AGENTS.md`, the pointer files beside it that send a tool to `AGENTS.md` (`CLAUDE.md`, and any other the user added), and `_context/about.md`.
- Write the first TLDR of the new `_context/state.md` from the description: what this is, that it was just created, no open loops yet, what comes next.

## Seed: a folder the user already has

A repository they work in, or an AI setup they built. Ask where it is, and for one line on what it is when the folder does not say so itself.

Copy in what is missing of the five entries, made as in the blank branch, the pointer file beside the instructions included, with the folder's own name as the project name. Never overwrite a file that exists. A skill of theirs with the same name as one of the kit's stays as it is and is named in the report. In that folder their skill is used, not the plugin's, as its `AGENTS.md` says.

Where the folder already has an instructions file (`AGENTS.md`, or any file a tool reads as its always-on instructions), touch nothing until the user agrees:
- Name the file and say what will be added: one marked block at its end. In `AGENTS.md` the block carries the kit's instructions, the body of this root's `AGENTS.md` block (what sits between its start and end markers), and its start marker carries the version from this root's start marker. In any other instructions file it carries a pointer to the copied `AGENTS.md`. Write the pointer the way this root's own pointer file points there, or as one sentence with a link when this root has none.
- Say that the kit's rules take precedence for context management where they conflict with what is there.
- Wait until the user types "go". Anything else is not a go.

The rest of their file stays exactly as it was. Removing the block is the undo, with or without git.

```
<!-- dxh-context-manager:start version=2.0.0 -->
<the kit's instructions, or the pointer to AGENTS.md>
<!-- dxh-context-manager:end -->
```

## Both branches: the registry

Register the folder in the root's `_context/projects.md`, in both places: its path in the frontmatter list, and one body line. The path is relative to the root when the folder is under it, absolute otherwise.

```yaml
projects:
  - <path>
```

```
- `<path>` (since <YYYY-MM-DD>): <what it is about, one line>
```

Add the same body line to the Projects list of the root's `state.md`, with the project's next date when the description names one, and a dated line to the root's `log.md`. The root's TLDR is the user's overview of all their work: keep it saying what each project is and what comes next, never "nothing recorded yet" once a project exists.

## What holds for every project

- A far-away path is normal. Nothing in the project points back to the root.
- The instructions and the about layer are copied once and are the project's own from now on, for the user to change. The skills are the plugin's and update with it.
- Git as everywhere in the kit: when `about.md` says `git: on`, a blank folder that is not inside a repository gets one, with a first commit. A seeded folder's history belongs to the user: no new repository, no commit. Otherwise say nothing about git.

## How it ends

A few lines: what was created or copied, what was left because it already existed, the registry line. Then tell the user to open the new folder on its own and to start there, and say how, once per chat: in VS Code, open a new window, choose "Open Folder" and pick the folder's path; in a terminal tool such as the Codex CLI or the Copilot CLI, open a new terminal in that folder and start the tool there. Name the path. When a second project is made in the same chat, give only the path. A project is never worked on from the root's window or terminal.
