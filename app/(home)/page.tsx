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
    <main className="home-main">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-text">
          <p className="home-hero-overline">Claude Code Skills</p>
          <h1 className="home-hero-title">
            Oh My
            <br />
            <span className="home-hero-accent">Skills</span>
          </h1>
          <p className="home-hero-desc">
            把零散经验整理成可复用、可维护、可交付的 Skill
            <span className="home-hero-period">。</span>
          </p>
          <div className="home-hero-actions">
            <Link href="/skills/skills" className="home-hero-btn-primary">
              浏览全部技能
              <span className="home-hero-btn-arrow">→</span>
            </Link>
            <Link href="/skills" className="home-hero-btn-ghost">
              了解设计理念
            </Link>
          </div>
        </div>
        <div className="home-hero-mark">
          <div className="home-hero-rule" />
          <span className="home-hero-stat">{featuredSkills.length}</span>
          <span className="home-hero-stat-label">可用技能</span>
        </div>
      </section>

      {/* Divider */}
      <div className="home-divider">
        <span className="home-divider-dot" />
      </div>

      {/* Featured Skills */}
      <section className="home-featured">
        <div className="home-featured-header">
          <p className="home-featured-label">Featured Skills</p>
          <h2 className="home-featured-heading">已具备执行边界的技能模块。</h2>
          <Link href="/skills/skills" className="home-featured-link">
            查看全部 →
          </Link>
        </div>

        <div className="home-featured-grid">
          {featuredSkills.map((skill, i) => (
            <Link
              key={skill.href}
              href={skill.href}
              className="home-card"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="home-card-index">{(i + 1).toString().padStart(2, '0')}</span>
              <div className="home-card-body">
                <h3 className="home-card-title">{skill.title}</h3>
                <p className="home-card-desc">{skill.description}</p>
              </div>
              <span className="home-card-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
