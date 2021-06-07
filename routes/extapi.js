const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//get all the characters from external API
router.get("/", async (req, res) => {
  const api = "https://rickandmortyapi.com/api/character/";
  const fetch_res = await fetch(api);
  const json = await fetch_res.json();

  if (!json) {
    res.status(500).json({ success: false });
  }

  res.json(json);
});

//get the character by ID from external API
router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const api_id = `https://rickandmortyapi.com/api/character/${id}`;
  const fetch_res = await fetch(api_id);
  const json = await fetch_res.json();

  if (!json) {
    res.status(500).json({ message: "There is no Character for this ID" });
  }

  res.status(200).json(json);
});

module.exports = router;
