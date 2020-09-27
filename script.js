let mobileBtn=document.querySelector('#mobileBtn');
let laptopBtn=document.querySelector('#laptopBtn');
let cardList=document.querySelector('#cardList');
let purchaseBtn=document.querySelector('#purchaseBtn');

class Item{
    constructor(title,price){
        this.title=title;
        this.price=price;

    }
}

class UI{
    static AddItemToCart(item){
        let cardList=document.querySelector('#cardList');
        let row=document.createElement('tr');
        row.innerHTML=`
        <td>${item.title}</td>
        <td>!</td>
        <td>${item.price}</td>
        <td><a href="#" class="delete">X</a></td>`
        cardList.appendChild(row);
        


    }
    static showAlert(massage,className){
        let div=document.createElement('div');
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(massage));
        let table=document.querySelector('#table');
        let box=document.querySelector('#box');
        box.insertBefore(div,table);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        },2000);
    }
    static deleteItem(target){
        if(target.hasAttribute("href")){
            target.parentElement.parentElement.remove();
           
            Store.removedisplayItem(target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent.trim());
            UI.showAlert("Remove Item","error");
        }
        
        
    }
    static purchaseItems(){
        if(cardList.innerHTML==""){
            UI.showAlert("Please Add Item","error");
        }else{
            UI.showAlert("Thank YOu","success");
            cardList.innerHTML="";
            localStorage.clear();
        }
    }

}

class Store{
    static getItems(){
        let items;
        if(localStorage.getItem('items')===null){
            items=[];
        }else{
            items=JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }
    static additem(item){
        let items=Store.getItems();
        items.push(item);
        localStorage.setItem('items',JSON.stringify(items));
    }
    static displayItems(){
        let items=Store.getItems();
        items.forEach(item => {
            UI.AddItemToCart(item);

            
        });
        
    }
    static removedisplayItem(title){
        let items=Store.getItems();
        items.forEach((item,index)=>{
            if(item.title===title){
                items.splice(index,1);
            }
        });
        localStorage.setItem('items',JSON.stringify(items));
    }
}
mobileBtn.addEventListener('click',addMobile);
laptopBtn.addEventListener('click',addLaptop);
cardList.addEventListener('click',removeItem);
document.addEventListener('DOMContentLoaded',Store.displayItems());
purchaseBtn.addEventListener('click',purchase);


function addMobile(e){
    let mobileTitle=document.querySelector('#mobileTitle').innerHTML;
    let mobilePrice=document.querySelector('#mobilePrice').innerHTML;
    let mobile=new Item(mobileTitle,mobilePrice);
    UI.AddItemToCart(mobile);
    UI.showAlert("Product Added","success")
    Store.additem(mobile);
}

function addLaptop(e){
    let laptopTitle=document.querySelector('#laptopTitle').innerHTML;
    let laptopPrice=document.querySelector('#laptopPrice').innerHTML;
    let laptop=new Item(laptopTitle,laptopPrice);
    UI.AddItemToCart(laptop);
    UI.showAlert("Product Added","success")
    Store.additem(laptop);
    e.preventDefault();

}

function removeItem(e){
    UI.deleteItem(e.target);
    e.preventDefault();
}
function purchase(){
    UI.purchaseItems();
}