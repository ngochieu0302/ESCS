importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');
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
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
    const notificationTitle = 'Data Message Title';
    const notificationOptions = {
        body: 'Data Message body',
        icon: 'alarm.png'
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});