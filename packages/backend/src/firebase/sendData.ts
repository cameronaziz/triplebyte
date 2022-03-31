import { ref, set } from 'firebase/database';
import firebase from './database';

const sendData = async <T extends Record<string, any>>(key: string, value: T): Promise<T> => {
  const db = firebase();
  const databaseKey = key.endsWith('/') ? key : `${key}/`;
  await set(ref(db, databaseKey), value);
  return value;
};

export default sendData;
