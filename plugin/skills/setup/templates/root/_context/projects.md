---
type: registry
title: Projects
projects: []
---
# Projects

*The list of the user's projects and what each is about, so that a source dropped at the root reaches the project it belongs to.*

This file is what makes this folder the root. Context goes where it belongs, and this list says where that is. The frontmatter holds the paths, the body says what each project is about, one line per project:

``- `<path>` (since <YYYY-MM-DD>): <what it is about, one line>``

A path is relative to this folder when the project lives under it, absolute when it lives elsewhere on the machine. The last part of the path is the project's name, the one a dropped file's `projects:` line uses. Nothing links back from a project to here, and nothing is pushed through this list. A path that no longer exists is reported at clean up, not deleted.

Nothing recorded yet.
