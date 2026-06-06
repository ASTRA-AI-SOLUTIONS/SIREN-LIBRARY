import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { readFileSync } from 'fs';

const firebaseConfig = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function test() {
  try {
    const querySnapshot = await getDocs(collection(db, 'writings'));
    console.log("Success! Docs: ", querySnapshot.size);
  } catch (e) {
    console.error("Failed: ", e);
  }
}
test();
