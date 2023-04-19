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
const updateSubscriptionToNotification = async (type, token, active) => {
  let querySubscriptionsList;
  let array = [];
  let document = `Push_Notification_${type}`;

  const docRef = doc(db, document, token);
  const data = {
    active: !active,
  };
  updateDoc(docRef, data)
    .then((docRef) => {
      return "ok";
    })
    .catch((error) => {
      return "error";
    });
};

export default updateSubscriptionToNotification;
