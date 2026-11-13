/* Собирает адреса для обращения к Википедии. Отвечает только за формат URL. */
export class WikipediaUrlBuilder {
  constructor(private readonly baseUrl: string = "https://ru.wikipedia.org") {}

/* Адрес поискового запроса. */
  buildSearchUrl(query: string, limit: number = 10): string {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      utf8: "1",
      format: "json",
      srlimit: String(limit),
      srsearch: query,
    });
    return `${this.baseUrl}/w/api.php?${params.toString()}`;
  }

  /* Адрес статьи по её pageid. */
  buildArticleUrl(pageId: number): string {
    return `${this.baseUrl}/w/index.php?curid=${pageId}`;
  }
}
