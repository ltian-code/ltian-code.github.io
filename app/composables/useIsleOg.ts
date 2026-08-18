export function useIsleOg(input: {
  title: string
  description?: string
  kicker?: string
}) {
  defineOgImage('Isle', {
    title: input.title,
    description: input.description ?? '',
    kicker: input.kicker ?? '',
  })
}
