import React from "react";
import { Text, View } from "react-native";
const Notification = ({ title, body, someData, data }) => {
  return (
    <View style={{ top: 100 }}>
      <Text style={{ fontSize: 20, bottom: 10 }}>Title: {title} </Text>
      <Text style={{ fontSize: 20, bottom: 10 }}>Body: {body}</Text>
      <Text style={{ fontSize: 20, bottom: 10 }}>
        someData: {someData}
        {"\n"}
        Data: {JSON.stringify(data)}
        {"\n"}
      </Text>
    </View>
  );
};

export default Notification;
