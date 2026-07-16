import Image from 'next/image';

const LOGO_ASSETS = {
  black: '/logos/pcg-black-flush.png',
  white: '/logos/pcg-white-flush.png',
  cream: '/logos/pcg-cream-flush.png',
  brown: '/logos/pcg-brown-flush.png',
} as const;

type LogoColor = keyof typeof LOGO_ASSETS;

type LogoProps = {
  color?: LogoColor;
  className?: string;
  priority?: boolean;
};

const LOGO_WIDTH = 698;
const LOGO_HEIGHT = 481;

export default function Logo({
  color = 'black',
  className = 'h-[76px] w-auto',
  priority = false,
}: LogoProps) {
  return (
    <Image
      src={LOGO_ASSETS[color]}
      alt="Private Capital Group"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={className}
      priority={priority}
    />
  );
}
