import { spawn } from "node:child_process";
import { BrowserOpener } from "../interfaces/BrowserOpener";
import { BrowserOpenError } from "../errors/BrowserOpenError";

/* Открывает адрес в браузере по умолчанию (Windows, macOS, Linux). */
export class SystemBrowserOpener implements BrowserOpener {
  open(url: string): Promise<void> {
    if (!/^https?:\/\//i.test(url)) {
      return Promise.reject(new BrowserOpenError(url, "некорректный адрес"));
    }

    const [command, args] = this.commandFor(url);

    return new Promise<void>((resolve, reject) => {
      const child = spawn(command, args, { detached: true, stdio: "ignore" });
      child.once("error", (error) => reject(new BrowserOpenError(url, error.message)));
      child.once("spawn", () => {
        child.unref();
        resolve();
      });
    });
  }

  /* Выбирает системную команду открытия ссылки в зависимости от ОС. */
  private commandFor(url: string): [string, string[]] {
    switch (process.platform) {
      case "win32":
        return ["rundll32", ["url.dll,FileProtocolHandler", url]];
      case "darwin":
        return ["open", [url]];
      default:
        return ["xdg-open", [url]];
    }
  }
}
