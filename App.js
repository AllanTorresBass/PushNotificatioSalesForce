import React, { useState, useEffect, useRef } from "react";
import {
  RefreshControl,
  Text,
  View,
  Button,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Notifications from "./functions/Notifications";
import { db } from "./database/firebase";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import RegisterPushNotificationIssues from "./functions/PushNotificationIssue";
import RegisterPushNotificationJobs from "./functions/PushNotificationJobs";
import registerForPushNotificationsAsync from "./functions/registerForPushNotificationsAsync";
import queryPushNotificationIssesLog from "./functions/queryPushNotificationIssesLog";
import Notification from "./components/Notification";
import SubscriptionIssuesNotification from "./components/SubscriptionIssuesNotification";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [showNotification, setShowNotification] = useState([]);
  const [notification, setNotification] = useState(false);
  const [notificationOutSide, setNotificationOutSide] = useState(false);
  const [viewNotification, setViewNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setShowNotification(undefined);
    setTimeout(() => {
      setRefreshing(false);
      queryPushNotificationIssesLog(setShowNotification);
    }, 2000);
  }, []);
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
      <Text>{"\n"}</Text>
      <SubscriptionIssuesNotification token={expoPushToken} />
      {viewNotification ? null : notification && !notificationOutSide ? (
        <>
          <Notification
            title={notification.request.content.title}
            body={notification.request.content.body}
            someData={notification.request.content.data.someData}
          />
        </>
      ) : (
        <>
          <Notification
            title={notificationOutSide.title}
            body={notificationOutSide.body}
            someData={notificationOutSide.data}
          />
        </>
      )}
      {viewNotification ? (
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
      ) : null}
    </View>
  );
}
