import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db } from "../database/firebase";
const queryPushNotificationIssesLog = async (setShowNotification) => {
  let queryIssues;
  let array = [];
  setShowNotification(undefined);
  const q = query(
    collection(db, "Push_Notification_Issues_log"),
    orderBy("id", "desc"),
    where("site_id", "==", "p:northHotelKeyWest24:r:2a3cbbf4-0d3cf345")
  );

  queryIssues = await getDocs(q);
  queryIssues.forEach((doc) => {
    array.push(doc.data());
  });

  setShowNotification(array);
};
export default queryPushNotificationIssesLog;
