const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Προσθήκη του path module

const app = express();
const PORT = 5500;

// Middleware setup
app.use(session(
{
  secret: 'simple-auth-example',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.json());

// Ορισμός στατικού φακέλου για το σερβίρισμα των αρχείων
app.use(express.static(path.join(__dirname, 'public')));

// Route to check login status (for SPA use)
app.get('/check-login', (req, res) => 
{
  res.json({ loggedIn: req.session.loggedIn || false });
});

// Route to handle login (login via AJAX)
app.post('/login', (req, res) => 
{
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') 
  {
    req.session.loggedIn = true;
    res.json({ success: true });
  } 
  else 
  {
    res.json({ success: false });
  }
});

// Route to handle logout (logout via AJAX)
app.get('/logout', (req, res) => 
{
  req.session.loggedIn = false;
  res.json({ success: true });
});

// Route to handle the view page (protected)
app.get('/view', (req, res) =>  
{
  if (req.session.loggedIn) 
  {
    res.json({ success: true });
  } 
  else 
  {
    res.json({ success: false });
  }
});

// Διαδρομή για την προσθήκη εγγραφών
app.post('/add-record', (req, res) => 
{
  const newRecord = req.body;

  fs.readFile('data.json', 'utf8', (err, data) => 
  {
    if (err) 
    {
      return res.status(500).json({ message: 'Error reading file' });
    }

    let jsonData = JSON.parse(data);

    // Έλεγχος αν το ID υπάρχει ήδη
    const existingRecord = jsonData.find(record => record.id === newRecord.id);
    if (existingRecord) 
    {
      return res.status(400).json({ message: 'Record with this ID already exists' });
    }

    jsonData.push(newRecord);

    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => 
    {
      if (err) 
      {
        return res.status(500).json({ message: 'Error writing file' });
      }
      res.status(200).json({ message: 'Record added successfully' });
    });
  });
});

// Διαδρομή για την προβολή της αρχικής σελίδας
app.get('/', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => 
{
  console.log(`Server running on http://localhost:${PORT}`);
});

// Διαδρομή για την ανάκτηση των εγγραφών
app.get('/records', (req, res) => 
{
  fs.readFile('data.json', 'utf8', (err, data) => 
  {
    if (err) 
    {
      return res.status(500).json({ message: 'Error reading file' });
    }
    res.json(JSON.parse(data));
  });
});

// Διαδρομή για τη διαγραφή εγγραφής με βάση το ID
app.delete('/delete-record/:id', (req, res) => 
{
  const recordId = req.params.id;

  fs.readFile('data.json', 'utf8', (err, data) => 
  {
    if (err) 
    {
      return res.status(500).json({ message: 'Error reading file' });
    }

    let jsonData = JSON.parse(data);

    // Φιλτράρισμα των εγγραφών για να αφαιρεθεί η εγγραφή με το συγκεκριμένο ID
    const updatedData = jsonData.filter(record => record.id !== recordId);

    if (jsonData.length === updatedData.length) 
    {
      return res.status(404).json({ message: 'Record not found' });
    }

    fs.writeFile('data.json', JSON.stringify(updatedData, null, 2), (err) => 
    {
      if (err) 
      {
        return res.status(500).json({ message: 'Error writing file' });
      }
      res.status(200).json({ message: 'Record deleted successfully' });
    });
  });
});

// Διαδρομή για την ενημέρωση εγγραφής με βάση το ID
app.put('/update-record/:id', (req, res) => 
{
  const recordId = req.params.id;
  const updatedRecord = req.body;

  fs.readFile('data.json', 'utf8', (err, data) => 
  {
    if (err) 
    {
      return res.status(500).json({ message: 'Error reading file' });
    }

    let jsonData = JSON.parse(data);

    // Βρίσκουμε την εγγραφή με το συγκεκριμένο ID
    const recordIndex = jsonData.findIndex(record => record.id === recordId);
    if (recordIndex === -1) 
    {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Ενημέρωση της εγγραφής
    jsonData[recordIndex] = { ...jsonData[recordIndex], ...updatedRecord };

    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => 
    {
      if (err) 
      {
        return res.status(500).json({ message: 'Error writing file' });
      }
      res.status(200).json({ message: 'Record updated successfully' });
    });
  });
});
