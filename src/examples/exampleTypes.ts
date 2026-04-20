import type { JSX } from 'react'

export type ExampleMeta = {
  id: string
  title: string
  description: string
  tags: string[]
  order?: number
}

export type ExampleComponent = (() => JSX.Element) & {
  exampleMeta?: ExampleMeta
}
