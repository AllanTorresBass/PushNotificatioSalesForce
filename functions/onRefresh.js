import React from "react";
const on_Refresh = (
  queryPushNotificationIssesLog,
  setRefreshing,
  setShowNotification
) => {
  const Refresh = React.useCallback(() => {
    setRefreshing(true);
    setShowNotification(undefined);
    setTimeout(() => {
      setRefreshing(false);
      queryPushNotificationIssesLog(setShowNotification);
    }, 2000);
  }, []);
  return Refresh;
};

export default on_Refresh;
