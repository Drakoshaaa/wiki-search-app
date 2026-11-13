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
