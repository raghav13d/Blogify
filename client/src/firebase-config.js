import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCfN09vZsT4IZVvOZ20ACiNGzLNCsEs5nQ",
    authDomain: "blogify-41b80.firebaseapp.com",
    projectId: "blogify-41b80",
    storageBucket: "blogify-41b80.appspot.com",
    messagingSenderId: "1070785948187",
    appId: "1:1070785948187:web:227fca2e3f1afef997a6be",
    measurementId: "G-5Z9B9M303E"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage}; 