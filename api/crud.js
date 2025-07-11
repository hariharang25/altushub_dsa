const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;
const MONGODB_URI = "mongodb://localhost:27017/books";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BookSchema = new mongoose.Schema({
  Book_title: String,
  author: String,
  publish_date: Date,
  description: String,
});

const Book = mongoose.model("Book", BookSchema);

app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Something wrong" });
  }
});

app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book is not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Something wrong" });
  }
});

app.post("/api/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Something wrong" });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something wrong" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
