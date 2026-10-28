const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory database (or connect to SQLite/MongoDB)
let savedAudits = [];

// API Endpoint to save an energy audit report
app.post('/api/save-audit', (req, res) => {
  const auditData = req.body;
  savedAudits.push({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...auditData
  });
  console.log("Saved new audit report:", auditData);
  res.json({ success: true, message: "Audit successfully stored on backend server!", totalSaved: savedAudits.length });
});

// API Endpoint to retrieve saved audits
app.get('/api/audits', (req, res) => {
  res.json(savedAudits);
});

app.listen(PORT, () => {
  console.log(`EcoNexa Backend running on http://localhost:${PORT}`);
});