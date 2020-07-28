var firebaseConfig = {
  apiKey: "AIzaSyADIG5COZpFunikdaa6M9WOLOhTAdCNlcU",
  authDomain: "testing-pwa-5f25a.firebaseapp.com",
  databaseURL: "https://testing-pwa-5f25a.firebaseio.com",
  projectId: "testing-pwa-5f25a",
  storageBucket: "testing-pwa-5f25a.appspot.com",
  messagingSenderId: "135835589513",
  appId: "1:135835589513:web:e77b56c912dab0bf001f58",
  measurementId: "G-6YP9Z9T5W0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  "BDwwGV-SNWo4O7nHG6raDK__I0ALnPpv2uOeqe_W7qXciMD8fdwdWQaL_jvFXKAXS-T1hZ5CjnQ6sLb78zVo8RU"
);

const token = document.querySelector(".token");

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging
  .getToken()
  .then((currentToken) => {
    if (currentToken) {
      console.log("currentToken: ", currentToken);
      token.innerHTML = currentToken;
      // sendTokenToServer(currentToken);
      // updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log(
        "No Instance ID token available. Request permission to generate one."
      );
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // showToken("Error retrieving Instance ID token. ", err);
    // setTokenSentToSexrver(false);
  });

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then((refreshedToken) => {
      console.log("Token refreshed.");
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      // sendTokenToServer(refreshedToken);
      // ...
    })
    .catch((err) => {
      console.log("Unable to retrieve refreshed token ", err);
      // showToken("Unable to retrieve refreshed token ", err);
    });
});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then((refreshedToken) => {
      console.log("Token refreshed.");
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      // sendTokenToServer(refreshedToken);
      // ...
    })
    .catch((err) => {
      console.log("Unable to retrieve refreshed token ", err);
      // showToken("Unable to retrieve refreshed token ", err);
    });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (error) {
      console.log("Service worker registration failed, error:", error);
    });
}

console.log("teeest");

let deferredPrompt;
const addBtn = document.querySelector(".install_pwa");
addBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block";

  addBtn.addEventListener("click", (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
