const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8080;

const BASE_URL = "https://letscountapi.com";
const NAMESPACE = "the-science-guild-counter2";

app.use(express.json());

// Get counter value
app.get("/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/${NAMESPACE}/${key}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching counter:", error.message);
    res.status(500).json({ error: "Failed to get counter value" });
  }
});

// Increment counter value
app.post("/:key/increment", async (req, res) => {
  const { key } = req.params;
  try {
    const response = await axios.post(
      `${BASE_URL}/${NAMESPACE}/${key}/increment`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error incrementing counter:", error.message);
    res.status(500).json({ error: "Failed to increment counter" });
  }
});

// Initialize counter
app.post("/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const response = await axios.post(`${BASE_URL}/${NAMESPACE}/${key}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error initializing counter:", error.message);
    res.status(500).json({ error: "Failed to initialize counter" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
