import { SearchClient } from "../interfaces/SearchClient";
import { WikipediaUrlBuilder } from "./WikipediaUrlBuilder";
import { NetworkError } from "../errors/NetworkError";

/** Этап 2. Отправляет запрос к API Википедии и возвращает тело ответа как строку. */
export class WikipediaApiClient implements SearchClient {
  constructor(
    private readonly urlBuilder: WikipediaUrlBuilder,
    private readonly timeoutMs: number = 10_000,
  ) {}

  async search(query: string): Promise<string> {
    const url = this.urlBuilder.buildSearchUrl(query);

    let response: Response;
    try {
      response = await fetch(url, {
        // Википедия просит указывать User-Agent
        headers: { "User-Agent": "WikiSearchLab/1.0 (educational console project)" },
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (error) {
      throw new NetworkError(this.describe(error));
    }

    if (!response.ok) {
      throw new NetworkError(`сервер ответил кодом ${response.status}`);
    }

    try {
      return await response.text();
    } catch (error) {
      throw new NetworkError(this.describe(error));
    }
  }

  /** Превращает техническую ошибку fetch в понятную причину. */
  private describe(error: unknown): string {
    if (error instanceof Error) {
      if (error.name === "TimeoutError") {
        return `сервер не ответил за ${this.timeoutMs / 1000} с`;
      }
      return "не удалось подключиться к серверу, проверьте интернет";
    }
    return "неизвестная ошибка";
  }
}
