"use strict";

const productsWrapper = document.getElementById("cards_wrp");
const loadMore = document.getElementById("load_more");
const categoriesHTML = document.querySelector('.categories') 


const productsInCart = JSON.parse(localStorage.getItem('productInCart')) || []
const countCart = document.getElementById('count_cart');



function countCartFunc(){
    countCart.innerHTML = productsInCart.length;
}

countCartFunc()


const categoriesProduct = ["all", "men's clothing", "women's clothing", "jewelery", "electronics"]




let activeCat = 2;
categoriesProduct.forEach((el, idx)=>{
    const category = document.createElement('li');
    
    category.classList.add('cat')
    category.innerHTML = el
    category.addEventListener('click',()=>{
        activeCat = idx
        changeCategory(activeCat)
    })
    categoriesHTML.append(category)
    
})



async function changeCategory (idx){


    try {
        const req = await fetch("https://fakestoreapi.com/products");
        let res = await req.json();
        if(categoriesProduct[idx] != 'all'){
            res = res.filter(item=>item.category == categoriesProduct[idx])
        }
       renderProducts(res);
      } catch (err) {
        console.error(err);
        alert("Mahsulotlarni olishda xatolik!");
      }
}


async function getProducts() {
  try {
    const req = await fetch("https://fakestoreapi.com/products");
    const res = await req.json();
   renderProducts(res.slice(0, 8));
  } catch (err) {
    console.error(err);
    alert("Mahsulotlarni olishda xatolik!");
  }
}


function renderProducts(data) {
    productsWrapper.innerHTML = ''
  if (!data) {
    const loaderSpinner = document.createElement("span");
    loaderSpinner.classList.add("loader_spinner");
  } else {
    data.forEach((el, idx) => {
        const isInCart = productsInCart.find(item=>item?.id == el.id )
        const rate = Math.round(el.rating.rate)
      const card = document.createElement("div");
      const cartShop = document.createElement('div');
      cartShop.innerHTML = `${isInCart ? `✅` : `<i class="fa-solid text-info add_cart fa-cart-shopping"></i>` }`
      cartShop.addEventListener('click', e=>addToCart(cartShop, el))
      const bottomCard = document.createElement('div')
      bottomCard.setAttribute('class', 'bottom d-flex align-items-center justify-content-between w-100 px-4')
      card.innerHTML = `
        <div class="img">
            <img src=${el.image} alt="photo">
        </div>
        <div class="body">
            <h3 class="name">${el.title}</h3>
        <div class="stars d-flex ">
            <img src="./images/star.png" alt="">
            <img src="./images/star.png" alt="">
            <img src="./images/star.png" alt="">
            <img src="./images/star.png" alt="">
            <img src="/images/dis.png" alt="">
        </div>
       
        <div>    
        </div>
        </div>

        </div>
    `;
    bottomCard.innerHTML = `<p class="price">${el.price}</p>`
    bottomCard.append(cartShop)
    card.append(bottomCard)
      card.classList.add("product_card");
      productsWrapper.append(card);
    });
  }
}



function addToCart(el, product){
    const isInCart = productsInCart.find(item=> item?.id == product.id)
    if(isInCart != null){
        return
    }
    el.innerHTML = '✅'
    product.count = 1;
    product.total = product.price;
    productsInCart.push(product)
    localStorage.setItem('productInCart', JSON.stringify(productsInCart))
    countCartFunc()
}



getProducts()


loadMore.addEventListener('click', async(e)=>{
    try {
        const req = await fetch("https://fakestoreapi.com/products");
        const res = await req.json();
        renderProducts(res)
      } catch (err) {
        console.error(err);
        alert("Mahsulotlarni olishda xatolik!");
      }
})


const searchInput = document.querySelector('#search_input');
const searchBtn = document.querySelector('#search_btn')


searchInput.addEventListener('input', e=>searchProduct(e.target.value))
searchBtn.addEventListener('click', ()=>searchProduct(searchInput.value))


async function searchProduct(value){
  if(!value.trim().length){
    try {
      const req = await fetch("https://fakestoreapi.com/products");
      const res = await req.json();
     renderProducts(res);
    } catch (err) {
      console.error(err);
      alert("Mahsulotlarni olishda xatolik!");
    }
  }else {
    try {
      const req = await fetch("https://fakestoreapi.com/products");
      let res = await req.json();
       res = res.filter(el=>el.title.includes(value));
     renderProducts(res);
    } catch (err) {
      console.error(err);
      alert("Mahsulotlarni olishda xatolik!");
    }
  }
}