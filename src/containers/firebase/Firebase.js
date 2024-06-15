// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging,getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEk9KiIJJ70r3rtv0fl7jyNNwGIL2pJ8s",
  authDomain: "fir-56526.firebaseapp.com",
  projectId: "fir-56526",
  storageBucket: "fir-56526.appspot.com",
  messagingSenderId: "1034723389532",
  appId: "1:1034723389532:web:ea745b819d4f949223b699",
  measurementId: "G-10YRD4VBXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async ()=>{
    const permission = await Notification.requestPermission();
    console.log(permission)
    if(permission==='granted'){
        const token = await getToken(messaging,{
            vapidKey:"BEPPF9PtKeLg9PIFZKr99DntJKmxLj9McwG4oxIRMR63RO5e3iNf7023ktIlP6FOHUkMdWL_kv7VEAtdN62xuGo"
       });
       console.log(token)
    }
   
}