import React from "react";
import {
  RefreshControl,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
const ShowNotifications = (refreshing, onRefresh, showNotification) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ height: 1000, width: 300 }}>
        <Text>{"\n"}</Text>
        {showNotification ? (
          showNotification?.map((e, i) => (
            <Text key={"key" + i} style={{ fontSize: 20, bottom: 10 }}>
              {e.Description}
            </Text>
          ))
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ScrollView>
  );
};

export default ShowNotifications;
