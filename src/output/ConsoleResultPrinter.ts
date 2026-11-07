import { ResultPrinter } from "../interfaces/ResultPrinter";
import { SearchResult } from "../models/SearchResult";

/** Этап 4. Выводит результаты и сообщения в консоль. */
export class ConsoleResultPrinter implements ResultPrinter {
  private static readonly MAX_SNIPPET_LENGTH = 150;

  printResults(results: SearchResult[]): void {
    console.log(`\nНайдено статей: ${results.length}\n`);
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title}`);
      if (result.snippet) {
        console.log(`   ${this.shorten(result.snippet)}`);
      }
    });
    console.log();
  }

  printMessage(message: string): void {
    console.log(message);
  }

  printError(message: string): void {
    console.error(`\n[!] ${message}\n`);
  }

  private shorten(text: string): string {
    const max = ConsoleResultPrinter.MAX_SNIPPET_LENGTH;
    return text.length > max ? `${text.slice(0, max)}...` : text;
  }
}
