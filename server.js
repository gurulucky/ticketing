const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();
const app = express();
const db = require('./models');
db.sequelize.sync();
// console.log(process.env);    
// Connect Database
// connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/events', require('./routes/api/events'));
app.use('/api/tickets', require('./routes/api/tickets'));
app.use('/api/stripe', require('./routes/api/stripe'));
app.use('/api/venues', require('./routes/api/venues'));
app.use('/api/categories', require('./routes/api/categories'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
// Set static folder
app.use(express.static('client/build'));
app.use('/', express.static(path.join(__dirname, 'images')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// }

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
