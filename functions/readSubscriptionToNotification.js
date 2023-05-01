import {
  where,
  query,
  doc,
  setDoc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../database/firebase";
const readSubscriptionToNotification = async (type, token) => {
  let querySubscriptionsList;
  let array = [];
  let document = `Push_Notification_${type}`;

  const q = query(collection(db, document), where("device", "==", token));

  querySubscriptionsList = await getDocs(q);
  const unsub = onSnapshot(doc(db, document, token), (doc) => {
    array.push(doc.data());
    if (array.length > 0) {
      return array;
    } else return "Error";
  });
  querySubscriptionsList.forEach((doc) => {
    array.push(doc.data());
  });
  if (array.length > 0) {
    return array;
  } else return "Error";
};

export default readSubscriptionToNotification;
