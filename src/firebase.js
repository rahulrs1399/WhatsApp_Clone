import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCl_CCTXo5KaUd1G6yjtgjsoIitWgW9ZQw",
  authDomain: "whats-app-clone-f3ac8.firebaseapp.com",
  projectId: "whats-app-clone-f3ac8",
  storageBucket: "whats-app-clone-f3ac8.appspot.com",
  messagingSenderId: "849092423456",
  appId: "1:849092423456:web:7d0ccfe3e8fa8b3a643145",
  measurementId: "G-XMSB17C4T7"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);


export {auth, storage};
export default db;