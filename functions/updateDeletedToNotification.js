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
const updateDeletedToNotification = async (type, documentId) => {
  let querySubscriptionsList;
  let array = [];
  let document = `Push_Notification_${type}s_log`;

  const docRef = doc(db, document, documentId);
  const data = {
    deleted: true,
  };
  updateDoc(docRef, data)
    .then((docRef) => {
      console.log("updateDeletedToNotification OK");
      return "ok";
    })
    .catch((error) => {
      console.log("updateDeletedToNotification ERROR", error);
      return "error";
    });
};

export default updateDeletedToNotification;
