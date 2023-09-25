let productsInCart = JSON.parse(localStorage.getItem('productInCart')) || []
const countCart = document.getElementById('count_cart');



function countCartFunc(){
    countCart.innerHTML = productsInCart.length;
}

countCartFunc()


const productWrapper = document.querySelector('#prd_wrp')
const checkoutWrp = document.querySelector('#checkout_wrp')

function renderProduct(){
    productWrapper.innerHTML = ``;
    if(!productsInCart.length){
    //    productWrapper.innerHTML =` <h2>Not Found Product</h2>`
    productWrapper.innerHTML = `<div class="shopping d-flex justify-content-center align-items-center">
    <a href="./index.html" class="text-center btn btn-info text-light mx-auto">Go shopping!</a>
    </div>`
    }
    productsInCart.forEach((el, idx)=>{
        const box = document.createElement('div')
        box.setAttribute('class', "p-2 d-flex align-items-center justify-content-between")
        const left = document.createElement('div')
        box.append(left)
        left.setAttribute('class',"left d-flex align-items-center gap-4")
        const leftDelProduct = document.createElement('img')
        leftDelProduct.classList.add('del_cart')
        leftDelProduct.addEventListener('click',()=> deleteProductFromCarts(el.id))
        leftDelProduct.src = './images/del.png';
       left.append(leftDelProduct)
       const leftProductImg = document.createElement('img')
       leftProductImg.classList.add('prd_img')
       leftProductImg.src = el.image
       left.append(leftProductImg)
       const leftTitleProduct = document.createElement('p')
       leftTitleProduct.classList.add('title_c')
       leftTitleProduct.innerHTML = el.title;
       left.append(leftTitleProduct)

       const right = document.createElement('div');
       right.setAttribute('class', "right w-40 d-flex align-items-center justify-content-around")

       const rightPrice = document.createElement('p');
       rightPrice.innerHTML = `$${el.price}`
       rightPrice.classList.add('item_p')
       right.append(rightPrice)
       const rightCounter = document.createElement('div');
       rightCounter.setAttribute('class', "d-flex counter gap-2")
          const minusCounter = document.createElement('i');
          minusCounter.innerHTML = '-'
          minusCounter.addEventListener('click', ()=>{
              if(el.count == 1){
                  deleteProductFromCarts(el.id)
                  localStorage.setItem('productInCart', JSON.stringify(productsInCart))
                }
                el.count -=1;
                localStorage.setItem('productInCart', JSON.stringify(productsInCart))
                renderProduct()
                renderCheckOut()
          })
          minusCounter.classList.add('indic')
          rightCounter.append(minusCounter)
          const countOfCounter = document.createElement('p');
          countOfCounter.innerHTML = el.count;
          rightCounter.append(countOfCounter)
          const plusCounter = document.createElement('i');
          plusCounter.classList.add('indic')
          plusCounter.addEventListener('click',()=>{
            el.count +=1;
            localStorage.setItem('productInCart', JSON.stringify(productsInCart))
            renderProduct()
            renderCheckOut()
          })
          plusCounter.innerHTML = '+'
          rightCounter.append(plusCounter)
       right.append(rightCounter)
       
       const rightUnitPrice = document.createElement('p');
       rightUnitPrice.innerHTML = `$${el.price * el.count}`
       rightPrice.classList.add('item_p')
       right.append(rightUnitPrice)

       box.append(right)

       productWrapper.append(box)
    })
}



renderProduct()

function calculateTotalPrice(arr) {
    let totalPrice = 0;
  
    for (let i = 0; i < arr.length; i++) {
      totalPrice += arr[i].price;
    }
  
    return totalPrice;
  }



function renderCheckOut(){
    checkoutWrp.innerHTML = ``;
    const allProductSum = calculateTotalPrice(productsInCart)
    const deliverySum = allProductSum ? 20 : 0;
    let totalSum = deliverySum + allProductSum;
    totalSum = Math.round(totalSum)
const box = document.createElement('div');
box.classList.add('box')
box.innerHTML = `
<ul class="list list-unstyled d-flex flex-column gap-2 border-bottom">
<li>
    <p>Products price</p>
    <p>$${allProductSum}</p>
</li>
<li>
    <p>Delivery</p>
    <p>$${deliverySum}</p>
</li>
<li>
    <p>Coupon</p>
    <p>No</p>
</li>
</ul>

`
const bottom = document.createElement('div')
bottom.innerHTML = `<div class="d-flex align-items-center justify-content-between">
<p class="total">TOTAL</p>
<p class="sum">$${totalSum}</p>
</div>`
const checkoutBtn = document.createElement('button')
checkoutBtn.setAttribute('class', "checkout_btn btn")
checkoutBtn.addEventListener('click', ()=>checkoutFunction())


checkoutBtn.innerHTML = 'Check out'
box.append(bottom)
bottom.append(checkoutBtn)
checkoutWrp.append(box)
}



renderCheckOut()

function deleteProductFromCarts(id){
   productsInCart = productsInCart.filter(el=>el.id != id)
   localStorage.setItem('productInCart', JSON.stringify(productsInCart))
   renderProduct()
   renderCheckOut()
}



function checkoutFunction(){
    if(!productsInCart.length){
        return
    }
    alert('Buyurtma qabul qilindi, tez orada buyurtmangiz yetkazib beriladi ✅')
    productsInCart = [];
    localStorage.setItem('productInCart', JSON.stringify(productsInCart))
    renderProduct()
    renderCheckOut();
   
}