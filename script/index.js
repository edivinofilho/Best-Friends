import {data} from './database.js';

const section = document.querySelector('.main-cards');
const divEmptyCart = document.querySelector('.cart-empty');
const divCartProducts = document.querySelector('#cart-products')
const cartDetails = document.querySelector('.cart-details');
const notFoundMsg = document.querySelector('#notFoundSection');
const mainCards = document.querySelector('.main-cards');
const buttonsFilter = document.querySelectorAll('.filter-button');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const shoppingCart = document.querySelector('.cart-list');

let productQuantity = 0;
let shoppingCartTotal = 0;
let arrayProducts = [];

function createCards(list) {

    const cardList = document.createElement('ul')
    cardList.id = 'main-cards-list';
    
    for(let i = 0; i < list.length; i++){
        const card = document.createElement('li');
        const divImg = document.createElement('div');
        const img = document.createElement('img');
        const divContainer = document.createElement('div');
        const tag = document.createElement('span');
        const productTitle = document.createElement('h3');
        const productDescription = document.createElement('p');
        const price = document.createElement('p');
        const addToCart = document.createElement('button');

        card.id = `p_${list[i].id}`;
        card.className = 'productCard';
        divImg.className = 'imgContainer';

        img.src = list[i].img;
        img.className = 'imgClass';

        divContainer.className = 'productDescriptionContainer';

        tag.innerText = list[i].tag;
        tag.className = 'tagClass';

        productTitle.innerText = list[i].nameItem;
        productTitle.className = 'productTitle';

        productDescription.innerText = list[i].description;
        productDescription.className = 'productDescription';

        price.innerText = `R$ ${list[i].value.toFixed(2)}`;
        price.className = 'price';

        addToCart.innerText = list[i].addCart;
        addToCart.className = 'addRemoveButton';
        addToCart.id = `atc_${list[i].id}`;

        
        addToCart.addEventListener('click', function(e){
            let idElement = e.target.id;
            let id = parseInt(idElement.substring(4));
            
            if(arrayProducts.length === 0){
                arrayProducts.push(id);
                if(!verifyProductId(id)){
                    divEmptyCart.style.display = 'none';
                    divCartProducts.style.display = 'flex';
                    
                    cartDetails.style.display = 'flex';
                                    
                    productQuantity++;
                    document.querySelector('#productQuantity').innerHTML = `${productQuantity}`;
                    
                    let productId = findProduct(id);
        
                    shoppingCartTotal += list[i].value;
                    document.querySelector('#shoppingCartTotal').innerHTML = `R$${shoppingCartTotal},00`;
                    
                    let productElement = addToShoppingCart(productId);
        
                    let cartList = document.querySelector('.cart-list');
                    cartList.appendChild(productElement);
                }
            } else {
                if(!arrayProducts.includes(id)){
                    arrayProducts.push(id);
                    if(!verifyProductId(id)){
                        divEmptyCart.style.display = 'none';
                        divCartProducts.style.display = 'flex';
                        
                        cartDetails.style.display = 'flex';
                                        
                        productQuantity++;
                        document.querySelector('#productQuantity').innerHTML = `${productQuantity}`;
                        
                        let productId = findProduct(id);
            
                        shoppingCartTotal += list[i].value;
                        document.querySelector('#shoppingCartTotal').innerHTML = `R$${shoppingCartTotal},00`;
                        
                        let productElement = addToShoppingCart(productId);
            
                        let cartList = document.querySelector('.cart-list');
                        cartList.appendChild(productElement);
            
                        // let productElement = document.createElement('p');
                        // productElement.innerText = addToShoppingCart(productId);
            
                        // document.querySelector('.cart-list').appendChild(productElement);
                    }; 
                };            
            };
        });
        divImg.appendChild(img);
        card.appendChild(divImg);
        divContainer.appendChild(tag);
        divContainer.appendChild(productTitle);
        divContainer.appendChild(productDescription);
        divContainer.appendChild(price);
        divContainer.appendChild(addToCart);
        card.appendChild(divContainer);
        cardList.appendChild(card);
        section.appendChild(cardList)
    }
};

function findProduct(id){
    for(let i = 0; i < data.length; i++){
        if(data[i].id == id){
            return data[i];
        }
    }
};

function filterCards(filter){
    if(filter === 'Todos'){
        return data;
    }
    let filteredProducts = [];
    for(let i = 0; i < data.length; i++){
        if(data[i].tag == filter){
            filteredProducts.push(data[i]);
        }
    }
    return filteredProducts;
};

function removeCardsSection() {
    const productSection = document.querySelector('#main-cards-list');
    productSection.remove();
};


for(let i = 0; i < buttonsFilter.length; i++){
    buttonsFilter[i].addEventListener('click', function(){
        notFoundMsg.style.display = 'none';
        mainCards.style.display = 'flex';
        const tag  = buttonsFilter[i].innerText;
        const filteredCards = filterCards(tag);
        removeCardsSection();
        
        createCards(filteredCards);
    });
};


searchButton.addEventListener('click', function(){
    notFoundMsg.style.display = 'none';
    mainCards.style.display = 'flex';

    let keyWord = searchInput.value.toUpperCase();
    
    let searchedItems = [];
        
    
    for(let i = 0; i < data.length; i++){
        let productT = data[i].nameItem.toUpperCase();
        let productDescrip = data[i].description.toUpperCase();
        if(productT.includes(keyWord) || productDescrip.includes(keyWord)){
            searchedItems.push(data[i]);  
        }
    }
    if(searchedItems.length !== 0){
        createCards(searchedItems);
        removeCardsSection();
        clearTextInput();
    } else { 
        notFoundMsg.style.display = 'flex';
        mainCards.style.display = 'none';
        clearTextInput();
    }
});

