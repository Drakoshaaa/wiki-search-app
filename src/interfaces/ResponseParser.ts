import { SearchResult } from "../models/SearchResult";

/* Контракт: превратить сырой ответ сервера в список статей. */
export interface ResponseParser {
  parse(raw: string): SearchResult[];
}
