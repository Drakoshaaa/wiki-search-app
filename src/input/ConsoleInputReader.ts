import * as readline from "node:readline";
import { InputReader } from "../interfaces/InputReader";
import { InputClosedError } from "../errors/InputClosedError";

/** Читает строки из консоли через встроенный модуль readline. */
export class ConsoleInputReader implements InputReader {
  private readonly rl: readline.Interface;
  private closed = false;
  private pendingReject: ((error: Error) => void) | null = null;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Если поток ввода закрыли (Ctrl+D / Ctrl+C), а мы ждали ответ,
    // завершаем ожидание ошибкой, иначе промис повис бы навсегда.
    this.rl.on("close", () => {
      this.closed = true;
      this.pendingReject?.(new InputClosedError());
      this.pendingReject = null;
    });
  }

  ask(prompt: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.closed) {
        reject(new InputClosedError());
        return;
      }
      this.pendingReject = reject;
      this.rl.question(prompt, (answer) => {
        this.pendingReject = null;
        resolve(answer);
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}
