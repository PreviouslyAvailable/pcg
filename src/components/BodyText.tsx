import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { bodyTextComponents } from '@/lib/portableTextComponents'

type ColorScheme = 'dark' | 'light'

interface BodyTextProps {
  value: PortableTextBlock[]
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
