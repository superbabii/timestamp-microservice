const express = require('express');
const app = express();

// Allow cross-origin requests
const cors = require('cors');
app.use(cors());

// Root endpoint - displays API instructions
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Timestamp Microservice. Use /api/:date to get a timestamp."
  });
});

// Endpoint to handle date requests
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  let date;
  if (!dateParam) {
    // No date provided, return current date
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If dateParam is a number, treat as UNIX timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat as a date string
    date = new Date(dateParam);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
