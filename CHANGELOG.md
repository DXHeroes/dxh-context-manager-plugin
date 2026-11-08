---
type: changelog
title: Changelog
---
# Changelog

## 2.0.0 (2026-11-08)

- The kit is now a plugin (`ctx`) with its own marketplace (`dxh-context-manager`), one repository for Codex, Claude Code and GitHub Copilot.
- The skills live in the plugin and update with it. They are no longer copied into your folders.
- New skill `setup`: makes the folder you have open the root of your context manager and runs the first opening.
- The rules on disk sit in a marked block in `AGENTS.md` that carries the version, so a later upgrade can refresh the block and leave your own rules below it alone.
- One tree for every tool: `AGENTS.md` holds the rules and `CLAUDE.md` is one line that imports it.
- A project has five entries: `AGENTS.md` (with `CLAUDE.md`), `_context/`, `_inputs/`, `_artifacts/` and `_handoffs/`.
- The handbook and the exporter are not part of the plugin.
- Not in 2.0.0: an `upgrade` skill for the rules on disk, a migration from 1.0.x, and a personal home.

The 1.0.x history lives in [DXHeroes/dxh-context-manager](https://github.com/DXHeroes/dxh-context-manager).
