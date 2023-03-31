

const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 0);
});

const menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('open');
};

const sr = ScrollReveal ({
	distance: '30px',
	duration: 2600,
	reset: true
})

sr.reveal('.home-text',{delay:280, origin:'bottom'})

sr.reveal('.featured,.cta,.new,.brand,.contact,.shop',{delay:200, origin:'bottom'})


const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});




// start when the document is ready

if(document.readyState =="loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}

//==================START===============
function start(){
    addEvents();

}

//================UPDATE AND RERENDER========

function update(){
    addEvents();
    updateTotal();
}
//==============ADD EVENTS==========
function addEvents(){
        //remove items from cart
        let cartRemove_btns = document.querySelectorAll(".cart-remove");
        console.log(cartRemove_btns);
        cartRemove_btns.forEach((btn)=>{
            btn.addEventListener("click", handle_removeCartItem);
        }); 

    // change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach((input) =>{
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    
    addCart_btns.forEach((btn) =>{
        btn.addEventListener("click", handle_addCartItem);
    });
// buy order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click",handle_buyorder);

    }

    //==========Handle Events Function=======
    let itemsAdded = []

    function handle_addCartItem(){
        let product = this.parentElement;
        let title = product.querySelector(".product-title").innerHTML;
        let price = product.querySelector(".product-price").innerHTML;
        let imgSrc = product.querySelector(".product-img").src;
        console.log(title, price, imgSrc);


        let newToAdd = {
            title,
            price,
            imgSrc,
        };
        // handle  item is  already exist
        if(itemsAdded.find((el)=> el.title == newToAdd.title)){
            alert("This Item Is Already Added");
            return;
        }else{
            itemsAdded.push(newToAdd);
        }


        //add product to cart

        let cartBoxElement = CartBoxComponent(title, price, imgSrc);
        let newNode = document.createElement("div");
        newNode.innerHTML = cartBoxElement;
        const cartContent = cart.querySelector(".cart-content");
        cartContent.appendChild(newNode);
        
        update();
    }

    function handle_removeCartItem(){
     this.parentElement.remove();
        itemsAdded = itemsAdded.filter(
            el=> el.title !=
             this.parentElement.querySelector('.cart-product-title').innerHTML
        );
    update();
}

function handle_changeItemQuantity(){
    if (isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value); // to keep it integer

    update();
}
function handle_buyorder(){
    if(itemsAdded.length <=0){
        alert("There is No Order to Place Yet! \nPlease Make an Order First.");
        return;
    }
    const  cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Your Order is Placed Successfully :)");
    itemsAdded = [];
    update();
}

//===========update & Rerender  Functions=======

function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox)  => {
            let priceElement = cartBox.querySelector(".cart-price");
            let price = parseFloat(priceElement.innerHTML.replace("$", ""));
            let quantity = cartBox.querySelector(".cart-quantity").value;
            total += price * quantity;
    });

    //keep 2 digit after the decimal point

    
    total = Math.round(total * 100)/100;
        //or you can use also
    //total = total.toFixed(2);
    totalElement.innerHTML= "$" + total;
}

//===========HTML COMPONENT=============
function CartBoxComponent(title, price, imgSrc){
    return `
            <div class="cart-box">
                <img src=${imgSrc} class="cart-img" alt="">
                <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity">                        
                </div>
                <! ---remove cart -->
                <i class="bi bi-trash-fill cart-remove"></i>
            </div>`;
}
                    