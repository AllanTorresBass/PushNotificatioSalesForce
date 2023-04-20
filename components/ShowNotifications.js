import React from "react";
import {
  RefreshControl,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import queryPushNotificationIssesLog from "../functions/queryPushNotificationLog";
const ShowNotifications = ({ showNotification, setShowNotification, type }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setShowNotification(undefined);
    setTimeout(() => {
      setRefreshing(false);
      queryPushNotificationIssesLog(setShowNotification, type);
    }, 2000);
  }, [type]);
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
