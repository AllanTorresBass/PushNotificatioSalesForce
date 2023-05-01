import {
  where,
  query,
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../database/firebase";
const updateUnreadToNotification = async (type, documentId) => {
  let querySubscriptionsList;
  let array = [];
  let document = `Push_Notification_${type}s_log`;

  const docRef = doc(db, document, documentId);
  const data = {
    unread: false,
  };
  updateDoc(docRef, data)
    .then((docRef) => {
      console.log("updateUnreadToNotification OK");
      return "ok";
    })
    .catch((error) => {
      console.log("updateUnreadToNotification ERROR", error);
      return "error";
    });
};

export default updateUnreadToNotification;
