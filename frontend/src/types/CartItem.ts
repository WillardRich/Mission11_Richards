import type { Book } from "./Book";

export interface CartItem {
  project: Book;
  quantity: number;
}