var images = document.getElementsByClassName("preview"); // get the list of preview elements
var numberOfImages = images.length;

initializePreview();

//---------------------------------------------------------
function initializePreview() {
    for (var i = 0; i < numberOfImages; i++) {
        images[i].onclick = changeBigPicture; // add onclick handler
        images[i].style.backgroundImage = "url(img/img" + (i+1) + ".jpg)"; // add bg-images for previews
    }
}
//---------------------------------------------------------
function changeBigPicture(eventObj) {
    var url = "url(img/" + eventObj.target.id + ".jpg)"; // make an URL for the image
    var bigPictureElem = document.getElementById("big_image");
    bigPictureElem.style.backgroundImage = url; // change bg-image for big-image

    document.getElementsByClassName("active")[0].className = "preview"; //find and clear class "active"
    eventObj.target.className += " active"; // add class "active" for a new preview

//---------------------------------------------------------

    //console.log(eventObj.target);

}