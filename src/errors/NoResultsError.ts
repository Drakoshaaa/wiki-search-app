import { AppError } from "./AppError";

/** Поиск завершился успешно, но ничего не нашёл. */
export class NoResultsError extends AppError {
  constructor() {
    super("По вашему запросу ничего не найдено. Попробуйте изменить запрос.");
  }
}
