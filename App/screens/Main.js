import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  Header,
  View,
  Text,
  AsyncStorage,
  Alert,
} from "react-native";
import { FirebaseStorage } from "../services/FirebaseStorage";
import DirectoryList from "../components/DirectoryList";
import Breadcrump from "../components/Breadcrump";
import ImageList from "../components/ImageList";
import ImageDialog from "../components/ImageDialog";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState([]);
  const [directoryList, setDirectoryList] = useState({});
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const [currentImage, setCurrentImage] = useState([]);

  useEffect(() => {
    getUserId();
    //listContent();
  });

  async function listContent(directory) {
    try {
      setIsLoading(true);

      const {
        imageList,
        directoryList,
        currentDirectory,
      } = await FirebaseStorage.listAll(directory);

      setImageList(imageList);
      setDirectoryList(directoryList);
      setCurrentDirectory(currentDirectory);
      isLoading(false);

      return { imageList, directoryList, currentDirectory };
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getUserId() {
    try {
      // console.log(firebase.auth().currentUser);
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        // We have data!!
        console.log(value);
      } else if (value == null) {
        console.log("valor retornou nulo");
      }
    } catch (error) {
      console.log("Deu bosta na hora de salvar, aconteceu isso: " + error);
    }
    setCurrentDirectory(value);
  }

  function onRefreshing() {
    listContent(currentDirectory);
    // console.log(this.state.currentDirectory);
  }
  function onSelectImage(image) {
    setIsDialogOPen(true);
    setCurrentImage(image);
  }

  function onCloseDialog() {
    setIsDialogOPen(false);
    setCurrentImage({});
  }

  async function removeImage(image) {
    FirebaseStorage.removeImage(image);
    onRefresh();
    onCloseDialog();
  }

  async function onAddPhoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    const response = await fetch(result.uri);
    const blob = await response.blob();
    let name = new Date().getTime() + "-media.jpg";
    var metadata = {
      contentType: "image/jpeg",
    };
    const post = firebase.storage().ref(currentDirectory).child(name);
    const task = post.put(blob, metadata);
    listContent();
    onCloseDialog();
    onRefresh();
    return task;
  }

  return (
    <LinearGradient
      colors={["#21CCC5", "#FFF", "#FFF", "#FFF", "#FFF", "#FFF"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Breadcrump directory={currentDirectory} />
        <ScrollView
          style={styles.scrollview}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={()=>onRefreshing()} />
          }
        >
              
          <ImageList images={imageList} onSelect={()=>onSelectImage()} />
        </ScrollView>

        <TouchableOpacity style={styles.fab} onPress={() => onAddPhoto()}>
          <Image
            style={styles.logoButtom}
            source={require("../../assets/cloud-upload.png")}
          />
        </TouchableOpacity>
        <ImageDialog
          image={currentImage}
          isOpen={isDialogOpen}
          onClose={()=>onCloseDialog()}
          onRemove={()=>removeImage()}
        />
        <TouchableOpacity
          onPress={() => {
            builUserDatabase();
          }}
        >
          <Text>Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollview: {
    flex: 1,
    marginTop: 10,
  },
  fab: {
    position: "absolute",
    right: 40,
    bottom: 60,
    width: 80,
    height: 80,
    backgroundColor: "#21CCC5",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoButtom: {
    width: 40,
    height: 40,
  },
  gradient: {
    flex: 1,
  },
  header: {
    width: 40,
    position: "absolute",
  },
});
