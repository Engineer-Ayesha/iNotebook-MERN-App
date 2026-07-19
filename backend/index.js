require("dotenv").config({ path: __dirname + "/.env" });
console.log(process.env.MONGO_URI);
const connectToMongo=require('./db');
connectToMongo();
const express = require('express');
var cors=require("cors");
const app = express()
const port = process.env.PORT || 5000;
console.log("Current directory:", process.cwd());
console.log("MONGO_URI:", process.env.MONGO_URI);
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/notesRoute",require('./routes/notesRoute'));
app.use('/api/userRoute',require('./routes/userRoute'));

app.listen(port, () => {
  console.log(`iNoteBook running  at http://localhost:${port}`)
})