var images = document.getElementsByClassName("preview"); // get the list of preview elements
var numberOfImages = images.length;
var items = [                                   // array of items
    {id: "img1", name: "Sapphire",  price: 19},
    {id: "img2", name: "Bismuth",   price: 72},
    {id: "img3", name: "Tanzanite", price: 55},
    {id: "img4", name: "Emerald",   price: 28},
    {id: "img5", name: "Fluorite",  price: 34}
];
var activeId = "img1"; // active preview, used to address array of items

initPreview();
initButtons();

//---------------------------------------------------------
// set buttons EventListeners
function initButtons() {
    document.getElementById("left").addEventListener("click",hitButton);
    document.getElementById("right").addEventListener("click",hitButton);
}
//---------------------------------------------------------
// hitButton handler
function hitButton(eventObj) {
    var currentId = document.getElementsByClassName("active")[0].id; // get id of active preview (string)
    var numId = + currentId.slice(3); // get the number of the id (number)

    if (eventObj.target.id == "left") { // decrement id if hit left button
        numId--;
    }
    else {
        numId++;                        // increment id if hit right button
    }


    if (numId == 0) numId = 5;  // make closed cycle between 1 and 5
    if (numId == 6) numId = 1;

    var nextId = "img" + numId; // make target id
    document.getElementById(nextId).click(); // hit the preview with target id
}
//---------------------------------------------------------
// set previews images and handlers
function initPreview() {
    for (var i = 0; i < numberOfImages; i++) {
        images[i].onclick = changeBigPicture; // add onclick handler
        images[i].style.backgroundImage = "url(img/img" + (i+1) + ".jpg)"; // add bg-images for previews
    }
}

//---------------------------------------------------------
// changing the big picture background image

function changeBigPicture(eventObj) {
    activeId = eventObj.target.id;
    var url = "url(img/" + activeId + ".jpg)"; // make an URL for the image
    var bigPictureElem = document.getElementById("big_image");
    bigPictureElem.style.backgroundImage = url; // change bg-image for big-image

    //--- changing the preview ---
    document.getElementsByClassName("active")[0].className = "preview"; //find and clear class "active"
    eventObj.target.className += " active"; // add class "active" for a new preview

//---------------------------------------------------------

    //console.log(eventObj.target);

}