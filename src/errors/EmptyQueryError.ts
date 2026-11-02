import { AppError } from "./AppError";

/** Пользователь ввёл пустой запрос (или одни пробелы). */
export class EmptyQueryError extends AppError {
  constructor() {
    super("Запрос пустой. Введите хотя бы одно слово.");
  }
}
