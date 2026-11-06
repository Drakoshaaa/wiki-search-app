import { ResponseParser } from "../interfaces/ResponseParser";
import { SearchResult } from "../models/SearchResult";
import { RawSearchItem, WikiApiResponse } from "../models/WikiApiResponse";
import { WikipediaUrlBuilder } from "./WikipediaUrlBuilder";
import { ParseError } from "../errors/ParseError";
import { NoResultsError } from "../errors/NoResultsError";

/** Этап 3. Разбирает JSON-ответ Википедии и превращает его в список SearchResult. */
export class WikipediaResponseParser implements ResponseParser {
  constructor(private readonly urlBuilder: WikipediaUrlBuilder) {}

  parse(raw: string): SearchResult[] {
    const items = this.extractItems(this.parseJson(raw));

    const results: SearchResult[] = [];
    for (const item of items) {
      const result = this.toSearchResult(item);
      if (result !== null) {
        results.push(result);
      }
    }

    if (results.length === 0) {
      throw new NoResultsError();
    }
    return results;
  }

  private parseJson(raw: string): unknown {
    try {
      return JSON.parse(raw);
    } catch {
      throw new ParseError("ответ не является корректным JSON");
    }
  }

  private extractItems(data: unknown): unknown[] {
    if (typeof data !== "object" || data === null) {
      throw new ParseError("неожиданный формат ответа");
    }
    const response = data as WikiApiResponse;

    if (response.error) {
      throw new ParseError(response.error.info ?? "API вернуло ошибку");
    }

    const found = response.query?.search;
    if (!Array.isArray(found)) {
      throw new ParseError("в ответе нет списка результатов");
    }
    return found;
  }

  /** Возвращает null для записей с повреждённой структурой: такие просто пропускаем. */
  private toSearchResult(item: unknown): SearchResult | null {
    if (typeof item !== "object" || item === null) {
      return null;
    }
    const raw = item as Partial<RawSearchItem>;

    if (typeof raw.pageid !== "number" || typeof raw.title !== "string") {
      return null;
    }
    const snippet = typeof raw.snippet === "string" ? this.cleanSnippet(raw.snippet) : "";

    return new SearchResult(raw.pageid, raw.title, snippet, this.urlBuilder.buildArticleUrl(raw.pageid));
  }

  /** Убирает HTML-теги (<span class="searchmatch">) и раскодирует частые сущности. */
  private cleanSnippet(html: string): string {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
  }
}
