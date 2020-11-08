var firebaseConfig = {
    apiKey: "AIzaSyDvuxubcPFkOMIoRiyBokOWj4XJuRSOvKU",
    authDomain: "capstone-a57ed.firebaseapp.com",
    databaseURL: "https://capstone-a57ed.firebaseio.com",
    projectId: "capstone-a57ed",
    storageBucket: "capstone-a57ed.appspot.com",
    messagingSenderId: "346183904314",
    appId: "1:346183904314:web:61d1e4b388e190f7e2d903"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db= firebase.firestore();
  db.settings = ({timestampsInSnapshots:true});