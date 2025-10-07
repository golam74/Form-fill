  // Import Firebase modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBMUIzGWCgNcTGZ5ze5AsGb65uMOjnPMz4",               // <-- Add your API Key
    authDomain: "n8ncread.firebaseapp.com",
    projectId: "n8ncread",
    storageBucket: "n8ncread.appspot.com",
    messagingSenderId: "25158596041",
    appId: "1:25158596041:web:95d991e89a91a82853a418",
    measurementId: "G-DH6CQRSGLL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Form handling
  const form = document.getElementById('messageForm');
  const status = document.getElementById('status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload

    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    try {
      // Add message to Firestore
      await addDoc(collection(db, "messages"), {
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date()
      });

      status.textContent = "Message sent successfully!";
      status.style.color = "green";
      form.reset();
    } catch (error) {
      console.error("Error saving message:", error);
      status.textContent = "Failed to send message. Try again!";
      status.style.color = "red";
    }
  });
