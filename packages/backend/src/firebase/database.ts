import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCt8ozf8A56bH7Kp4ImU0socVIJsmfsmLM",
  authDomain: "triplebyte-5f037.firebaseapp.com",
  databaseURL: "https://triplebyte-5f037-default-rtdb.firebaseio.com",
  projectId: "triplebyte-5f037",
  storageBucket: "triplebyte-5f037.appspot.com",
  messagingSenderId: "1030117608948",
  appId: "1:1030117608948:web:8c7da2c2aa4e88971ebda1",
  measurementId: "G-70YBC6K9LV"
};
const app = initializeApp(firebaseConfig);

const firebase = () => getDatabase(app);

export default firebase;
