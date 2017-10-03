// Utility function to delay effects
export function delay(millis) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), millis)
  });
  return promise;
}
