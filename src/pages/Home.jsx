import { useEffect, useState } from "react";
import booksData from "../data/books.json";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { Menu } from "@headlessui/react";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setBooks(booksData);
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(books.map((book) => book.category))];

  return (
    <main className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="w-[200px] p-2 border border-gray-300 rounded-md">
            {selectedCategory || "Выберите категорию"}
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-[200px] mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`${
                    active ? "bg-gray-200" : ""
                  } w-full text-left px-4 py-2 text-sm`}
                >
                  Все категории
                </button>
              )}
            </Menu.Item>
            {categories.map((category, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      active ? "bg-gray-200" : ""
                    } w-full text-left px-4 py-2 text-sm`}
                  >
                    {category}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">Книги не найдены</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
