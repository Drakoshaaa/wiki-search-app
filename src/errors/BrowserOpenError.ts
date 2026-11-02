import { AppError } from "./AppError";

/** Не удалось открыть страницу в браузере. */
export class BrowserOpenError extends AppError {
  constructor(url: string, reason: string) {
    super(`Не удалось открыть браузер (${reason}). Откройте ссылку вручную: ${url}`);
  }
}
