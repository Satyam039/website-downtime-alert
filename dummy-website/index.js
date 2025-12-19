const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Dummy Website Running ✅");
});

app.listen(8080, () => {
  console.log("Dummy website running on port 8080");
});
