export function idGenerator(): string {
  const id = Date.now() * Math.ceil(Math.random() * 1000000 * Math.random());
  const result = String(id);
  return result.slice(result.length - 7, result.length - 1);
}
