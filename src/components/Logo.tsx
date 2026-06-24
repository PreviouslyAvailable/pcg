import Image from 'next/image';

const LOGO_ASSETS = {
  full: {
    light: '/logos/logo-full-light.png',
    teal: '/logos/logo-full-teal.png',
  },
  secondary: {
    light: '/logos/logo-secondary-light.png',
    teal: '/logos/logo-secondary-teal.png',
  },
} as const;

type LogoVariant = keyof typeof LOGO_ASSETS;
type LogoColor = 'black' | 'light' | 'teal';

type LogoProps = {
  variant?: LogoVariant;
  color?: LogoColor;
  className?: string;
  priority?: boolean;
};

const SIZES = {
  full: { width: 656, height: 234 },
  secondary: { width: 698, height: 210 },
} as const;

export default function Logo({
  variant = 'secondary',
  color = 'black',
  className = 'h-10 w-auto',
  priority = false,
}: LogoProps) {
  const src =
    color === 'teal'
      ? LOGO_ASSETS[variant].teal
      : LOGO_ASSETS[variant].light;

  const colorClass =
    color === 'black' ? 'brightness-0' : color === 'light' ? '' : '';

  const { width, height } = SIZES[variant];

  return (
    <Image
      src={src}
      alt="Private Capital Group"
      width={width}
      height={height}
      className={[className, colorClass].filter(Boolean).join(' ')}
      priority={priority}
    />
  );
}
