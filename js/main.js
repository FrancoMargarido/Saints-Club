/*=============== MOSTRAR MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU ABIERTO =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU OCULTO =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}
/*=============== CERRAR MENU EN CEL ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
/*=============== CAMBIAR BCK HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
    : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== MODO OSCURO ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'
if (selectedTheme) {
document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== CARRITO ===============*/ 
const btnCart = document.querySelector('.container__cart-icon')
const containerCartProducts = document.querySelector('.container-cart-products')
const selectedItem = localStorage.getItem('infoProduct')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})
const cartinfo =document.querySelector ('.cart-product')
const rowProduct = document.querySelector('.row__product')
const productsList=document.querySelector ('.products__container')


/////////////PRODUCTOS///////////////////

let AllProducts = []

const valorTotal=document.querySelector ('.total-pagar')

const countProducts = document.querySelector ('#contador-productos')

// Check if products are stored in local storage
const storedProducts = localStorage.getItem('products');
if (storedProducts) {
AllProducts = JSON.parse(storedProducts);
}
// 
productsList.addEventListener ('click', e=>{

// Save updated AllProducts array to local storage
const saveProductsToLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(AllProducts));
};

  // Add this line after modifying the AllProducts array
saveProductsToLocalStorage();


if ((e.target.classList.contains('product__button'))) {  //agregr
    const product = e.target.parentElement;



const infoProduct = {
    quantity: 1,
    title: product.querySelector('h3').textContent,
    price: product.querySelector('span').textContent,
}


const exits = AllProducts.some(product => product.title === infoProduct.title)

if (exits) {
    const products = AllProducts.map(product =>{
        if (product.title === infoProduct.title) { 
            product.quantity++;
            return product        
    }else{     
        return product
    }
    
        })

        AllProducts = [...products]
} else{
    AllProducts = [...AllProducts,  infoProduct]
}





showHTML()
window.addEventListener('load', showHTML);
}




})


rowProduct.addEventListener('click', e =>{
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement
        const title = product.querySelector ('p').textContent

        AllProducts = AllProducts.filter(
            product=> product.title !== title
            )
            console.log(AllProducts);
            showHTML()
    }


})


const showHTML= ()=>{


if (!AllProducts.length) {
    containerCartProducts.innerHTML = `
    <p class ="cart-empty">El carrito esta vacio</p>`
}



let total = 0  
let totalOfProduct = 0; 

rowProduct.innerHTML=''

    AllProducts.forEach(product =>{

const containerProduct= document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
    <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
    </div>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon-close"
    >

    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6 18L18 6M6 6l12 12"
    />
    </svg>`

    rowProduct.append(containerProduct)

        total = total + parseInt(product.quantity * product.price.slice(1))
        totalOfProduct = totalOfProduct + product.quantity

    })

valorTotal.innerText = `$${total}`
countProducts.innerText = totalOfProduct

}


