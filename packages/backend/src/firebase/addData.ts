import { push, ref, set } from 'firebase/database';
import firebase from './database';

const addData = async <T extends Record<string, any>>(key: string, value: T): Promise<T> => {
  const db = firebase();
  const dbRef = ref(db, key);
  const newPostRef = push(dbRef);
  await set(newPostRef, value);
  return value;
};

export default addData;
