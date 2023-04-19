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

import RegisterPushNotificationIssues from "./functions/PushNotificationIssue";
import RegisterPushNotificationJobs from "./functions/PushNotificationJobs";
import registerForPushNotificationsAsync from "./functions/registerForPushNotificationsAsync";
import queryPushNotificationLog from "./functions/queryPushNotificationLog";
import Notification from "./components/Notification";
import SubscriptionIssuesNotification from "./components/SubscriptionIssuesNotification";
import SubscriptionJobsNotification from "./components/SubscriptionJobsNotification";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [type, setType] = useState("");
  const [showNotification, setShowNotification] = useState([]);
  const [notification, setNotification] = useState(false);
  const [notificationOutSide, setNotificationOutSide] = useState(false);
  const [viewJobNotification, setviewJobNotification] = useState(false);
  const [viewIssueNotification, setviewIssueNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setShowNotification(undefined);
    setTimeout(() => {
      setRefreshing(false);
      queryPushNotificationLog(setShowNotification, type);
    }, 2000);
  }, [type]);
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
    queryPushNotificationLog(setShowNotification, type);

    return () => {};
  }, [setShowNotification]);
  const queryFirebase = (type) => {
    setType(type);
    queryPushNotificationLog(setShowNotification, type);
  };
  console.log("viewIssueNotification: ", viewJobNotification);
  console.log("viewJobNotification: ", viewJobNotification);
  return (
    <View style={{ flex: 1, left: 10, top: 100 }}>
      <Text style={{ fontSize: 16, bottom: 10 }}>
        Your expo push token: {expoPushToken}
      </Text>
      <Button
        onPress={() => {
          viewIssueNotification
            ? setviewIssueNotification(false)
            : setviewIssueNotification(true);
          queryFirebase("Issue");
          setviewJobNotification(false);
        }}
        title={
          viewIssueNotification
            ? "Hide Issues Notifications"
            : "show Issues Notifications"
        }
      />
      <Text>{"\n"}</Text>
      <Button
        onPress={() => {
          viewJobNotification
            ? setviewJobNotification(false)
            : setviewJobNotification(true);
          queryFirebase("Job");
          setviewIssueNotification(false);
        }}
        title={
          viewJobNotification
            ? "Hide Jobs Notifications"
            : "show Jobs Notifications"
        }
      />
      <Text>{"\n"}</Text>
      {expoPushToken ? (
        <SubscriptionIssuesNotification token={expoPushToken} />
      ) : (
        <ActivityIndicator />
      )}
      <Text>{"\n"}</Text>
      {expoPushToken ? (
        <>
          <SubscriptionJobsNotification token={expoPushToken} />
        </>
      ) : (
        <ActivityIndicator />
      )}
      {viewIssueNotification || viewJobNotification ? null : notification &&
        !notificationOutSide ? (
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
      {viewIssueNotification || viewJobNotification ? (
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
