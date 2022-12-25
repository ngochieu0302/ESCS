var firebaseConfig = {
    apiKey: "AIzaSyB6Cm8DG5IgC-NrwjX32UfsTMl0jMUiayY",
    authDomain: "esmart-claim-solution.firebaseapp.com",
    databaseURL: "https://esmart-claim-solution.firebaseio.com",
    projectId: "esmart-claim-solution",
    storageBucket: "esmart-claim-solution.appspot.com",
    messagingSenderId: "694464717986",
    appId: "1:694464717986:web:244b6d232cc371e3f863fb",
    measurementId: "G-YLHJL2B75Z"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(function (registration) {
        messaging.useServiceWorker(registration);
        // Request for permission
        messaging.requestPermission()
            .then(function () {
                console.log('Notification permission granted.');
                console.log(firebase);
                messaging.getToken()
                    .then(function (currentToken) {
                        if (currentToken) {
                            console.log('Token: ' + currentToken)
                            sendTokenToServer(currentToken);
                        } else {
                            console.log('No Instance ID token available. Request permission to generate one.');
                            setTokenSentToServer(false);
                        }
                    })
                    .catch(function (err) {
                        console.log('An error occurred while retrieving token. ', err);
                        setTokenSentToServer(false);
                    });
            })
            .catch(function (err) {
                console.log('Unable to get permission to notify.', err);
            });
    });
messaging.onMessage(function (payload) {
    console.log("Notification received: ", payload);
    toastr["info"](payload.notification.body, payload.notification.title);
});
messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('Token refreshed.');
            setTokenSentToServer(false);
            sendTokenToServer(refreshedToken);
        })
        .catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err);
        });
});
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}
function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;
}
function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}
