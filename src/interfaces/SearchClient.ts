/** Контракт: выполнить поиск и вернуть сырой ответ сервера (строку JSON). */
export interface SearchClient {
  /** Бросает NetworkError при проблемах с сетью. */
  search(query: string): Promise<string>;
}
