const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// app.use(express.static('client/build'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.get('/event', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.get('/book', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/events', require('./routes/api/events'));
app.use('/api/tickets', require('./routes/api/tickets'));
app.use('/api/stripe', require('./routes/api/stripe'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // app.use(express.static('client/build'));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
