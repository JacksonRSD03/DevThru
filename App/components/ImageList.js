import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  View,
  Text,
} from "react-native";

export default class ImageList extends Component {
  static defaultProps = {
    images: [],
    onSelect: () => {},
  };
  render() {
    const { props } = this;

    return (
      <View style={styles.imageContainer}>
        {props.images.map((image, index) => {
          return (
            <TouchableHighlight
              key={index}
              onPress={() => props.onSelect(image)}
            >
              <Image style={styles.image} source={{ uri: image.uri }} />
            </TouchableHighlight>
          );
        })}
      </View>
    );
  }
}
const { width } = Dimensions.get("screen"),
  size = width / 3 - 10;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: size,
    height: size,
    margin: 4,
  },
});
