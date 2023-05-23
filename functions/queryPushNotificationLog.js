import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db } from "../database/firebase";
const queryPushNotificationLog = async (type) => {
  let queryIssues;
  let array = [];
  let document = `Push_Notification_${type}s_log`;

  const q = query(
    collection(db, document),
    orderBy("id", "desc"),
    where("site_id", "==", "p:northHotelKeyWest24:r:2a3cbbf4-0d3cf345")
  );

  queryIssues = await getDocs(q);
  queryIssues.forEach((doc) => {
    array.push({ ...doc.data(), documentId: doc.id });
  });

  return array;
};
export default queryPushNotificationLog;
