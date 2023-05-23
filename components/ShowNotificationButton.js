import React, { useEffect, useState } from "react";
import { Platform, View, Pressable, Text } from "react-native";
const ShowNotificationButton = ({
  setviewIssueNotification,
  viewIssueNotification,
  setviewJobNotification,
  viewJobNotification,
  type,
  queryFirebase,
}) => {
  return (
    <View
      style={{
        padding: 2,
        borderColor: "black",
        borderWidth: 1,
        width: "50%",
      }}
    >
      <Pressable
        style={{
          backgroundColor: "blue",

          borderRadius: 10,
          paddingHorizontal: 5,
          paddingVertical: 3,
          width: "100%",
        }}
        onPress={() => {
          if (type === "Issue") {
            viewIssueNotification
              ? setviewIssueNotification(false)
              : setviewIssueNotification(true);
            queryFirebase("Issue");
            setviewJobNotification(false);
          }
          if (type === "Job") {
            viewJobNotification
              ? setviewJobNotification(false)
              : setviewJobNotification(true);
            queryFirebase("Job");
            setviewIssueNotification(false);
          }
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: Platform.OS === "ios" ? 16 : 13,
          }}
        >
          {type === "Issue"
            ? viewIssueNotification
              ? "Hide Issues Notifications"
              : "show Issues Notifications"
            : type === "Job"
            ? viewJobNotification
              ? "Hide Jobs Notifications"
              : "show Jobs Notifications"
            : null}
        </Text>
      </Pressable>
    </View>
  );
};

export default ShowNotificationButton;
