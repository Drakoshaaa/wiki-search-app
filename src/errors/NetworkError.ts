import { AppError } from "./AppError";

/** Не удалось получить ответ от сервера (нет интернета, таймаут, HTTP-ошибка). */
export class NetworkError extends AppError {
  constructor(reason: string) {
    super(`Ошибка сети: ${reason}`);
  }
}
