// тут будут вспомогательные функции
export function getIdFromUrl(url: string): string {
  const arr = url.split('/');
  return arr[arr.length - 1];
}
