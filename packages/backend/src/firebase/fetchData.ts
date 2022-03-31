import { onValue, ref } from 'firebase/database';
import firebase from './database';

const fetchData = <T extends Record<string, any>>(key: string): Promise<T> =>
  new Promise((resolve, reject) => {
    const db = firebase();
    const databaseKey = key.endsWith('/') ? key : `${key}/`;
    const storageRef = ref(db, databaseKey);
    onValue(storageRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    });
  });

export default fetchData;
