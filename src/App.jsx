import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import Dropdown from "./components/DropDown";

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const getAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books");
      setAllBooks(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the books");
    }
  };

  const getAllGenres = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books/genre");
      setGenreOptions(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the genre");
    }
  };

  const getAllYears = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books/years");
      setYearOptions(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the years");
    }
  };

  const getFilteredBooks = async (
    selectedYear = selectedYear,
    selectedGenre = selectedGenre
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books/filter?year=${selectedYear}&genre=${selectedGenre}`
      );
      setAllBooks(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the years");
    }
  };

  const handleFilterGenre = async (option) => {
    setSelectedGenre(option);
    getFilteredBooks(selectedYear, option);
  };

  const handleFilterYear = async (option) => {
    setSelectedYear(option);
    getFilteredBooks(option);
  };

  useEffect(() => {
    getAllBooks();
    getAllGenres();
    getAllYears();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books/search?query=${search}`
      );
      setAllBooks(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the books");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Book List</h1>
      <AddBook getAllBooks={getAllBooks} />
      <h3>Book List</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="search">Search </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            id="search"
            placeholder="Enter book title"
          />
          <button style={{ marginLeft: "8px" }} onClick={handleSearch}>
            Search
          </button>
          {search ? (
            <button
              style={{ marginLeft: "8px" }}
              onClick={() => {
                setSearch("");
                getAllBooks();
              }}
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "32px",
            marginBottom: "8px",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="search">Filter by Genre </label>
            <Dropdown onSelect={handleFilterGenre} options={genreOptions} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="search">Filter by Year </label>
            <Dropdown onSelect={handleFilterYear} options={yearOptions} />
          </div>
        </div>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <BookList allBooks={allBooks} getAllBooks={getAllBooks} />
      )}
    </div>
  );
};

export default App;
