import React, { useEffect } from "react";
import {
  Platform,
  TouchableOpacity,
  RefreshControl,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import queryPushNotificationLog from "../functions/queryPushNotificationLog";
import updateUnreadToNotification from "../functions/updateUnreadToNotification";
import updateDeletedToNotification from "../functions/updateDeletedToNotification";
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
      style={{ height: 1000, width: "100%" }}
    >
      <View style={{ height: 1000, width: "100%" }}>
        <Text>{"\n"}</Text>

        {showNotification ? (
          showNotification?.map((e, i) => {
            // console.log(e);
            if (!e.deleted)
              return (
                <View
                  key={"keyx" + i}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    key={"key2" + i}
                    onPress={async () => {
                      queryPushNotificationLog(setShowNotification, type);
                      await updateUnreadToNotification(type, e.documentId);
                    }}
                    style={{
                      backgroundColor: e.unread ? "#BDF3BF" : "gray",
                      borderRadius: 5,
                      borderColor: "black",
                      borderWidth: 1,
                      height: 50,
                      width: "93%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: e.unread ? "black" : "white",

                        fontSize: Platform.OS === "ios" ? 16 : 12,
                      }}
                    >
                      {" "}
                      {e.Description}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={"key" + i}
                    onPress={async () => {
                      queryPushNotificationLog(setShowNotification, type);
                      await updateDeletedToNotification(type, e.documentId);
                    }}
                    style={{
                      borderRadius: 5,
                      borderColor: "black",
                      borderWidth: 1,
                      height: 50,
                      width: 25,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "red",
                        fontSize: 38,
                        top: -5,
                      }}
                    >
                      x
                    </Text>
                  </TouchableOpacity>
                </View>
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
