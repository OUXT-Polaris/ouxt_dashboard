declare module "*/targets.json" {
  interface TestData {
    foo: string;
    bar: number;
  }

  const value: TestData;
  export = value;
}
