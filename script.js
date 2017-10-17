var images = document.getElementsByClassName("preview"); // get the list of preview elements
var numberOfImages = images.length; // storing the number of images

var activeId = "img1"; // active preview, used to address array of items

var items = [ // items array
    {id: "img1", name: "Sapphire",  price: 19},
    {id: "img2", name: "Bismuth",   price: 72},
    {id: "img3", name: "Tanzanite", price: 55},
    {id: "img4", name: "Emerald",   price: 28},
    {id: "img5", name: "Fluorite",  price: 34}];

var cart = []; // cart array {id: "", name: "", price: x, quantity: x}

//---------------------------------------------------------
// set previews images and handlers
function initPreview() {
    for (var i = 0; i < numberOfImages; i++) {
        images[i].onclick = changeBigPicture; // add onclick handler
        images[i].style.backgroundImage = "url(img/img" + (i+1) + ".jpg)"; // add bg-images for previews
    }
}
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

    if (eventObj.target.id === "left") { // decrement id if hit left button
        numId--;
    }
    else {
        numId++;                        // increment id if hit right button
    }


    if (numId === 0) numId = 5;  // make closed cycle between 1 and 5
    if (numId === 6) numId = 1;

    var nextId = "img" + numId; // make target id
    document.getElementById(nextId).click(); // hit the preview with target id
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

    initText(); // renew info text
}
//---------------------------------------------------------
// init Text information
function initText() {
    var i = 0;
    while (activeId !== items[i].id) { // searching for index of item
        i++;
    }
    document.getElementById("text").innerHTML = "Precious stone: <strong>"
        + items[i].name + "</strong>. Price: <strong>"
        + items[i].price + "</strong>";
}
//---------------------------------------------------------
// clear the cart
function clearCart() {
    document.getElementById("cart").innerHTML = "Empty! &#128542;"; // clear the cart section
    cart.length = 0; // clear the cart array
}
//---------------------------------------------------------
// adding items to cart
function addToCart() {
    var i = 0;
    while ((i + 1) > numberOfImages || activeId != items[i].id) { // searching for index of item in items array
        i++;
    }
   if (cart.length > 0 && cart.some(function(this.Arg){ return })) {
       var j = 0;
       while (activeId != cart[j].id || j > numberOfImages) { // searching for index of item in cart array
           j++;
       }
       if (j < numberOfImages) { // if item already exists in the cart - increment its' quantity
           cart[j].quantity++;
       }
    }
    else { // create new cart item
        var tempObj = {};
        tempObj.id = items[i].id;
        tempObj.name = items[i].name;
        tempObj.price = items[i].price;
        tempObj.quantity = 1;

        cart.push(tempObj); // add the item to array
   }



    console.log(cart);
}
//==========================================================
initPreview();
initButtons();
initText();
clearCart();