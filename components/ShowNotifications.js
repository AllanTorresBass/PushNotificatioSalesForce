import React, { useEffect } from "react";
import {
  TouchableOpacity,
  RefreshControl,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import queryPushNotificationLog from "../functions/queryPushNotificationLog";
import updateUnreadToNotification from "../functions/updateUnreadToNotification";
const ShowNotifications = ({ showNotification, setShowNotification, type }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setShowNotification(undefined);
    setTimeout(() => {
      setRefreshing(false);
      queryPushNotificationLog(setShowNotification, type);
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
          showNotification?.map((e, i) => {
            // console.log(e);
            return (
              <TouchableOpacity
                key={"key" + i}
                onPress={async () => {
                  queryPushNotificationLog(setShowNotification, type);
                  await updateUnreadToNotification(type, e.documentId);
                }}
                style={{
                  backgroundColor: e.unread ? "#BDF3BF" : "gray",
                  borderRadius: 5,
                  borderColor: "black",
                  borderWidth: 1,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: e.unread ? "black" : "white", fontSize: 18 }}
                >
                  {" "}
                  {e.Description}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ScrollView>
  );
};

export default ShowNotifications;
