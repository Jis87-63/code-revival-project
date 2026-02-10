import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, query, orderByChild } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3uAHrQyJCSyIQzP8X3Uq7ukJ2lWy0tg8",
  authDomain: "bot-ia-20e75.firebaseapp.com",
  databaseURL: "https://bot-ia-20e75-default-rtdb.firebaseio.com",
  projectId: "bot-ia-20e75",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, query, orderByChild };
