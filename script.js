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
// searching for index of active item in the item array
function getIndex(activeId) {
    var i = 0;
    while (activeId !== items[i].id) { // searching for index of item
        i++;
    }
    return i;
}

//---------------------------------------------------------
// set previews images and handlers
function initPreview() {
    for (var i = 0; i < numberOfImages; i++) {
        images[i].onclick = changeBigPicture; // add onclick handler
        images[i].style.backgroundImage = "url(img/img" + (i + 1) + ".jpg)"; // add bg-images for previews
    }
}

//---------------------------------------------------------
// set buttons EventListeners
function initButtons() {
    document.getElementById("left").addEventListener("click", hitButton);
    document.getElementById("right").addEventListener("click", hitButton);
}

//---------------------------------------------------------
// hitButton handler
function hitButton(eventObj) {
    var currentId = document.getElementsByClassName("active")[0].id; // get id of active preview (string)
    var numId = +currentId.slice(3); // get the number of the id (number)

    if (eventObj.target.id === "left") { // decrement id if hit left button
        numId--;
    }
    else {
        numId++;                        // increment id if hit right button
    }


    if (numId === 0) numId = 5;  // make closed cycle between 1 and 5 previews
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

    //--- changing active element in preview section ---
    document.getElementsByClassName("active")[0].className = "preview"; //find and clear class "active"
    eventObj.target.className += " active"; // add class "active" for a new preview

    initText(); // renew info text
}

//---------------------------------------------------------
// output Text information
function initText() {
    var i = getIndex(activeId);
    document.getElementById("text").innerHTML = "Precious stone: <strong>"
        + items[i].name + "</strong>. Price: <strong>"
        + items[i].price + "</strong>";
}

//---------------------------------------------------------
// clear the cart
function clearCart() {
    document.getElementById("cart").innerHTML = "Empty! &#128542;"; // clear the cart section
    document.getElementById("items").innerText = "0";
    document.getElementById("totalCost").innerText = "0";
    cart.length = 0; // clear the cart array
}

//---------------------------------------------------------
// adding item to cart
function addToCart() {
    //--- check for existence in the cart ---
    function existInCart(itemId) {
        var exist = false;
        for (var i = 0, l = cart.length; i < l; i++) {
            if (cart[i].id === itemId) { // checking array for itemId
                exist = true;
                break;
            }
        }
        return exist;
    }

    //--- output the cart to HTML -----------
    function outputCart() {
       var str = "";
       for (var i = 0, l = cart.length; i < l; i++) { // making the text string
           str += "" + (i + 1) + " . " + cart[i].name + " (" + cart[i].price
                    + " x " + cart[i].quantity + "): " + cart[i].quantity * cart[i].price
                    + ". \n";
       }
       document.getElementById("cart").innerText = str;
    }
    //--- recalculate -----------------------
    // and output totals in the cart --------
    function recalcTotals() {
        var numOfItems = 0,
            totalCost = 0;

        for (var i = 0, l = cart.length; i < l; i++) { // calculating the totals in the cart
            numOfItems += cart[i].quantity;
            totalCost += cart[i].quantity * cart[i].price;
        }

        document.getElementById("items").innerText = "" + numOfItems; // output to HTML
        document.getElementById("totalCost").innerText = "" + totalCost;
    }
    //---------------------------------------

    var i = getIndex(activeId);

    if (cart.length > 0 && existInCart(activeId)) { // if cart array>0 && item exist in cart
        var j = 0;
        while (activeId !== cart[j].id) { // searching for index of item in cart array
            j++;
        }
        cart[j].quantity++; // increment quantity of the item
    }
    else { // create a new cart item
        var tempObj = {};
        tempObj.id = items[i].id;
        tempObj.name = items[i].name;
        tempObj.price = items[i].price;
        tempObj.quantity = 1;

        cart.push(tempObj); // add the item to array
    }

    recalcTotals();
    outputCart();
}

//=== script start ==================================================
initPreview();
initButtons();
initText();
clearCart();