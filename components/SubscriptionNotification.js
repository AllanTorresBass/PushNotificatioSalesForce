import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
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
    <View>
      <Button
        onPress={() => {
          handelSubscription();
          setFlag(!flag);
        }}
        title={`${type}s Notification`}
        color={subcription[0]?.active ? "green" : "red"}
      />
    </View>
  );
};

export default SubscriptionNotification;
