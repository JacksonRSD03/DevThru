import Firebase from "firebase";
let config = {
  apiKey: "AIzaSyDkTKL9f-owXku5pmkmnttvRLnMqLjojyo",
  authDomain: "my-pictures-181e5.firebaseapp.com",
  databaseURL: "https://my-pictures-181e5.firebaseio.com",
  projectId: "my-pictures-181e5",
  storageBucket: "my-pictures-181e5.appspot.com",
  messagingSenderId: "140170862351",
  appId: "1:140170862351:web:6cef5d3a52ece0ddd1e87a",
  measurementId: "G-Z0CFRDR4P0",
};
let app = Firebase.initializeApp(config);
export const db = app.database();
