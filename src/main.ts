import { WikipediaSearchApp } from "./app/WikipediaSearchApp";
import { ConsoleInputReader } from "./input/ConsoleInputReader";
import { InputValidator } from "./input/InputValidator";
import { WikipediaUrlBuilder } from "./api/WikipediaUrlBuilder";
import { WikipediaApiClient } from "./api/WikipediaApiClient";
import { WikipediaResponseParser } from "./api/WikipediaResponseParser";
import { ConsoleResultPrinter } from "./output/ConsoleResultPrinter";
import { SystemBrowserOpener } from "./browser/SystemBrowserOpener";

/**
 * Точка входа (composition root): единственное место, где создаются
 * конкретные объекты и передаются приложению через конструктор.
 */
async function main(): Promise<void> {
  const urlBuilder = new WikipediaUrlBuilder();

  const app = new WikipediaSearchApp(
    new ConsoleInputReader(),
    new InputValidator(),
    new WikipediaApiClient(urlBuilder),
    new WikipediaResponseParser(urlBuilder),
    new ConsoleResultPrinter(),
    new SystemBrowserOpener(),
  );

  await app.run();
}

main().catch((error) => {
  console.error("Критическая ошибка:", error);
  process.exit(1);
});
