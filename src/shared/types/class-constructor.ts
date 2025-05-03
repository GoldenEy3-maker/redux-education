export interface ClassConstructor<T> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  new (...args: any[]): T;
}
