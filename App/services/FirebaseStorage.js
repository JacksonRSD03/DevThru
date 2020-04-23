import { CameraRoll, Alert } from "react-native";
import * as firebase from "firebase";

//import fs from "react-native-fs";
const firebaseConfig = {
  apiKey: "AIzaSyDkTKL9f-owXku5pmkmnttvRLnMqLjojyo",
  authDomain: "my-pictures-181e5.firebaseapp.com",
  databaseURL: "https://my-pictures-181e5.firebaseio.com",
  projectId: "my-pictures-181e5",
  storageBucket: "my-pictures-181e5.appspot.com",
  messagingSenderId: "140170862351",
  appId: "1:140170862351:web:6cef5d3a52ece0ddd1e87a",
  measurementId: "G-Z0CFRDR4P0",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage(),
  storageRef = storage.ref("/");

export const FirebaseStorage = {
  async listAll(currentStorageRef = storageRef) {
    const result = await currentStorageRef
        .child(`${firebase.auth().currentUser.uid}`)
        .listAll(),
      directoryList = result.prefixes,
      imageUrlList = await Promise.all(
        result.items.map((item) => item.getDownloadURL())
      ),
      imageList = result.items.map((item, index) =>
        Object.assign(item, { uri: imageUrlList[index] })
      );
    
    return { imageList, directoryList, currentDirectory: currentStorageRef };
  },
  async downloadImage(imageRef) {
    const fileName = `${fs.DocumentDirectoryPath}/${imageRef.name}`;
    result = fs.downloadFile({
      fromUrl: imageRef.uri,
      toFile: fileName,
    });
    await result.promise;
    await CameraRoll.saveToCameraRoll(`file://${fileName}`, "photo");
    return fileName;
  },
  async removeImage(imageRef) {
    return imageRef.delete();
  },
};
