import { PortableText, PortableTextComponents } from '@portabletext/react'

type ColorScheme = 'dark' | 'light'

function makeComponents(scheme: ColorScheme): PortableTextComponents {
  const textColor = scheme === 'dark' ? 'text-white' : 'text-ink'
  return {
    block: {
      normal: ({ children }) => (
        <p className={`font-nav text-[16px] leading-[1.3] mb-4 ${textColor}`}>{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="space-y-1 mb-6">{children}</ul>,
    },
    listItem: {
      bullet: ({ children }) => (
        <li className={`font-nav text-[16px] leading-[1.3] flex gap-2 ${textColor}`}>
          <span className={`mt-[6px] shrink-0 size-[5px] rounded-full ${scheme === 'dark' ? 'bg-white/70' : 'bg-ink/50'}`} />
          <span>{children}</span>
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
    },
  }
}

interface BodyTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[]
  scheme?: ColorScheme
  className?: string
}

export default function BodyText({ value, scheme = 'light', className }: BodyTextProps) {
  return (
    <div className={className}>
      <PortableText value={value} components={makeComponents(scheme)} />
    </div>
  )
}
