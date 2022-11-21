const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 8000;

app.listen(port, async () => {
  console.log(`server is running on port ${port}`);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "testing app" });
});