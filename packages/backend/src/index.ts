import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import firebase from './firebase';

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Routes
app.get('/get-data', async (req, res) => {
  const data = await firebase.fetch('data/');
  res.send(data);
});

app.post('/set-data', async (req, res) => {
  const response = firebase.send('data/',  req.body);
  res.send(response);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Triplebyte backend has launched on port ${PORT}.`)
});
