import Link from 'next/link';
import { source } from '@/lib/source';

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
      <section className="home-section p-8 md:p-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="home-label">Featured Skills</p>
            <h2 className="home-heading">已具备执行边界的技能模块。</h2>
          </div>
          <Link href="/skills/skills" className="home-link">
            查看全部技能
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredSkills.map((skill) => (
            <Link key={skill.href} href={skill.href} className="home-featured-card">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--claude-text-muted)]">
                {skill.path}
              </p>
              <h3 className="mt-3 text-2xl">{skill.title}</h3>
              <p className="mt-4 home-desc">{skill.description}</p>
              <p className="mt-6 home-link">进入 Skill</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
