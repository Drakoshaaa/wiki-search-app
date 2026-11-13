/* Контракт: получить строку от пользователя. */
export interface InputReader {
  ask(prompt: string): Promise<string>;
  close(): void;
}
