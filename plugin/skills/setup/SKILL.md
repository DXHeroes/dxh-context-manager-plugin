---
name: setup
description: Makes the folder the user has open the root of their context manager, by copying the root tree into it and running the first opening. Use when the user says "set up", "setup", "init", "set up the context manager", "set up the context manager here", "make this my context root" or "start the context manager here", or asks in an empty folder how to start.
---

# Set up

*The root is where the user starts, keeps the list of their projects and drops their sources, so it is made once, in the folder they chose, with nothing to set up by hand.*

## 1. Where am I

If `_context/projects.md` exists here, this folder is already a root: say so in one line and do nothing else in this skill. If `_context/` exists without it, this folder is a project: say that set up makes a root and that this project already has its context, and do nothing else in this skill. Otherwise go on.

A folder that is not empty is fine. Existing files are never overwritten, and each file that was skipped is named at the end.

## 2. Copy

Copy the `templates/root/` folder beside this file into the current folder, every file and folder, the `.gitkeep` files included. Place each file only where no file of that name exists. Copy with one plain copy command where the tool allows it without asking. If the command is refused or needs an approval, do not retry it and do not copy through a temporary folder: read each template file and write it unchanged into place. A refused copy command is not a refused read. Only when reading a template file itself is refused, name the plugin's folder in one line, ask the user to allow reading it, and continue once they have. Never ask the user to copy anything by hand.

When the user asks, say which path the templates came from. When the templates cannot be found beside this file, look for this plugin's installed copy: in Claude Code under `~/.claude/plugins/cache/dxh-context-manager/ctx/<version>/`, in Codex under `~/.codex/plugins/cache/dxh-context-manager/ctx/<version>/`, in the Copilot CLI under `~/.copilot/installed-plugins/dxh-context-manager/ctx/`. Use `skills/setup/templates/root/` inside it, and name the path you used. If none is there, say so and stop.

## 3. Instructions that were already here

When `AGENTS.md` or `CLAUDE.md` existed here before the copy, it was skipped, and the kit's part is added to it the way new project's seed branch does it. Touch nothing until the user agrees:
- Name the file and say what will be added at its end. To `AGENTS.md`: the block of rules from the template's `AGENTS.md`, from its start marker to its end marker. To `CLAUDE.md`: the one line `@AGENTS.md`, unless the file already has it.
- Say that the kit's rules take precedence for context management where they conflict with what is there.
- Wait until the user types "go". Anything else is not a go, and the file stays as it was.

The rest of their file stays exactly as it was. Removing what was added is the undo.

## 4. The first opening

Read `AGENTS.md` now, with the kit's block in it, and follow it from here on, the first opening included, because the tool loaded this folder's instructions before they existed. Without a go, follow the template's `AGENTS.md` for the rest of this session.

Right away, in the same reply as the copy (or as the go), run the first opening exactly as it describes it: the welcome, the four questions with their defaults, the answers into `_context/about.md`, and git when the user turns it on.

## 5. How it ends

After a copy: three lines, before the welcome and the questions of the first opening, so that the questions close the reply. What was created, in one line, with any skipped file named. That this folder is now the root. That "new project" makes the first project, and that each project is opened on its own, in its own window or terminal. Nothing about the plugin's internals or how the files were copied.
