import Link from 'next/link';
import { source } from '@/lib/source';

const capabilityGroups = [
  {
    title: '写作与交付',
    description: '把零散操作沉淀成稳定流程，降低重复劳动和输出波动。',
    items: ['规范化提交', '标准化文档动作', '可复用工作流'],
  },
  {
    title: '工程执行',
    description: '围绕真实仓库和真实命令组织技能，而不是抽象提示词模板。',
    items: ['贴近 CLI 使用', '强调可验证步骤', '约束副作用边界'],
  },
  {
    title: '团队一致性',
    description: '把个人经验收束成团队可以共享的能力单元，减少口口相传。',
    items: ['统一命名习惯', '统一结果格式', '统一失败处理'],
  },
];

const adoptionPath = [
  {
    step: '01',
    title: '选择技能',
    description: '先按场景找入口，而不是先记命令。文档优先描述适用边界、输入条件和预期输出。',
  },
  {
    step: '02',
    title: '按流程执行',
    description: '每个 Skill 都尽量给出明确步骤、异常分支和质量标准，减少“差不多就行”的执行偏差。',
  },
  {
    step: '03',
    title: '持续沉淀',
    description: '当一个动作被反复证明有效，就把它升级成可复用技能，而不是继续停留在个人经验层面。',
  },
];

const operatingPrinciples = [
  '先定义边界，再定义话术，避免 Skill 变成没有约束的万能提示词。',
  '优先沉淀高频、可验证、能减少返工的动作，而不是低频炫技能力。',
  '文档描述必须贴近真实仓库操作，避免示例与实际执行环境脱节。',
];

function pickFeaturedSkills() {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === 'skills')
    .slice(0, 6)
    .map((page) => ({
      title: page.data.title,
      description: page.data.description ?? '暂无描述',
      href: page.url,
      path: page.slugs.join(' / '),
    }));
}

export default function HomePage() {
  const featuredSkills = pickFeaturedSkills();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 md:px-10 md:py-16">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--claude-border)] bg-[var(--claude-bg-elevated)] shadow-[var(--claude-shadow)] backdrop-blur">
        <div className="grid gap-8 p-8 md:grid-cols-[minmax(0,1.35fr)_320px] md:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--claude-text-muted)]">Oh My Skills</p>
            <h1 className="mt-4 max-w-3xl text-5xl leading-[1.02] font-semibold md:text-7xl">
              把零散经验整理成可复用、可维护、可交付的 Skill。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--claude-text-muted)] md:text-xl">
              这里不是简单收集提示词，而是把常见工程动作抽象成稳定模块：说明何时用、怎么用、失败时怎么办，以及输出需要达到什么质量。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/skills/skills"
                className="rounded-full bg-[var(--claude-text)] px-6 py-3 text-sm font-semibold text-[var(--claude-bg)] transition hover:opacity-90"
              >
                浏览 Skills
              </Link>
              <Link
                href="/skills"
                className="rounded-full border border-[var(--claude-border-strong)] px-6 py-3 text-sm font-semibold text-[var(--claude-text)] transition hover:bg-[var(--claude-panel)]"
              >
                查看 Skills 入口
              </Link>
            </div>
          </div>

          <div className="grid gap-4 self-start rounded-[1.5rem] border border-[var(--claude-border)] bg-[var(--claude-panel)] p-5">
            <div className="rounded-[1.25rem] border border-[var(--claude-border)] bg-[var(--claude-accent-soft)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--claude-text-muted)]">Repository Signal</p>
              <p className="mt-3 text-3xl font-semibold">{featuredSkills.length}+</p>
              <p className="mt-2 text-sm leading-6 text-[var(--claude-text-muted)]">
                已收录技能文档会直接反映到首页精选区，内容增量不会被首页结构吞掉。
              </p>
            </div>
            <div className="grid gap-3 text-sm leading-6 text-[var(--claude-text-muted)]">
              <div className="rounded-[1.25rem] border border-[var(--claude-border)] p-4">
                适合把提交、评审、脚手架生成、文档整理等高频动作沉淀成团队能力。
              </div>
              <div className="rounded-[1.25rem] border border-[var(--claude-border)] p-4">
                首页只负责导航与判断，细节规则留在具体 Skill 页面，避免入口页过度膨胀。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {capabilityGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-[1.75rem] border border-[var(--claude-border)] bg-[var(--claude-bg-elevated)] p-6 shadow-[var(--claude-shadow)]"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--claude-text-muted)]">{group.title}</p>
            <p className="mt-4 text-lg leading-8">{group.description}</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--claude-text-muted)]">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-[var(--claude-border)] px-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-[var(--claude-border)] bg-[var(--claude-bg-elevated)] p-8 shadow-[var(--claude-shadow)] md:p-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--claude-text-muted)]">Featured Skills</p>
            <h2 className="mt-3 text-3xl md:text-4xl">先看几个已经具备执行边界的技能模块。</h2>
          </div>
          <Link
            href="/skills/skills"
            className="text-sm font-semibold text-[var(--claude-accent)] hover:opacity-80"
          >
            查看全部技能
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredSkills.map((skill) => (
            <Link
              key={skill.href}
              href={skill.href}
              className="group rounded-[1.5rem] border border-[var(--claude-border)] bg-[var(--claude-panel)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--claude-border-strong)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--claude-text-muted)]">{skill.path}</p>
              <h3 className="mt-3 text-2xl">{skill.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--claude-text-muted)]">{skill.description}</p>
              <p className="mt-6 text-sm font-semibold text-[var(--claude-accent)]">进入 Skill</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <article className="rounded-[2rem] border border-[var(--claude-border)] bg-[var(--claude-bg-elevated)] p-8 shadow-[var(--claude-shadow)]">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--claude-text-muted)]">Adoption Path</p>
          <h2 className="mt-3 text-3xl md:text-4xl">首页应该告诉用户如何开始，而不是只展示主题风格。</h2>
          <div className="mt-8 grid gap-4">
            {adoptionPath.map((item) => (
              <div
                key={item.step}
                className="grid gap-4 rounded-[1.5rem] border border-[var(--claude-border)] bg-[var(--claude-panel)] p-5 md:grid-cols-[72px_minmax(0,1fr)] md:items-start"
              >
                <div className="text-3xl font-semibold text-[var(--claude-accent)]">{item.step}</div>
                <div>
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--claude-text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--claude-border)] bg-[var(--claude-bg-elevated)] p-8 shadow-[var(--claude-shadow)]">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--claude-text-muted)]">Operating Principles</p>
          <h2 className="mt-3 text-3xl md:text-4xl">沉淀 Skill 时要主动约束长期维护成本。</h2>
          <div className="mt-8 grid gap-4">
            {operatingPrinciples.map((principle) => (
              <div
                key={principle}
                className="rounded-[1.5rem] border border-[var(--claude-border)] bg-[var(--claude-panel)] p-5 text-sm leading-7 text-[var(--claude-text-muted)]"
              >
                {principle}
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
