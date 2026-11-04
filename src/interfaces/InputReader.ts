/** Контракт: получить строку от пользователя. */
export interface InputReader {
  /** Показывает приглашение и ждёт ввод. Бросает InputClosedError, если ввод закрыт. */
  ask(prompt: string): Promise<string>;

  /** Освобождает ресурсы (закрывает поток ввода). */
  close(): void;
}
