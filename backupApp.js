import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button } from "react-native";

import Notifications from "./functions/Notifications";
import { db } from "./database/firebase";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import RegisterPushNotificationIssues from "./functions/PushNotificationIssue";
import RegisterPushNotificationJobs from "./functions/PushNotificationJobs";
import registerForPushNotificationsAsync from "./functions/registerForPushNotificationsAsync";
import queryPushNotificationIssesLog from "./functions/queryPushNotificationIssesLog";
import on_Refresh from "./functions/onRefresh";
import Notification from "./components/Notification";
import NotificationOutSide from "./components/NotificationOutSide";
import ShowNotifications from "./components/ShowNotifications";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [showNotification, setShowNotification] = useState([]);
  const [notification, setNotification] = useState();
  const [notificationOutSide, setNotificationOutSide] = useState();
  const [viewNotification, setViewNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      setExpoPushToken(token);

      site_id = "p:northHotelKeyWest24:r:2a3cbbf4-0d3cf345";
      await RegisterPushNotificationIssues(db, site_id, token);
      await RegisterPushNotificationJobs(db, site_id, token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        setNotificationOutSide(null);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotificationOutSide({
          title: response.notification.request.content.title,
          body: response.notification.request.content.body,
          data: response.notification.request.content.data.someData,
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    queryPushNotificationIssesLog(setShowNotification);

    return () => {};
  }, [setShowNotification]);
  const queryFirebase = () => {
    queryPushNotificationIssesLog(setShowNotification);
  };
  let onRefresh = on_Refresh(
    queryPushNotificationIssesLog,
    setRefreshing,
    setShowNotification
  );
  return (
    <View style={{ flex: 1, left: 10, top: 100 }}>
      <Text style={{ fontSize: 16, bottom: 10 }}>
        Your expo push token: {expoPushToken}
      </Text>
      <Button
        onPress={() => {
          viewNotification
            ? setViewNotification(false)
            : setViewNotification(true);
          queryFirebase();
        }}
        title={viewNotification ? "Ocultar notificaiones" : "Ver notificaiones"}
      />
      {viewNotification ? null : notification && !notificationOutSide ? (
        <>
          <Notification notification={notification} />
        </>
      ) : (
        <>
          <NotificationOutSide notificationOutSide={notificationOutSide} />
        </>
      )}

      {viewNotification ? (
        <>
          <ShowNotifications
            refreshing={refreshing}
            onRefresh={onRefresh}
            showNotification={showNotification}
          />
        </>
      ) : null}
    </View>
  );
}
