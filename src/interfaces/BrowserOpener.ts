/** Контракт: открыть адрес в браузере. */
export interface BrowserOpener {
  /** Бросает BrowserOpenError, если открыть не удалось. */
  open(url: string): Promise<void>;
}
