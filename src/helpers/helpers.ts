// тут будут вспомогательные функции
export function getIdFromUrl(url: string): string {
  const arr = url.split('/');
  return arr[arr.length - 1];
}

export function idGenerator(): string {
  const id = Date.now() * Math.ceil(Math.random() * 1000000 * Math.random());
  const result = String(id);
  return result.slice(result.length - 7, result.length - 1);
}

export function delay(seconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}
