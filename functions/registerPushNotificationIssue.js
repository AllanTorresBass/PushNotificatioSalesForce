import {
  where,
  query,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const RegisterPushNotificationIssues = async (db, site_id, token) => {
  let queryDevice;
  let array = [];

  const q = query(
    collection(db, "Push_Notification_Issue"),
    where("device", "==", token)
  );

  queryDevice = await getDocs(q);
  queryDevice.forEach((doc) => {
    array.push(doc.data());
  });

  if (array.length === 0) {
    let response = await setDoc(doc(db, "Push_Notification_Issue", token), {
      site_id: site_id,
      device: token,
      active: true,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
        return "Ok";
      })
      .catch((error) => {
        // The write failed...
        console.log(error);
        return error;
      });
  }
};

export default RegisterPushNotificationIssues;
