const mongoose = require("mongoose");
const express = require("express");
const { ObjectId } = require("mongodb");
const router = new express.Router();

const Book = require("../models/book");

const isReqIsValid = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    }
    return false;
  }
  return false;
};

//sortBy, <param>=<value>
//GET /books?author=jc or GET
router.get("/books", async (req, res) => {
  const author = req.query.author ? decodeURIComponent(req.query.author) : null;
  //console.log(author);
  let filterObj = {};
  if (author != null) {
    filterObj["author"] = author;
  }
  const projectionObj = {
    author: 1,
    title: 1,
    noOfPages: 1,
    _id: 0,
  };
  try {
    const books = await Book.find(filterObj, projectionObj);
    res.send(books);
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    if (isReqIsValid(req.params.id)) {
      const book = await Book.findById(req.params.id);
      if (!book) {
        res.status(400).send();
      }
      res.send({ book });
    }
    res.status(400).send({ error: "Provided ID is invalid." });
  } catch (e) {
    res.status(404).send();
  }
});

router.post("/books/add", async (req, res) => {
  try {
    const newBook = new Book(req.body.book);
    const book = await newBook.save();
    if (!book) {
      res.status(400).send();
    }
    res.send({
      message: "Book created succesfully",
      book: {
        title: book.title,
        author: book.author,
      },
    });
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

router.delete('/books/:id',async (req,res)=>{
    try {
        if(isReqIsValid(req.params.id)){
            const book=await Book.findByIdAndDelete(req.params.id)
            res.send({message:"Deleted book succesfully",book});
        }else{
            res.status(400).send({error:"Provided Id is invalid"})
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
})

module.exports = router;
