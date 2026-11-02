/**
 * Одна найденная статья Википедии.
 * Неизменяемый объект: все поля readonly и задаются только в конструкторе.
 */
export class SearchResult {
  constructor(
    public readonly pageId: number,
    public readonly title: string,
    public readonly snippet: string,
    public readonly url: string,
  ) {}
}
