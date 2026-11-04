import { SearchResult } from "../models/SearchResult";

/** Контракт: превратить сырой ответ сервера в список статей. */
export interface ResponseParser {
  /** Бросает ParseError или NoResultsError. */
  parse(raw: string): SearchResult[];
}
