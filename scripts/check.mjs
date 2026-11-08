// Consistency checks for the DXH Context Manager plugin repository.
// Run it with: node scripts/check.mjs (it finds the repository root from its own path)
// No dependencies. Exits 1 when any check fails.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const MARKETPLACE = 'dxh-context-manager';
const PLUGIN = 'ctx';
const SKILLS = ['clean-up', 'deep-research', 'explain-in-html', 'grill-me', 'handoff', 'new-project', 'process', 'setup'];
const PROJECT_PLACEHOLDERS = ['{{PROJECT_NAME}}', '{{PROJECT_DESCRIPTION}}', '{{DATE}}'];
const DESCRIPTION_MAX = 1024; // Copilot's cap, the lowest of the three tools
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const MARKER = /<!-- dxh-context-manager:start version=([^\s]+) -->/;
const BOM = new RegExp("^" + String.fromCharCode(0xfeff)); // a byte order mark at the start of a file
const END_MARKER = '<!-- dxh-context-manager:end -->';
const ROOT_AGENTS = 'plugin/skills/setup/templates/root/AGENTS.md';
const ROOT_README = 'plugin/skills/setup/templates/root/README.md';
const RETIRED = [
  [/six entries/i, '"six entries"'],
  [/\bseven\b/i, '"seven"'],
  [/skills folder beside/i, '"skills folder beside"'],
  [/_template\//, '"_template/"'],
  [/\bhandbook\b/i, '"handbook"'],
  [/copilot-instructions/i, '"copilot-instructions"'],
];

let failures = 0;
let total = 0;

function check(label, fn) {
  total += 1;
  try {
    const problems = fn() || [];
    if (problems.length === 0) {
      console.log(`ok    ${label}`);
    } else {
      failures += 1;
      console.log(`FAIL  ${label}`);
      for (const p of problems) console.log(`      ${p}`);
    }
  } catch (err) {
    failures += 1;
    console.log(`FAIL  ${label}`);
    console.log(`      ${err.message}`);
  }
}

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) throw new Error(`${rel} is missing`);
  return readFileSync(p, 'utf8');
}

function readJson(rel) {
  const text = read(rel);
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`${rel} does not parse as JSON: ${err.message}`);
  }
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function rel(file) {
  return relative(ROOT, file).split(sep).join('/');
}

function marketplaceProblems(file, sourceOk, sourceText) {
  const m = readJson(file);
  const problems = [];
  if (m.name !== MARKETPLACE) problems.push(`${file}: name is "${m.name}", expected "${MARKETPLACE}"`);
  if (!Array.isArray(m.plugins) || m.plugins.length !== 1) {
    problems.push(`${file}: expected exactly one plugin entry`);
    return problems;
  }
  const e = m.plugins[0];
  if (e.name !== PLUGIN) problems.push(`${file}: the entry is "${e.name}", expected "${PLUGIN}"`);
  if (!sourceOk(e.source)) problems.push(`${file}: the entry source must be ${sourceText}`);
  if ('version' in e) problems.push(`${file}: the entry carries a version, keep it in plugin.json only`);
  return problems;
}

