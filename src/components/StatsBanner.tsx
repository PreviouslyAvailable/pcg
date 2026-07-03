import FadeUp from './FadeUp';

interface Stat {
  value?: string;
  label?: string;
  description?: string;
}

interface StatsBannerProps {
  heading?: string;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: '$500M+', label: 'Assets under management' },
  { value: '$5–75M', label: 'Lending range' },
  { value: '20+', label: 'Years global track record' },
  { value: '100%', label: 'Floating rate exposure' },
];

export default function StatsBanner({ heading, stats }: StatsBannerProps) {
  const items = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="bg-cream-warm py-16 lg:py-24">
      <div className="max-w-[1680px] mx-auto w-full px-4 lg:px-[60px]">
        {heading ? (
          <FadeUp>
            <h2 className="font-serif font-light text-ink text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-[-0.012em] mb-12 lg:mb-16 max-w-[900px]">
              {heading}
            </h2>
          </FadeUp>
        ) : null}
        <FadeUp>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {items.map((stat, i) => (
              <div key={`${stat.value}-${i}`} className="flex flex-col items-center text-center">
                <dt className="font-serif font-light text-teal text-[clamp(40px,4.2vw,64px)] leading-[1] tracking-[-0.02em]">
                  {stat.value}
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
        </FadeUp>
      </div>
    </section>
  );
}
