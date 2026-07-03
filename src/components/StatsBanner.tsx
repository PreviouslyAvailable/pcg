import FadeUp from './FadeUp';
import CountUp from './CountUp';

export interface Stat {
  value?: string;
  label?: string;
  description?: string;
}

interface StatsBannerProps {
  heading?: string;
  stats?: Stat[];
  variant?: 'band' | 'column';
}

const defaultStats: Stat[] = [
  { value: '$500M+', label: 'Assets under management' },
  { value: '$5–75M', label: 'Lending range' },
  { value: '20+', label: 'Years global track record' },
  { value: '100%', label: 'Floating rate exposure' },
];

function StatsGrid({ items, gridClassName }: { items: Stat[]; gridClassName: string }) {
  return (
    <dl className={gridClassName}>
      {items.map((stat, i) => (
        <div key={`${stat.value}-${i}`} className="flex flex-col items-center text-center">
          <dt className="font-serif font-light text-teal text-[clamp(44px,5vw,80px)] leading-[1] tracking-[-0.02em] whitespace-nowrap">
            <CountUp value={stat.value} animate={!/year/i.test(stat.label ?? '')} />
          </dt>
          <dd className="mt-4 font-nav text-ink text-[16px] lg:text-[18px] leading-[1.3]">
            {stat.label}
            {stat.description ? (
              <span className="block mt-2 text-ink/60 text-[14px] leading-[1.4]">
                {stat.description}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function StatsBanner({ heading, stats, variant = 'band' }: StatsBannerProps) {
  const items = stats && stats.length > 0 ? stats : defaultStats;

  if (variant === 'column') {
    return (
      <div className="h-full flex flex-col justify-center">
        {heading ? (
          <FadeUp>
            <h2 className="font-serif font-light text-ink text-[clamp(24px,2vw,32px)] leading-[1.1] tracking-[-0.012em] mb-8 text-center">
              {heading}
            </h2>
          </FadeUp>
        ) : null}
        <FadeUp>
          <StatsGrid items={items} gridClassName="grid grid-cols-2 gap-x-6 gap-y-12" />
        </FadeUp>
      </div>
    );
  }

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="max-w-[1680px] mx-auto w-full px-4 lg:px-[60px]">
        {heading ? (
          <FadeUp>
            <h2 className="font-serif font-light text-ink text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-[-0.012em] mb-12 lg:mb-16 max-w-[900px]">
              {heading}
            </h2>
          </FadeUp>
        ) : null}
        <FadeUp>
          <StatsGrid items={items} gridClassName="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" />
        </FadeUp>
      </div>
    </section>
  );
}
