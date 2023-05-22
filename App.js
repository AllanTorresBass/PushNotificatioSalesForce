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
import ShowNotificationButton from "./components/ShowNotificationButton";

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
        console.log("notification", notification);
        setNotification(notification);
        setNotificationOutSide(null);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response", response);
        setNotificationOutSide({
          title: response.notification.request.content.title,
          body: response.notification.request.content.body,
          someData: response.notification.request.content.data.someData,
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
    <View
      style={{
        flex: 1,
        left: 5,
        top: 0,
        width: "98%",
        align: "center",
        borderColor: "red",
        borderWidth: 3,
      }}
    >
      <Text>{"\n"}</Text>
      {/* <Text style={{ fontSize: 16, bottom: 10 }}>
        Your expo push token: {expoPushToken}
      </Text> */}
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
      <View style={{ display: "flex", flexDirection: "row", left: 30 }}>
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          top: 10,
          borderColor: "yellow",
          borderWidth: 3,
          alignItems: "center",
          width: "100%",
        }}
      >
        <ShowNotificationButton
          queryFirebase={queryFirebase}
          setviewIssueNotification={setviewIssueNotification}
          viewIssueNotification={viewIssueNotification}
          setviewJobNotification={setviewJobNotification}
          type="Issue"
        />

        <ShowNotificationButton
          queryFirebase={queryFirebase}
          setviewJobNotification={setviewJobNotification}
          viewJobNotification={viewJobNotification}
          type="Job"
          setviewIssueNotification={setviewIssueNotification}
        />
      </View>
      {viewIssueNotification || viewJobNotification ? null : notification &&
        !notificationOutSide ? (
        <>
          <Notification
            title={notification.request.content.title}
            body={notification.request.content.body}
            someData={notification.request.content.data.someData}
            data={notification.request.content.data.data}
          />
        </>
      ) : (
        <>
          <Notification
            title={notificationOutSide.title}
            body={notificationOutSide.body}
            someData={notificationOutSide.someData}
            data={notificationOutSide.data}
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
