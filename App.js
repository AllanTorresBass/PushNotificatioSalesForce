import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, ActivityIndicator } from "react-native";

import Notifications from "./functions/Notifications";
import { db } from "./database/firebase";

import RegisterPushNotificationIssues from "./functions/registerPushNotificationIssue";
import RegisterPushNotificationJobs from "./functions/registerPushNotificationJobs";
import registerForPushNotificationsAsync from "./functions/registerForPushNotificationsAsync";
import queryPushNotificationLog from "./functions/queryPushNotificationLog";
import Notification from "./components/Notification";
import ShowNotifications from "./components/ShowNotifications";
import SubscriptionNotification from "./components/SubscriptionNotification";

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [type, setType] = useState("Issue");
  const [showNotification, setShowNotification] = useState([]);
  const [notification, setNotification] = useState(false);
  const [notificationOutSide, setNotificationOutSide] = useState(false);
  const [viewJobNotification, setviewJobNotification] = useState(false);
  const [viewIssueNotification, setviewIssueNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

  return (
    <View style={{ flex: 1, left: 10, top: 12 }}>
      <Text style={{ fontSize: 16, bottom: 10 }}>
        Your expo push token: {expoPushToken}
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
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
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            marginTop: -8,
            color: "red",
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          {" "}
          {"\n"}Subscribe:
        </Text>
        {expoPushToken ? (
          <SubscriptionNotification token={expoPushToken} type={"Issue"} />
        ) : (
          <ActivityIndicator />
        )}

        <Text>{"\n"}</Text>
        {expoPushToken ? (
          <>
            <SubscriptionNotification token={expoPushToken} type={"Job"} />
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
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
        <>
          {showNotification ? (
            <ShowNotifications
              showNotification={showNotification}
              setShowNotification={setShowNotification}
              type={type}
            />
          ) : (
            <ActivityIndicator />
          )}
        </>
      ) : null}
    </View>
  );
}
