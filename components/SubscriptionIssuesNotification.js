import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import readSubscriptionToIssuesNotification from "../functions/readSubscriptionToIssuesNotification";
const SubscriptionIssuesNotification = ({ token }) => {
  const [subcription, setSubcription] = useState({});
  console.log("token nivel 1: ", token);
  useEffect(() => {
    let sub;
    (async () => {
      sub = await readSubscriptionToIssuesNotification("Issue", token);
    })();

    return () => {
      setSubcription(sub);
    };
  }, [readSubscriptionToIssuesNotification]);
  console.log("subcription: ", subcription);

  return (
    <View>
      <Button title="Subscription to Issues Notification" />
    </View>
  );
};

export default SubscriptionIssuesNotification;
