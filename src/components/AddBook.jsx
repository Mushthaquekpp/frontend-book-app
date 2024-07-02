import React, { useState } from "react";
import axios from "axios";

function AddBook(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:8080/api/books", {
        title,
        author,
        genre,
        publicationYear,
        description,
      });
      props.getAllBooks();
    } catch (e) {
      setError("Somethig went wrong while adding the book");
    }
    handleCancel();
    setLoading(false);
  };

  const handleCancel = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationYear("");
    setDescription("");
  };

  return (
    <div style={{ width: "15vw", minWidth: "250px", maxWidth: "300px" }}>
      <form onSubmit={handleBookSubmit}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            placeholder="Enter book title"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            name="author"
            id="author"
            placeholder="Enter the author"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            name="genre"
            id="genre"
            placeholder="Enter genre"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Publication Year</label>
          <input
            type="text"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            name="publicationYear"
            id="publicationYear"
            placeholder="Enter publication year"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            placeholder="Enter description"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            gap: "16px",
          }}
        >
          <button onClick={handleCancel}>Cancel</button>
          <button disabled={loading} type="submit">
            Add Book
          </button>
        </div>
        {error}
      </form>
    </div>
  );
}

export default AddBook;
