import FadeUp from './FadeUp';
import OutlineButton from './OutlineButton';

export type FundDetailRow = {
  label?: string;
  value?: string;
};

type FundOptionCardProps = {
  name: string;
  details: FundDetailRow[];
  /** `light` = cream card; `dark` = dark panel (same spacing/structure). */
  variant?: 'light' | 'dark';
  delay?: number;
  ctaHref?: string;
  ctaLabel?: string;
};

const VARIANT = {
  light: {
    surface: 'bg-cream-warm',
    title: 'text-ink',
    divider: 'divide-black/10',
    label: 'text-ink',
    value: 'text-ink',
    buttonScheme: 'light' as const,
  },
  dark: {
    surface: 'bg-dark',
    title: 'text-white',
    divider: 'divide-white/10',
    label: 'text-white',
    value: 'text-white',
    buttonScheme: 'dark' as const,
  },
} as const;

/** Shared FUND OPTIONS card — same padding, typography, and CTA treatment for both funds. */
export default function FundOptionCard({
  name,
  details,
  variant = 'light',
  delay = 0,
  ctaHref = '/contact',
  ctaLabel = 'Get in Touch',
}: FundOptionCardProps) {
  const styles = VARIANT[variant];
  const rows = details.filter((row) => row.label?.trim() && row.value?.trim());

  return (
    <FadeUp
      delay={delay}
      className={`${styles.surface} rounded-[16px] p-10 lg:p-18 flex flex-col hover-lift`}
    >
      <h3 className={`font-sans ${styles.title} text-[26px] leading-[1.2] mb-8`}>
        {name}
      </h3>
      <div className={`flex-1 divide-y ${styles.divider} mb-8`}>
        {rows.map((row) => (
          <div key={row.label} className="flex gap-6 py-3">
            <p className={`font-nav ${styles.label} text-[16px] leading-[1.4] w-[140px] shrink-0 pt-0.5`}>
              {row.label}:
            </p>
            <p className={`font-nav ${styles.value} text-[16px] leading-[1.4]`}>{row.value}</p>
          </div>
        ))}
      </div>
      <OutlineButton href={ctaHref} scheme={styles.buttonScheme} className="self-start text-[14px]">
        {ctaLabel}
      </OutlineButton>
    </FadeUp>
  );
}
