export function performTimes(
  times: number,
  callback: ((time: number) => void),
) {
  for (let i = 0; i < times; i++) {
    callback(i);
  }
}

export async function performTimesAsync(
  times: number,
  callback: ((time: number) => void),
) {
  for (let i = 0; i < times; i++) {
    await callback(i);
  }
}

export function withEnv<T = any>(env: string, callback: () => T): T {
  process.env.NODE_ENV = env;

  function resetEnv() {
    process.env.NODE_ENV = 'test';
  }

  try {
    const result = callback();
    if (result && (result as any).then) {
      return (result as any)
        .then((result: any) => {
          resetEnv();
          return result;
        })
        .catch((error: any) => {
          resetEnv();
          throw error;
        });
    } else {
      resetEnv();
      return result;
    }
  } catch (error) {
    resetEnv();
    throw error;
  }
}

export enum UserAgent {
  Unknown = 'unknown',
  Chrome63 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
  Safari11 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0.2 Safari/604.4.7',
  IE11 = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
}

export function noop() {}
