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

function generateQR() {
  const amount = document.getElementById("amount").value;
  if (!amount) {
    alert("Please enter an amount");
    return;
  }

  const txnId = "txn_" + Math.random().toString(36).substr(2, 9);
  db.ref("transactions/" + txnId).set({
    amount: amount,
    status: "pending"
  });

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), window.location.origin + "/pay.html?txnId=" + txnId);

  db.ref("transactions/" + txnId + "/status").on("value", snapshot => {
    if (snapshot.exists()) {
      const status = snapshot.val();
      if (status === "success") {
        document.getElementById("status").innerHTML = "<h2>✅ Thanks for your payment!</h2>";
      } else if (status === "fail") {
        document.getElementById("status").innerHTML = "<h2>❌ Payment declined.</h2>";
      }
    }
  });
}
