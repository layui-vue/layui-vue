import container from 'markdown-it-container'
import type Token from 'markdown-it/lib/token'

type ContainerArgs = [
  typeof container, string,
  { render(tokens: Token[], idx: number): string }
]

export default function createContainer(
  klass: string,
  defaultTitle: string
): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        if (token.nesting === 1) {
          return `<lay-comment>`
        } else {
          return '</lay-comment>\n'
        }
      },
    },
  ]
}