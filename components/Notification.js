import React from "react";
import { Text, View } from "react-native";
const Notification = ({ title, body, someData }) => {
  return (
    <View style={{ top: 100 }}>
      <Text style={{ fontSize: 20, bottom: 10 }}>Title: {title} </Text>
      <Text style={{ fontSize: 20, bottom: 10 }}>Body: {body}</Text>
      <Text style={{ fontSize: 20, bottom: 10 }}>
        Data: {someData}
        {"\n"}
      </Text>
    </View>
  );
};

export default Notification;
