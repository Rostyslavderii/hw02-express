

const app = require('../app')

const mongoose = require('mongoose')
require('dotenv').config()
const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000")
})



mongoose.connect(DB_HOST)
  .then(() => console.log('database connected successful')) 
  .catch(() => console.log('error connecting to database',
    process.exit(1)));
