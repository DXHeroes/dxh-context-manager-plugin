# DXH Context Manager

A coding agent forgets everything between sessions. The DXH Context Manager is a small folder convention and eight skills that let the agent carry the context of your work from one session to the next. The agent reads that context, writes it and keeps it short. You never write or manage it by hand.

You work in plain words. Say "new project" for a new piece of work, drop notes into a folder and say "process", say "clean up" when you stop and "handoff" when the work goes on. The rules and the context live in your own folder and stay yours. The skills come from this plugin and get better when you update it.

Version 2.0.0. Made by DX Heroes. MIT.

## Install

Pick your tool. The marketplace is called `dxh-context-manager` and the plugin is called `ctx`.

### Codex CLI

```
codex plugin marketplace add DXHeroes/dxh-context-manager-plugin
codex plugin add ctx@dxh-context-manager
```

Then start a new session. The skills appear only in a new session.

- **Git:** must be installed. The add command clones the repository with git.
- **Login:** not needed for these commands. Without a ChatGPT login you may see a warning about the remote plugin catalog (401). It is harmless.
- **Codex in VS Code:** the extension does not run plugins today. OpenAI's docs (read 2026-11-08) say: "The IDE extension doesn't support plugins." Standalone skills do work there, so copy each folder of `plugin/skills/` into `~/.agents/skills/`. They then appear without the `ctx:` prefix.

### Claude Code

```
# in a session
/plugin marketplace add DXHeroes/dxh-context-manager-plugin
/plugin install ctx@dxh-context-manager
# or from a shell
claude plugin marketplace add DXHeroes/dxh-context-manager-plugin
claude plugin install ctx@dxh-context-manager
```

The plugin loads the next time you start Claude Code, or right away after `/reload-plugins`. Git must be installed. If the add fails on an SSH key, add the marketplace by its HTTPS address instead:

```
/plugin marketplace add https://github.com/DXHeroes/dxh-context-manager-plugin.git
```

### GitHub Copilot in VS Code

You need VS Code 1.144 or newer, Copilot signed in, and git installed.

**One click:** open this link, confirm adding the marketplace, then confirm the install.

```
vscode://chat-plugin/install?source=DXHeroes%2Fdxh-context-manager-plugin&plugin=ctx
```

**From the editor:**

1. Command Palette: "Chat: Open Customizations", then "Browse".
2. Open the source menu, choose "Configure Marketplaces", then "Add Marketplace", and enter `DXHeroes/dxh-context-manager-plugin`.
3. Back on "Browse", pick "dxh-context-manager" in the source menu, open "ctx", select "Install" and accept the trust prompt.
4. Start a new chat and type `/ctx:` to see the skills.

**From settings:** add this to your User settings (not the workspace settings), then do step 3 above. VS Code marks `chat.plugins.marketplaces` Experimental. Writing the list replaces the default list, so keep any marketplaces you already have.

```json
{
  "chat.plugins.enabled": true,
  "chat.plugins.marketplaces": [
    "github/awesome-copilot",
    "DXHeroes/dxh-context-manager-plugin"
  ]
}
```

### Copilot CLI

```
copilot plugin marketplace add DXHeroes/dxh-context-manager-plugin
copilot plugin install ctx@dxh-context-manager
```

In the CLI the skills have bare names: `/setup`, `/new-project`, `/process` and so on. Run `/skills list` to see them. A plugin installed with the CLI also shows up in VS Code.

## Install from a folder, without git

Download the repository as a ZIP and unzip it. Then point your tool at the folder on disk, by its full path.

```
# Codex
codex plugin marketplace add <the full path of the unzipped folder>
codex plugin add ctx@dxh-context-manager
# Claude Code
claude plugin marketplace add <the full path of the unzipped folder>
claude plugin install ctx@dxh-context-manager
# Copilot CLI
copilot plugin marketplace add <the full path of the unzipped folder>
copilot plugin install ctx@dxh-context-manager
```

Copilot in VS Code: run "Chat: Install Plugin from Source" and enter the path to the `plugin` folder inside the unzipped repository. Or add it to your User settings:

```json
{ "chat.pluginLocations": { "C:/Users/you/dxh-context-manager-plugin-main/plugin": true } }
```

Codex and the Copilot CLI were verified on 2026-11-08 without git on the path, from a folder that is not a git repository (Codex 0.167.0 and Copilot CLI 1.0.36, on Windows). Claude Code accepted a folder that is not a git repository but was not tested without git. VS Code registers a local plugin folder without cloning it, so it should need no git, but that is not tested yet.

**The plain fallback:** copy each folder of `plugin/skills/` (with its `templates/` folder) into the tool's skills folder. For Codex that is `~/.agents/skills/`. For Copilot it is `.agents/skills/` or `.github/skills/` inside the workspace, and for Claude Code `.claude/skills/` inside the workspace, so copy them into each folder you open. New projects do not get them: copy them into each project you make. Copied skills have no `ctx:` prefix and do not update with the plugin.

## Start

1. Open an empty folder as the workspace in your tool. Trust it when asked.
2. Say "set up", or run the setup skill, in a mode that may edit files (Agent mode in Copilot). The agent makes this folder your root. The first "set up" and the first "new project" ask once to read the plugin's own folder, where the starting files are. Allow it.
3. Answer four questions, once: git or not, which language, who you are, what you work on.
4. Say "new project" and describe the work in a sentence or two.
5. Open the new project on its own: in VS Code a new window on the project folder, in the Codex CLI or the Copilot CLI a new terminal in that folder. Each project is its own workspace.
6. Work in plain words. Drop notes or documents into `_inputs/` and say "process". Say "clean up" when you stop, and "handoff" when the work continues.
7. Next time, say "continue where we left off".

