export function buildContext(matches) {
  if (!matches?.length) return "";

  return matches
    ?.map?.((m) => `[${m?.topic} - ${m?.category}]\n${m?.content}`)
    ?.join?.("\n\n");
}
