// Called when the user clicks on the browser action  ----------------------------------------------------
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});


//Firebase Configuration ----------------------------------------------------
const fbConfig = {
    apiKey: "AIzaSyDuWnztNzNz8eiqLYnezr9KamIaLt95tfs",
    authDomain: "actionnn-2ac77.firebaseapp.com",
    databaseURL: "https://actionnn-2ac77.firebaseio.com",
    projectId: "actionnn-2ac77",
    storageBucket: "actionnn-2ac77.appspot.com",
    messagingSenderId: "765781008857",
    appId: "1:765781008857:web:518af75671f5a5dcc9b9c8"
};

firebase.initializeApp(fbConfig);
const db = firebase.firestore();


//Grabbing Data from Firestore ----------------------------------------------------
let fillData = '';

//Note: Ideally this would be based on searching the database for a match for topics, which would need a tool like this as Firebase doesn't support search natively. https://firebase.google.com/docs/firestore/solutions/search
db.collection("topics").doc("29IhYhNYI7ZUQhD8TjDG").get().then((doc) => {
    console.log(doc.data());
    fillData = doc.data();

});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.topic === "Coronavirus")
            sendResponse(fillData);
    });