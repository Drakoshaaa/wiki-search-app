/**
 * Типы "сырого" JSON-ответа API Википедии.
 * Все поля необязательные: мы не можем доверять серверу и проверяем их в парсере.
 */
export interface RawSearchItem {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

export interface WikiApiResponse {
  query?: {
    searchinfo?: { totalhits: number };
    search?: RawSearchItem[];
  };
  error?: {
    code: string;
    info: string;
  };
}
