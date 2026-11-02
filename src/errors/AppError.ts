/**
 * Базовый класс всех ожидаемых ошибок приложения.
 * Сообщение каждой ошибки написано так, чтобы его можно было сразу показать пользователю.
 */
export class AppError extends Error {
  constructor(message: string) {
    super(message);
    // new.target.name - имя реального (дочернего) класса, например "NetworkError"
    this.name = new.target.name;
  }
}
