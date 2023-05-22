import React, { useEffect, useState } from "react";
import { View, Button, Pressable, Text } from "react-native";
import readSubscriptionToNotification from "../functions/readSubscriptionToNotification";
import updateSubscriptionToNotification from "../functions/updateSubscriptionToNotifications";
const SubscriptionNotification = ({ token, type }) => {
  const [subcription, setSubcription] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    (() => {
      readSubscriptionToNotification(type, token).then((res) =>
        setSubcription(res)
      );
    })();

    return () => {};
  }, [flag]);

  const handelSubscription = () => {
    updateSubscriptionToNotification(type, token, subcription[0]?.active);
    // setSubcription(undefined);
    readSubscriptionToNotification(type, token).then((res) =>
      setSubcription(res)
    );
  };
  return (
    <View style={{ padding: 5 }}>
      <Pressable
        style={{
          backgroundColor: subcription[0]?.active ? "green" : "red",

          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
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
      >
        <Text style={{ color: "white" }}>
          {" "}
          viewIssueNotification ? "Hide Issues Notifications" : "show Issues
          Notifications"
        </Text>
      </Pressable>
    </View>
  );
};

export default SubscriptionNotification;
