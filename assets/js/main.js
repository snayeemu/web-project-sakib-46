/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// SignUp
const email = document.getElementById("email")
const fullname = document.getElementById("name")
const address = document.getElementById("address")
const phone = document.getElementById("phone")
const username = document.getElementById("username")
const pass = document.getElementById("pass")
const signUpBtn = document.getElementById("signUp")

signUpBtn?.addEventListener("click", e => {
    e.preventDefault()

    const userInfo = {
        email: email.value,
        fullname: fullname.value,
        address: address.value,
        phone: phone.value,
        username: username.value,
        pass: pass.value
    }

    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    localStorage.setItem("is-logged-in", "-1")
})

// Login
const loginUsername = document.getElementById("loginUsername")
const loginPass = document.getElementById("loginPass")
const loginBtn = document.getElementById("loginBtn")
const registeredUserData = JSON.parse(localStorage.getItem("userInfo"))

loginBtn?.addEventListener("click", e => {
    e.preventDefault()

    if(registeredUserData) {
        if(registeredUserData.pass === loginPass.value && registeredUserData.username === loginUsername.value) {
            alert("login success")
            localStorage.setItem("is-logged-in", "1")
        } else {
            alert("incorrect login info")
        }
    } else {
        alert("No user found, please signup.")
    }
})

// Product
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn")
var productInCart = localStorage.getItem("product-in-cart") ? JSON.parse(localStorage.getItem("product-in-cart")) : [];
var cartProductData = {}
const toast = document.getElementById("toast")
const toastMsg = document.getElementById("toast-message")
const cartCount = document.querySelector(".cart-count")

addToCartBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault()

        toast.style.transform = "translateX(0)"

        if(e.target.classList.contains("add-to-cart-btn")) {
            cartProductData.id = e.target.getAttribute("product-key")
            cartProductData.price = e.target.getAttribute("product-price")
            cartProductData.name = e.target.getAttribute("product-name")
            toastMsg.innerHTML = e.target.getAttribute("product-name") + " added to cart"
        } else if(e.target.parentElement.classList.contains("add-to-cart-btn")) {
            cartProductData.id = e.target.parentElement.getAttribute("product-key")
            cartProductData.price = e.target.parentElement.getAttribute("product-price")
            cartProductData.name = e.target.parentElement.getAttribute("product-name")
            toastMsg.innerHTML = e.target.parentElement.getAttribute("product-name") + " added to cart"
        }

        productInCart.push(cartProductData)

        cartCount.innerHTML = productInCart.length

        localStorage.setItem("product-in-cart", JSON.stringify(productInCart))
        cartProductData = {}

        setTimeout(() => {
            toast.style.transform = "translateX(-1000px)"
        }, 1500)
    })
})

cartCount.innerHTML = productInCart.length


// Show product in checkout
const productContainer = document.getElementById("product-container")
var cartProduct = JSON.parse(localStorage.getItem("product-in-cart"))
const totalPrice = document.getElementById("total-price")
const initialProductContainer = document.getElementById("product-table-container")

if(cartProduct) {
    var calculatePrice = 0;
    cartProduct.forEach(product => {
        const tr = document.createElement('tr')
        const tdName = document.createElement('td')
        const tdPrice = document.createElement('td')

        tdName.innerHTML = product.name
        tdPrice.innerHTML = product.price

        calculatePrice += parseFloat(product.price)

        tr.appendChild(tdName)
        tr.appendChild(tdPrice)

        productContainer?.appendChild(tr)

        totalPrice.innerHTML = calculatePrice.toFixed(2)
    })
} else {
    initialProductContainer.innerHTML = "<h2 style='margin-bottom: 30px;'>No product in cart. <a href='/index.html'>Shop here</a></h2>"
}

const checkoutBtn = document.getElementById("checkout")

checkoutBtn?.addEventListener("click", e => {
    e.preventDefault()

    if(cartProduct) {
        Swal.fire({
            title: "Payment success!",
            text: "Thanks for shopping with us.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            localStorage.removeItem("product-in-cart")
            location.href = '/index.html'
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No products in cart!",
            showConfirmButton: false,
            footer: '<a href="/index.html">Please shop here</a>'
        });
    }
})