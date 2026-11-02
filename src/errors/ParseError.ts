import { AppError } from "./AppError";

/** Ответ сервера пришёл, но его не удалось разобрать. */
export class ParseError extends AppError {
  constructor(reason: string) {
    super(`Не удалось разобрать ответ сервера: ${reason}`);
  }
}
