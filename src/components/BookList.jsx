import React, { useState } from "react";
import axios from "axios";

function BookList(props) {
  const style = { width: "20%", padding: "8px", background: "#f4f4f4" };
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = (book) => {
    setEditingId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setPublicationYear(book.publicationYear);
    setDescription(book.description);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:8080/api/books/${editingId}`, {
        title,
        author,
        genre,
        publicationYear,
        description,
      });
      props.getAllBooks();
    } catch (e) {
      setError("Somethig went wrong while updating the book");
    } finally {
      setEditingId(null);
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8080/api/books/${bookId}`);
      props.getAllBooks();
    } catch (e) {
      setError("Somethig went wrong while updating the book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <span>{error}</span>
      <div style={{ width: "50vw" }}>
        <table>
          <thead>
            <tr>
              <th style={style}>Title</th>
              <th style={style}>Author</th>
              <th style={style}>Genre</th>
              <th style={style}>Publication Year</th>
              <th style={style}>Description</th>
              <th style={style}></th>
            </tr>
          </thead>
          <tbody>
            {props?.allBooks?.map((book) =>
              editingId === book._id ? (
                <tr key={book._id}>
                  <td style={{ padding: "8px", width: "20%" }}>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      name="title"
                      id="title"
                      placeholder="Enter book title"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      name="author"
                      id="author"
                      placeholder="Enter the author"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="text"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      name="genre"
                      id="genre"
                      placeholder="Enter genre"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="text"
                      value={publicationYear}
                      onChange={(e) => setPublicationYear(e.target.value)}
                      name="publicationYear"
                      id="publicationYear"
                      placeholder="Enter publication year"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      id="description"
                      placeholder="Enter description"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <button
                        style={{ width: "60px" }}
                        onClick={() => handleUpdate()}
                      >
                        Update
                      </button>
                      <button
                        style={{ width: "60px" }}
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={book._id}>
                  <td style={{ padding: "8px", width: "20%" }}>{book.title}</td>
                  <td style={{ padding: "8px" }}>{book.author}</td>
                  <td style={{ padding: "8px" }}>{book.genre}</td>
                  <td style={{ padding: "8px" }}>{book.publicationYear}</td>
                  <td style={{ padding: "8px" }}>{book.description}</td>
                  <td style={{ padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <button
                        style={{ width: "60px" }}
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ width: "60px" }}
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
