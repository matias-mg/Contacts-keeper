const express = require('express');
const app = express();
// Traer a la conexión de BBDD
const connectDB = require('./config/db');

// Connect to DDBB
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); 

app.get('/', (req, res) => {
  res.json({ asd: 'Hola' });
})

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));