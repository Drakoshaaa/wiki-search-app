import { InputReader } from "../interfaces/InputReader";
import { SearchClient } from "../interfaces/SearchClient";
import { ResponseParser } from "../interfaces/ResponseParser";
import { ResultPrinter } from "../interfaces/ResultPrinter";
import { BrowserOpener } from "../interfaces/BrowserOpener";
import { InputValidator } from "../input/InputValidator";
import { SearchResult } from "../models/SearchResult";
import { AppError } from "../errors/AppError";
import { InputClosedError } from "../errors/InputClosedError";
import { InvalidChoiceError } from "../errors/InvalidChoiceError";

/* Основной класс приложения, производит следю цепочку: "запрос -> поиск -> разбор -> вывод -> выбор -> браузер". */

export class WikipediaSearchApp {
  private static readonly EXIT_COMMANDS = ["exit", "quit", "выход"];

  constructor(
    private readonly reader: InputReader,
    private readonly validator: InputValidator,
    private readonly client: SearchClient,
    private readonly parser: ResponseParser,
    private readonly printer: ResultPrinter,
    private readonly opener: BrowserOpener,
  ) {}

  async run(): Promise<void> {
    this.printer.printMessage("Поиск по Википедии. Для выхода введите exit.");

    try {
      let running = true;
      while (running) {
        try {
          running = await this.handleOneSearch();
        } catch (error) {
          if (error instanceof InputClosedError) {
            break;
          }
          this.reportError(error);
        }
      }
    } finally {
      this.reader.close();
    }
    this.printer.printMessage("До свидания!");
  }

  /* Один цикл поиска. Возвращает false, если пользователь попросил выйти. */
  private async handleOneSearch(): Promise<boolean> {
    const input = await this.reader.ask("Поисковый запрос: ");
    if (this.isExitCommand(input)) {
      return false;
    }

    const query = this.validator.validateQuery(input);
    this.printer.printMessage("Ищу...");

    const raw = await this.client.search(query);
    const results = this.parser.parse(raw);
    this.printer.printResults(results);

    const chosen = await this.chooseResult(results);
    if (chosen === null) {
      return true;
    }

    await this.opener.open(chosen.url);
    this.printer.printMessage(`Открываю в браузере: ${chosen.title}\n`);
    return true;
  }

  /* Спрашивает номер, пока не получит корректный. null означает "новый поиск". */
  private async chooseResult(results: SearchResult[]): Promise<SearchResult | null> {
    while (true) {
      const input = await this.reader.ask(`Номер статьи (1-${results.length}, 0 - новый поиск): `);
      try {
        const choice = this.validator.validateChoice(input, results.length);
        return choice === 0 ? null : results[choice - 1];
      } catch (error) {
        if (error instanceof InvalidChoiceError) {
          this.printer.printError(error.message);
          continue;
        }
        throw error;
      }
    }
  }

  private isExitCommand(input: string): boolean {
    return WikipediaSearchApp.EXIT_COMMANDS.includes(input.trim().toLowerCase());
  }

  /* Ожидаемые ошибки */
  private reportError(error: unknown): void {
    if (error instanceof AppError) {
      this.printer.printError(error.message);
    } else {
      const details = error instanceof Error ? error.message : String(error);
      this.printer.printError(`Непредвиденная ошибка: ${details}`);
    }
  }
}
