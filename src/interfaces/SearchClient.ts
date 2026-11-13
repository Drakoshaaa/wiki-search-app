/* Контракт: выполнить поиск и вернуть сырой ответ сервера (строку JSON). */
export interface SearchClient {
  search(query: string): Promise<string>;
}