// The description of a SKILL.md frontmatter, inline or folded (">" or "|" with an indented body).
function description(fm) {
  const lines = fm.split(/\r?\n/);
  const i = lines.findIndex((l) => /^description:/.test(l));
  if (i < 0) return null;
  const first = lines[i].replace(/^description:\s*/, '').trim();
  if (first && !/^[>|][+-]?$/.test(first)) return first.replace(/^["']|["']$/g, '');
  const body = [];
  for (const l of lines.slice(i + 1)) {
    if (/^\s+\S/.test(l)) body.push(l.trim());
    else break;
  }
  return body.join(' ');
}

// 1. The two marketplace files.
check('.claude-plugin/marketplace.json: name, one entry "ctx" at ./plugin', () =>
  marketplaceProblems('.claude-plugin/marketplace.json', (s) => s === './plugin', '"./plugin"'));

check('.agents/plugins/marketplace.json: name, one entry "ctx" at ./plugin', () =>
  marketplaceProblems(
    '.agents/plugins/marketplace.json',
    (s) => s === './plugin' || (s && s.source === 'local' && s.path === './plugin'),
    '{ "source": "local", "path": "./plugin" }'
  ));

// 2. The plugin manifest.
let version = null;
check('plugin/.claude-plugin/plugin.json: name "ctx", semver version', () => {
  const p = readJson('plugin/.claude-plugin/plugin.json');
  const problems = [];
  if (p.name !== PLUGIN) problems.push(`name is "${p.name}", expected "${PLUGIN}"`);
  if (typeof p.version !== 'string' || !SEMVER.test(p.version)) problems.push(`version "${p.version}" is not semver`);
  else version = p.version;
  return problems;
});

// 3. The version agrees in its seven places.
check('the version agrees in its seven places: plugin.json, AGENTS.md marker, new-project seed block, CHANGELOG.md, README.md, the root README frontmatter and "This copy"', () => {
  if (!version) return ['no valid version in plugin.json to compare against'];
  const places = [
    [ROOT_AGENTS, MARKER, 'start marker'],
    ['plugin/skills/new-project/SKILL.md', MARKER, 'seed block start marker'],
    ['CHANGELOG.md', /^## (\d+\.\d+\.\d+\S*)/m, 'first "## x.y.z" heading'],
    ['README.md', /^Version (\d+\.\d+\.\d+\S*?)\.(?:\s|$)/m, '"Version x.y.z." line'],
    [ROOT_README, /^version:\s*["']?([^"'\s]+)["']?\s*$/m, '"version:" frontmatter'],
    [ROOT_README, /^Version (\d+\.\d+\.\d+\S*?)\.\r?$/m, '"Version x.y.z." line under "This copy"'],
  ];
  const problems = [];
  for (const [file, re, what] of places) {
    const m = read(file).match(re);
    if (!m) problems.push(`${file}: no ${what}`);
    else if (m[1] !== version) problems.push(`${file}: ${what} says ${m[1]}, plugin.json says ${version}`);
  }
  return problems;
});

// 4. Exactly the eight skills, each with frontmatter, a matching name and a description within the cap.
check(`plugin/skills holds exactly the eight skills, each with name = folder and a description of at most ${DESCRIPTION_MAX} characters`, () => {
  const dir = join(ROOT, 'plugin', 'skills');
  if (!existsSync(dir)) return ['plugin/skills is missing'];
  const problems = [];
  const folders = readdirSync(dir).filter((n) => statSync(join(dir, n)).isDirectory()).sort();
  for (const f of SKILLS) if (!folders.includes(f)) problems.push(`plugin/skills/${f} is missing`);
  for (const f of folders) if (!SKILLS.includes(f)) problems.push(`plugin/skills/${f} is not one of the eight skills`);
  for (const f of folders) {
    const file = `plugin/skills/${f}/SKILL.md`;
    if (!existsSync(join(ROOT, file))) { problems.push(`${file} is missing`); continue; }
    const text = read(file).replace(BOM, '');
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!fm) { problems.push(`${file}: does not start with frontmatter`); continue; }
    const name = fm[1].match(/^name:\s*["']?([^"'\r\n]+?)["']?\s*$/m);
    const desc = description(fm[1]);
    if (!name) problems.push(`${file}: no name in the frontmatter`);
    else if (name[1] !== f) problems.push(`${file}: name is "${name[1]}", the folder is "${f}"`);
    if (!desc) problems.push(`${file}: no description in the frontmatter`);
    else if (desc.length > DESCRIPTION_MAX) problems.push(`${file}: the description has ${desc.length} characters, the cap is ${DESCRIPTION_MAX}`);
  }
  return problems;
});

// 5. Placeholders: none outside the templates, none in the root template, only the three in the project template.
check('placeholders: no "{{" outside the templates (inline code excepted), none in templates/root/, only the three project ones in templates/project/', () => {
  const rootTemplates = join(ROOT, 'plugin', 'skills', 'setup', 'templates', 'root') + sep;
  const projectTemplates = join(ROOT, 'plugin', 'skills', 'new-project', 'templates', 'project') + sep;
  const problems = [];
  for (const file of walk(join(ROOT, 'plugin'))) {
    if (!file.endsWith('.md')) continue;
    const text = readFileSync(file, 'utf8');
    if (file.startsWith(rootTemplates)) {
      if (text.includes('{{')) problems.push(`${rel(file)} contains "{{", setup fills no placeholder`);
    } else if (file.startsWith(projectTemplates)) {
      const others = (text.match(/\{\{[^}]*\}\}/g) || []).filter((p) => !PROJECT_PLACEHOLDERS.includes(p));
      const rest = PROJECT_PLACEHOLDERS.reduce((t, p) => t.split(p).join(''), text);
      if (others.length > 0) problems.push(`${rel(file)} has placeholders new-project does not fill: ${[...new Set(others)].join(', ')}`);
      else if (rest.includes('{{')) problems.push(`${rel(file)} contains a stray "{{"`);
    } else {
      // A placeholder named in inline code, such as `{{DATE}}` in the text that tells
      // the agent what to fill, is not a leak. Anything else is.
      const prose = text.replace(/`[^`\n]*`/g, '');
      if (prose.includes('{{')) problems.push(`${rel(file)} contains "{{"`);
    }
  }
  return problems;
});

// 6. The root AGENTS.md: frontmatter, then the start marker, the end marker and the "Your own rules" comment.
check('the root AGENTS.md: frontmatter above the start marker, one end marker, the "Your own rules" comment after it', () => {
  const text = read(ROOT_AGENTS).replace(BOM, '');
  const problems = [];
  const fm = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  const start = text.search(MARKER);
  const end = text.indexOf(END_MARKER);
  const own = text.indexOf('<!-- Your own rules go below this line.');
  if (!fm) problems.push('it does not start with frontmatter');
  if (start < 0) problems.push('no start marker');
  else if (fm && start !== fm[0].length) problems.push('the start marker does not follow the frontmatter directly');
  if (end < 0) problems.push('no end marker');
  else if (text.indexOf(END_MARKER, end + 1) >= 0) problems.push('more than one end marker');
  if (start >= 0 && end >= 0 && end < start) problems.push('the end marker comes before the start marker');
  if (own < 0) problems.push('no "Your own rules go below this line." comment');
  else if (end >= 0 && own < end) problems.push('the "Your own rules" comment comes before the end marker');
  return problems;
});

// 7. No stray manifest or instructions file in the plugin folder.
check('no plugin.json, .codex-plugin/, .plugin/plugin.json, .github/plugin/plugin.json or CLAUDE.md at the plugin root', () => {
  const problems = [];
  for (const file of ['plugin/plugin.json', 'plugin/.codex-plugin', 'plugin/.plugin/plugin.json', 'plugin/.github/plugin/plugin.json', 'plugin/CLAUDE.md']) {
    if (existsSync(join(ROOT, file))) problems.push(`${file} must not exist`);
  }
  return problems;
});

// 8. No marketplace file that would shadow the two we ship.
check('no root marketplace.json or other shadowing marketplace file', () => {
  const problems = [];
  for (const file of ['marketplace.json', '.plugin/marketplace.json', '.github/plugin/marketplace.json']) {
    if (existsSync(join(ROOT, file))) problems.push(`${file} must not exist, it shadows .claude-plugin/marketplace.json`);
  }
  return problems;
});

// 9. No word of the 1.0.x layout comes back into the plugin.
check('no retired 1.0.x wording under plugin/ ("six entries", "seven", "skills folder beside", "_template/", "handbook", "copilot-instructions")', () => {
  const problems = [];
  for (const file of walk(join(ROOT, 'plugin'))) {
    if (!file.endsWith('.md')) continue;
    const text = readFileSync(file, 'utf8');
    for (const [re, word] of RETIRED) if (re.test(text)) problems.push(`${rel(file)} contains ${word}`);
  }
  return problems;
});

if (failures === 0) {
  console.log(`all ${total} checks passed (version ${version})`);
} else {
  console.log(`${failures} of ${total} checks failed`);
  process.exit(1);
}
