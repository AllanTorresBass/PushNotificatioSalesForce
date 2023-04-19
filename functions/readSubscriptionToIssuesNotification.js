import {
  where,
  query,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../database/firebase";
const readSubscriptionToIssuesNotification = async (type, token) => {
  let querySubscriptionsList;
  let array = [];
  let document = `Push_Notification_${type}`;
  console.log("token: ", token);
  console.log("document: ", document);
  const q = query(collection(db, document), where("device", "==", token));

  querySubscriptionsList = await getDocs(q);
  querySubscriptionsList.forEach((doc) => {
    console.log("doc.data(): ", doc.data());
    array.push(doc.data());
  });
  if (array.length > 0) {
    return array;
  } else "Error";
};

export default readSubscriptionToIssuesNotification;
