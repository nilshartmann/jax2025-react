export function dummyFetch(duration = 4200): Promise<string> {
  return new Promise((res) => {
    setTimeout(() => {
      res("This is dummy data fetched with Suspense");
    }, duration);
  });
}
