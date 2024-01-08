export function delay<T>(timeout: number, result?: T) {
  return new Promise<T | undefined>((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, timeout);
  });
}

export function randomFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const noop = () => {};
