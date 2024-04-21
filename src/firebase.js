import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1KHcqQEr24OV0NfCVi5us9dqTWo3w-x8",
  authDomain: "scanserve-88.firebaseapp.com",
  projectId: "scanserve-88",
  storageBucket: "scanserve-88.appspot.com",
  messagingSenderId: "1024421673647",
  appId: "1:1024421673647:web:643792c83aa236e0a3b25a"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};
