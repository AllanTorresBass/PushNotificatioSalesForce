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
    setTimeout(async () => {
      setRefreshing(false);
      const resp = await queryPushNotificationLog(type);

      setShowNotification(resp);
    }, 2000);
  }, [type]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#ABB4B7",
        top: 50,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "3.3%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: Platform.OS === "ios" ? 20 : 15,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {type} Notification List
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ height: 1000, width: "100%" }}
      >
        {showNotification ? (
          showNotification?.map((e, i) => {
            if (!e.deleted)
              return (
                <View
                  key={"keyx" + i}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    borderRadius: 5,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                >
                  <TouchableOpacity
                    key={"key2" + i}
                    onPress={async () => {
                      await updateUnreadToNotification(type, e.documentId);
                      const resp = await queryPushNotificationLog(type);

                      setShowNotification(resp);
                    }}
                    style={{
                      backgroundColor: e.unread ? "#BCD5DE" : "gray",

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
                      await updateDeletedToNotification(type, e.documentId);
                      const resp = await queryPushNotificationLog(type);

                      setShowNotification(resp);
                    }}
                    style={{
                      backgroundColor: "#ABB4B7",
                      height: 50,
                      width: 25,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "red",
                        fontSize: Platform.OS === "ios" ? 26 : 22,
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
      </ScrollView>
    </View>
  );
};

export default ShowNotifications;
