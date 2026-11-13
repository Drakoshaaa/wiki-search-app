/* Контракт: открыть адрес в браузере. */
export interface BrowserOpener {
  open(url: string): Promise<void>;
}
