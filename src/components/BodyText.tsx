import { PortableText } from '@portabletext/react'
import { bodyTextComponents } from '@/lib/portableTextComponents'

type ColorScheme = 'dark' | 'light'

interface BodyTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[]
  scheme?: ColorScheme
  className?: string
}

export default function BodyText({ value, scheme = 'light', className }: BodyTextProps) {
  return (
    <div className={className}>
      <PortableText value={value} components={bodyTextComponents(scheme)} />
    </div>
  )
}