function clearTextInput(){
    let textInput = document.querySelector('.search-input');
    if(textInput != ''){
        textInput.value = '';
    }
};

function addToShoppingCart(product){
    let itemQuantity = 1;
    
    const cartProducts = document.querySelector('#cart-products');
    cartProducts.className = 'cart-products';
    
    const productContainerCart = document.createElement('li');
    
    const imgDiv = document.createElement('div');
    const cardCartImage = document.createElement('img');
    const descripDiv = document.createElement('div');
    const cardCartTitle = document.createElement('h4');
    const cardCartPrice = document.createElement('p');
    const spanPrice = document.createElement('span');
    const cardCartRemoveButton = document.createElement('button');
    const cardPlusButton = document.createElement('i');
    let itemInnerNumber = document.createElement('span');
    const cardMinusButton = document.createElement('i');

    productContainerCart.id = `c_${product.id}`;
    productContainerCart.className = 'productContainerCart';

    imgDiv.className = 'imgDiv';

    cardCartImage.src = product.img;
    cardCartImage.className = 'cartImage';

    descripDiv.className = 'descripDiv';

    cardCartTitle.innerText = product.nameItem;
    cardCartTitle.className = 'cardCartTitle';

    cardCartPrice.innerHTML = `R$ ${product.value.toFixed(2)}`;
    cardCartPrice.className = 'price';
    
    spanPrice.className = 'spanPrice';
    cardPlusButton.className = 'bi bi-plus-square buttonMargin';
    cardPlusButton.id = `plus_${product.id}`;
    itemInnerNumber.className = 'buttonMargin'
    itemInnerNumber.innerText = itemQuantity;
    itemInnerNumber.id = `nItem_${product.id}`
    cardMinusButton.className = 'bi bi-dash-square';
    cardMinusButton.id = `minus_${product.id}`;


    cardCartRemoveButton.innerText = 'Remover produto';
    cardCartRemoveButton.className = 'addRemoveButton';
    cardCartRemoveButton.id = `rfc_${product.id}`;

    
    cardPlusButton.addEventListener('click', function(){
        itemQuantity ++;
        document.querySelector(`#nItem_${product.id}`).innerText = `${itemQuantity}`;
        productQuantity++;
        document.querySelector('#productQuantity').innerHTML = `${productQuantity}`;
        shoppingCartTotal += product.value;
        document.querySelector('#shoppingCartTotal').innerHTML = `R$${shoppingCartTotal.toFixed(2)}`;
    });

    cardMinusButton.addEventListener('click', function(e){
        let productId = e.target.id;
        let id = parseInt(productId.substring(6));
        let removedProduct = document.querySelector(`#c_${id}`);
        
        itemQuantity --;
        document.querySelector(`#nItem_${product.id}`).innerText = `${itemQuantity}`;
        productQuantity--;
        let productQuatity = document.querySelector('#productQuantity').innerText = `${productQuantity}`;
        shoppingCartTotal -= product.value;
        document.querySelector('#shoppingCartTotal').innerHTML = `R$${shoppingCartTotal.toFixed(2)}`;
        
        if(itemQuantity == 0){ 
            removedProduct.remove();
            for(let i = 0; i < arrayProducts.length; i++){
                if(arrayProducts[i] === id){
                    arrayProducts.splice(i, 1);
                }
            }
        }

        if(productQuatity == 0){
            divEmptyCart.style.display = 'flex';
            divCartProducts.style.display = 'none';
            cartDetails.style.display = 'none';   
        }
    });

    
    cardCartRemoveButton.addEventListener('click', function(e){
        let productId = e.target.id;
        let id = parseInt(productId.substring(4));
        let removedProduct = document.querySelector(`#c_${id}`);
        
        let quantity = document.querySelector(`#nItem_${product.id}`).innerText;
        
        let totalQuantity = document.querySelector('#productQuantity').innerText;
        
        let totalProductItemPrice = product.value * quantity;
        
        productQuantity = totalQuantity - quantity;
        
        document.querySelector('#productQuantity').innerHTML = `${productQuantity}`;
                
        shoppingCartTotal -= totalProductItemPrice;
        
        document.querySelector('#shoppingCartTotal').innerHTML = `R$${shoppingCartTotal.toFixed(2)}`;
        
        removedProduct.remove();

        for(let i = 0; i < arrayProducts.length; i++){
            if(arrayProducts[i] === id){
                arrayProducts.splice(i, 1);
            }
        }
        
        let generalTitle = document.querySelector('#productQuantity').innerHTML;
         if( generalTitle == 0){
            divEmptyCart.style.display = 'flex';
            divCartProducts.style.display = 'none';
            cartDetails.style.display = 'none';
         };  
    });   
    imgDiv.appendChild(cardCartImage);
    productContainerCart.appendChild(imgDiv);
    descripDiv.appendChild(cardCartTitle);
    descripDiv.appendChild(cardCartPrice);
    spanPrice.appendChild(cardPlusButton);
    spanPrice.appendChild(itemInnerNumber);
    spanPrice.appendChild(cardMinusButton);
    descripDiv.appendChild(spanPrice);
    descripDiv.appendChild(cardCartRemoveButton);
    productContainerCart.appendChild(descripDiv);
    shoppingCart.appendChild(productContainerCart);
    cartProducts.appendChild(shoppingCart);
};

function verifyProductId(id){
    let element = document.querySelector(`atc_${id}`);
    if(element == null){
        return false;
    }
    return true;
};

function logoReload(){
    document.querySelector('#logo').addEventListener('click', function(){
        window.location.reload();
    });
}

logoReload();
createCards(data);