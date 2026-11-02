import { AppError } from "./AppError";

/** Поток ввода закрыт (например, пользователь нажал Ctrl+D или Ctrl+C). */
export class InputClosedError extends AppError {
  constructor() {
    super("Ввод закрыт.");
  }
}
