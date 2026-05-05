import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const SKILLS_DIR = join(ROOT, 'skills')
const DOCS_SKILLS_DIR = join(ROOT, 'docs', 'content', 'docs', 'skills')

async function readFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx > 0) {
      const key = line.slice(0, idx).trim()
      const val = line.slice(idx + 1).trim()
      fm[key] = val
    }
  }
  return fm
}

async function syncSkills() {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true })
  const skills = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const skillMd = join(SKILLS_DIR, entry.name, 'SKILL.md')
    try {
      const content = await readFile(skillMd, 'utf-8')
      const fm = await readFrontmatter(content)
      if (!fm.name) continue

      // Copy skill doc to docs/content/docs/skills/<name>.mdx
      const body = content.replace(/^---[\s\S]*?---\n*/, '')
      const docContent = `---
title: ${fm.name}
description: ${fm.description || ''}
---

# ${fm.name}

${fm.description ? `> ${fm.description}\n` : ''}
${body}
`

      await mkdir(DOCS_SKILLS_DIR, { recursive: true })
      await writeFile(join(DOCS_SKILLS_DIR, `${fm.name}.mdx`), docContent)
      skills.push({ name: fm.name, description: fm.description || '' })
    } catch {
      // no SKILL.md, skip
    }
  }

  // Generate skills list page + fumadocs meta
  const listItems = skills.map(s => `- [${s.name}](./${s.name}) — ${s.description}`).join('\n')
  const listPage = `---
title: Skills
description: Claude Code Skills 列表
---

# Skills

这里收集了所有可用的 Claude Code Skills，每个 Skill 都是一个独立的功能模块。

## 列表

${listItems}
`
  await writeFile(join(DOCS_SKILLS_DIR, 'index.mdx'), listPage)

  const skillsMeta = {
    title: 'Skills',
    pages: ['index', ...skills.map(s => s.name)],
  }
  await writeFile(join(DOCS_SKILLS_DIR, 'meta.json'), JSON.stringify(skillsMeta, null, 2))

  console.log(`Synced ${skills.length} skills: ${skills.map(s => s.name).join(', ')}`)
}

syncSkills()
