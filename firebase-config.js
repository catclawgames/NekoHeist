/* ===== Neko Heist online settings =====
   1. In the Firebase console open Project settings > General > Your apps > (Web app) > SDK setup and configuration > "Config".
   2. Copy the values into the object below (replace null).
   With this left as null the game still runs, but offline only (computer manors, progress saved on the device).

window.NEKO_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};
*/
window.NEKO_FIREBASE = window.NEKO_FIREBASE || null;
