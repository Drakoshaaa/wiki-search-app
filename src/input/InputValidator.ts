import { EmptyQueryError } from "../errors/EmptyQueryError";
import { InvalidChoiceError } from "../errors/InvalidChoiceError";

/** Проверяет и нормализует пользовательский ввод. Сам ничего не читает и не выводит. */
export class InputValidator {
  /** Длинные запросы API всё равно отвергнет, поэтому обрезаем заранее. */
  private static readonly MAX_QUERY_LENGTH = 300;

  /** Возвращает очищенный запрос или бросает EmptyQueryError. */
  validateQuery(raw: string): string {
    const query = raw.trim().replace(/\s+/g, " ");
    if (query.length === 0) {
      throw new EmptyQueryError();
    }
    return query.slice(0, InputValidator.MAX_QUERY_LENGTH);
  }

  /**
   * Возвращает число от 0 до max (0 = новый поиск)
   * или бросает InvalidChoiceError.
   */
  validateChoice(raw: string, max: number): number {
    const text = raw.trim();
    // Только цифры: отсекает "abc", "1.5", "-2", "1e3", пустую строку
    if (!/^\d{1,6}$/.test(text)) {
      throw new InvalidChoiceError(max);
    }
    const choice = Number(text);
    if (choice < 0 || choice > max) {
      throw new InvalidChoiceError(max);
    }
    return choice;
  }
}