The helpers are there when you need them: "grill me", "explain in html" and "deep research".

## What it installs

Eight skills. In Claude Code and Copilot in VS Code they are `/ctx:<name>`. In Codex they are listed as `ctx:<name>`: type `$` and pick one from the list, or open `/skills`. In the Copilot CLI they are `/<name>`. In every tool you can also just say the words.

- **setup:** makes the folder you have open the root and runs the first opening.
- **new-project:** makes a new project, or seeds a folder you already have, and registers it at the root.
- **process:** folds new material into the context, or at the root sends each file to its project.
- **clean-up:** brings the context to the current truth at the end of a session.
- **handoff:** writes the starting point for the next session when the work continues.
- **grill-me:** interviews you about a plan until you both understand it the same way.
- **explain-in-html:** makes one visual page on a topic that opens offline.
- **deep-research:** runs a sourced investigation and writes a report.

The tree setup makes:

```
AGENTS.md       the rules, in a marked block, with room for your own below it
CLAUDE.md       one line that imports AGENTS.md
README.md       the guide to the kit
_context/       about you, the project list, state, log, decisions, threads
_inputs/        drop material here, then say "process"
_artifacts/     every deliverable, in a folder named by date and topic
_handoffs/      the starting point for the next session
projects/       your projects
```

A project has five entries: `AGENTS.md` (with `CLAUDE.md`), `_context/`, `_inputs/`, `_artifacts/` and `_handoffs/`. The skills are never copied into your folders.

## Updating

Codex, then start a new session:

```
codex plugin marketplace upgrade dxh-context-manager
codex plugin add ctx@dxh-context-manager
```

Claude Code. Auto-update is off for a marketplace that is not Anthropic's own. You can turn it on in `/plugin`, under Marketplaces, with "Enable auto-update".

```
# from a shell
claude plugin update ctx@dxh-context-manager
# then, in a running session
/reload-plugins
```

Copilot CLI:

```
copilot plugin marketplace update dxh-context-manager
copilot plugin update ctx
```

Copilot in VS Code: run "Chat: Update Plugins", or use the refresh icon on the Plugins page. VS Code also picks up what the Copilot CLI installs.

Installed from a folder: there is no update command. Unzip the new version into the same folder, replacing the old files, and run your tool's two commands from "Install from a folder" again.

## If something is blocked

- **Git is missing:** install Git for Windows and open a new terminal.
- **Claude Code:** `strictKnownMarketplaces` in the managed settings is an allowlist of marketplace sources. When your admin sets it, only the listed marketplaces can be added, a folder on disk included.
- **VS Code and Copilot policies:** `ChatPluginsEnabled` set to false turns plugins off, and `ChatStrictMarketplaces` allows only listed marketplaces. Copilot's enterprise-managed settings can also set `strictKnownMarketplaces`, which turns off the built-in marketplaces and allows only the listed ones.
- **VS Code plugin-only policy:** `ChatStrictPluginOnlyCustomization` keeps plugin skills but blocks workspace instructions, so `AGENTS.md` is not read.
- **Codex:** `marketplaces.restrict_to_allowed_sources` in a managed config allows only listed sources.

In each case, ask your admin to allow `DXHeroes/dxh-context-manager-plugin`. The folder install does not get round these policies, because they cover a folder on disk too. Until then, only the plain fallback above, the skills copied by hand, works without the plugin.

## What comes next

Not decided yet, and not in this version:

- **upgrade:** a skill that refreshes the marked block of rules in your `AGENTS.md`, after asking. The skills already update with the plugin.
- **Migration from 1.0.x:** moving a folder made by the 1.0.x zip onto the plugin.
- **A personal home:** the context kept outside the workspace. The root stays for now, because Copilot in VS Code cannot write outside the open workspace.

## For maintainers

```
.claude-plugin/marketplace.json     Claude Code format, also read by Copilot
.agents/plugins/marketplace.json    Codex format
plugin/.claude-plugin/plugin.json   the plugin manifest, the only one
plugin/skills/<name>/SKILL.md       the eight skills, templates beside setup and new-project
scripts/check.mjs                   the consistency checks
CHANGELOG.md                        version history
```

The version sits in seven places, and `scripts/check.mjs` fails when they disagree:
- `plugin/.claude-plugin/plugin.json`
- the start marker in `plugin/skills/setup/templates/root/AGENTS.md`
- the seed block in `plugin/skills/new-project/SKILL.md`
- the first heading of `CHANGELOG.md`
- the "Version" line near the top of this README
- the `version:` frontmatter of `plugin/skills/setup/templates/root/README.md`
- the "Version" line under "This copy" in the same file

The marketplace entries carry no version. This README has no frontmatter, because GitHub would render it as a table. Run the checks from the repository root:

```
node scripts/check.mjs
```

To release, bump the version in the seven places, add a CHANGELOG entry, and tag `vX.Y.Z`. Bump on every change that should reach people, because the tools cache the plugin by version. Both marketplace files must keep the same name, `dxh-context-manager`, so the plugin id is `ctx@dxh-context-manager` in every tool. Version 1.0.x and the exporter live in DXHeroes/dxh-context-manager.

## Licence

MIT, Copyright (c) 2026 DX Heroes. See `LICENSE`.
