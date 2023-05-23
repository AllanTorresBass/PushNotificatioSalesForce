import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
const Notification = ({ title, body, someData, data }) => {
  return (
    <View
      style={{
        top: 100,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#BCD5DE",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Title:</Text>

        <Text style={styles.description}> {title} </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Body:</Text>
        <Text style={styles.description}>{body}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>someData:</Text>
        <Text style={styles.description}>{someData}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Data:</Text>
        <Text style={styles.description}>{JSON.stringify(data)}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: Platform.OS === "ios" ? 20 : 15,
    bottom: 0,
    width: "30%",
    backgroundColor: "blue",
    color: "white",
    padding: 5,
  },

  description: {
    color: "black",
    textAlign: "center",
    padding: 5,
    fontSize: Platform.OS === "ios" ? 22 : 17,
    bottom: 0,
    width: "70%",
  },
});
export default Notification;
