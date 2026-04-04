import type { Book } from "../types/Book";

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}
const API_Url = "https://richardsbookstore-backend-dmhhe0hsdeg2eyf9.francecentral-01.azurewebsites.net/api/books";
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `categories=${encodeURIComponent(cat)}`)
      .join("&");

    const response = await fetch(
      `${API_Url}?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ""
      }`,
    );

    const data = await response.json();
    return data;
    if (response.ok) {
      throw new Error(data.message || "Failed to fetch books");
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error; // Rethrow to let the caller handle it
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_Url}/Add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    const addedBook = await response.json();
    return addedBook;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const updateBook = async (bookID: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_Url}/Update/${bookID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};
export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_Url}/Delete/${bookID}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete book");
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};
