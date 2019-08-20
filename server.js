const express = require('express');
const connectDB = require('./config/db')
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to db
connectDB();

app.get('/', (req, res) => res.send('App is running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
