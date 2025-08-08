// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAorqbDnd_gEeuXmvEJXfNF-bD02kCf8DI",
  authDomain: "dummypaymentpvy.firebaseapp.com",
  databaseURL: "https://dummypaymentpvy-default-rtdb.firebaseio.com",
  projectId: "dummypaymentpvy",
  storageBucket: "dummypaymentpvy.firebasestorage.app",
  messagingSenderId: "529940583809",
  appId: "1:529940583809:web:3b8931480ee12e5fdf4480",
  measurementId: "G-R2FJ825ZLM"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const urlParams = new URLSearchParams(window.location.search);
const txnId = urlParams.get("txnId");

if (txnId) {
  db.ref("transactions/" + txnId).once("value").then(snapshot => {
    if (snapshot.exists()) {
      document.getElementById("amountDisplay").innerText = "Amount: $" + snapshot.val().amount;
    }
  });
}

function makePayment(status) {
  db.ref("transactions/" + txnId + "/status").set(status);
  document.body.innerHTML = "<h2>✅ Response recorded. You may close this page.</h2>";
}
