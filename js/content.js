// Adding Stylesheet to Popup ----------------------------------------------------

let link = document.createElement("link");
link.href = chrome.extension.getURL("css/popup.css");
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);


//Page Topic Identification ----------------------------------------------------
let topics = [];
$(".tags-list__tags a").each(function() {topics.push($(this).text())});
// console.log(topics);


//Database Topic Loading ----------------------------------------------------
// chrome.runtime.sendMessage({topics}, function(response) {
//     // console.log(response);
// });


//Grabbing and Adding Firestore data into HTML  ----------------------------------------------------
for (i = 0; i < topics.length; i++) {
    if(topics[i].match('Coronavirus')) {

        chrome.runtime.sendMessage({topic: "Coronavirus"}, function(response) {
            // console.log(response);
            $.get(chrome.extension.getURL('/pageFrame.html'), function(data) {
                $(data).appendTo('body');
                $("#AnnEvent").text(response.event);
                $("#AnnImage").attr("src", response.imageLink);
                $("#AnnBlurb").text(response.blurb);
                $("#AnnBlurbLink").attr("href", response.blurbLink);
                $("#AnnInform").text(response.inform);
                $("#AnnInformLink").attr("href", response.informLink);
                $("#AnnCreate").text(response.create);
                $("#AnnCreateLink").attr("href", response.createLink);
                $("#AnnDonate").text(response.donate);
                $("#AnnDonateLink").attr("href", response.donateLink);
            });
        });
        break;

    }
}
