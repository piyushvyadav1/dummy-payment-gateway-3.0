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

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("generateBtn");
    const qrContainer = document.getElementById("qrcode");
    const amountInput = document.getElementById("amount");
    const statusEl = document.getElementById("status");

    btn.addEventListener("click", () => {
        const amount = amountInput.value || "0.00";
        const txnId = Date.now(); // Unique transaction ID

        // Save initial status
        db.ref("transactions/" + txnId).set({
            amount: amount,
            status: "pending"
        });

        // Create QR code link to pay.html
        const payLink = `${window.location.origin}${window.location.pathname.replace("index.html", "")}pay.html?txnId=${txnId}`;

        qrContainer.innerHTML = "";
        new QRCode(qrContainer, {
            text: payLink,
            width: 200,
            height: 200
        });

        // Listen for status changes
        db.ref("transactions/" + txnId + "/status").on("value", snapshot => {
            statusEl.textContent = snapshot.val();
        });
    });
});