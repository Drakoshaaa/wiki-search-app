import { SearchResult } from "../models/SearchResult";

/** Контракт: показать пользователю результаты и сообщения. */
export interface ResultPrinter {
  printResults(results: SearchResult[]): void;
  printMessage(message: string): void;
  printError(message: string): void;
}
