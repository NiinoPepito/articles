export interface StringHasherServiceInterface {
  stringHasher(password: string): Promise<string>;
}