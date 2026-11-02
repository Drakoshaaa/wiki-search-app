import { AppError } from "./AppError";

/** Пользователь выбрал статью некорректно: не число или число вне диапазона. */
export class InvalidChoiceError extends AppError {
  constructor(max: number) {
    super(`Некорректный выбор. Введите число от 1 до ${max} (или 0 для нового поиска).`);
  }
}
