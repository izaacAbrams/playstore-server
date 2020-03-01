const express = require("express");
const morgan = require("morgan");
const app = express();
const store = require("./playstore.js");

app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { sort, genre } = req.query;
  let results = store;

  if (genre) {
    if (
      !["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(
        genre
      )
    ) {
      return res
        .status(400)
        .send(
          "Genre must be one of these options: Action, Puzzle, Strategy, Casual, Arcade, Card"
        );
    }
    results = store.filter(game =>
      game["Genres"].toLowerCase().includes(genre.toLowerCase())
    );
  }
  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort can only be applied to rating or app");
    }
  }

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(results);
});
module.exports = app;
