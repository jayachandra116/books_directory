const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/book_directory_api";

mongoose.connect(URL, {
  useNewUrlParser: true,
});
