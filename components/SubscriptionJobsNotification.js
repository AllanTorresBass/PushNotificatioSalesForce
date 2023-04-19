import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import readSubscriptionToNotification from "../functions/readSubscriptionToNotification";
import updateSubscriptionToNotification from "../functions/updateSubscriptionToNotifications";
const SubscriptionJobsNotification = ({ token }) => {
  const [subcription, setSubcription] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    readSubscriptionToNotification("Job", token).then((res) =>
      setSubcription(res)
    );

    return () => {};
  }, [flag]);
  console.log("subcription a Jobs Notification: ", subcription);

  const handelSubscription = () => {
    updateSubscriptionToNotification("Job", token, subcription[0]?.active);
  };
  return (
    <View>
      <Button
        onPress={() => {
          handelSubscription();
          setFlag(!flag);
        }}
        title="Subscription to Jobs Notification"
        color={subcription[0]?.active ? "green" : "red"}
      />
    </View>
  );
};

export default SubscriptionJobsNotification;
