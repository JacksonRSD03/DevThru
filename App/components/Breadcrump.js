import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
export default class Breadcrump extends Component {
  static defaultProps = {
    directory: {},
    onSelect: () => {},
  };
  OpenDrawer = () => {
    this.props.navigation.Drawer();
  };
  listDirectories = (directory) => {
    if (directory.parent) {
      return [...this.listDirectories(directory.parent), directory];
    }
    return [directory];
  };
  render() {
    const directories = this.listDirectories(this.props.directory);
    return (
      <View style={styles.breadcrump}>
        <View style={styles.header}></View>
        {directories.map((directory, index) => {
          if (index === 0) {
            return (
              <TouchableOpacity style={styles.button} onPress={this.openDrawer}>
                <Text
                  style={styles.breadcrumpItem}
                  key={index}
                  onPress={() => this.props.navigation.navigate("Drawer")}
                >
                  Main
                </Text>
              </TouchableOpacity>
            );
          } else if (index === directories.length - 1) {
            return (
              <Text
                style={(styles.breadcrumpItem, styles.currentItem)}
                key={index}
              >
                {directory.name}
              </Text>
            );
          }
          return (
            <Text
              style={styles.breadcrumpItem}
              key={index}
              onPress={() => this.props.onSelect(directory)}
            >
              {directory.name}>
            </Text>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  breadcrump: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#21CCC5",
    paddingTop: 5,
    paddingBottom: 4,
  },
  breadcrumpItem: {
    padding: 2,
    fontWeight: "bold",
  },
  currentItem: {
    fontWeight: "bold",
  },

  button: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
