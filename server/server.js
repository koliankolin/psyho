const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.use(cors());
app.get('/', (request, response) => response.send('API running'));

//Define routes
app.use('/api/user', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/appointment', require('./routes/api/appointments'));
app.use('/api/article', require('./routes/api/articles'));
app.use('/api/news', require('./routes/api/news'));



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));