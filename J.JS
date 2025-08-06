let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let submit=document.getElementById("submit")
let mode ="create"
let temp;

function get_total(){
    if (price.value !=""){
        let result= (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value)
        total.innerHTML=result
        total.style.background="#040"
    }else{
        total.innerHTML=""
        total.style.background= "rgb(245, 20, 20)";
    }
}

//////create product
let data_pro
if (localStorage.product!=null){
    data_pro=JSON.parse(localStorage.product)
}else{
    data_pro=[];}

submit.onclick=function(){
    let new_pro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if(title.value!="" && price.value!="" && category.value!=""&& new_pro.count<101){
        if (mode==="create"){
            if (new_pro.count>1){
                for(let i = 0 ;i<new_pro.count;i++){ 
                    data_pro.push(new_pro)
                } 
            }else{
              data_pro.push(new_pro)  
            }
        }else
            {
            data_pro[temp]=new_pro
            mode = " create";
            submit.innerHTML ="create"
            count.style.display="block"
        }
         clear_data()
    }
    localStorage.setItem("product",JSON.stringify(data_pro)) 
    show_data()
 }


 ////clear inputs
 function clear_data(){
    title.value="";
    taxes.value="";
    price.value="";
    ads.value="";
    discount.value="";
    count.value="";
    category.value="";
    total.innerHTML="";
 }


 ////read 
 function show_data(){
    let table='';
    for(let i=0; i < data_pro.length;i++){
        table+=` 
        <tr>
            <td>${[i+1]}</td>
            <td>${data_pro[i].title}</td>
            <td>${data_pro[i].price}</td>
            <td>${data_pro[i].taxes}</td>
            <td>${data_pro[i].ads}</td>
            <td>${data_pro[i].discount}</td>
            <td>${data_pro[i].total}</td>
            <td>${data_pro[i].category}</td>
            <td><button onclick="updateData(${i})" id ="update">Update</button></td>
            <td><button onclick="delete_data (${i})"id ="delete">Delete</button></td>

         </tr>`;
    }
    document.getElementById('tbody').innerHTML=table
    let btnDelete=document.getElementById("deleteAll")
    if (data_pro.length>0){
        btnDelete.innerHTML=`<button onclick="DeleteAll()">Delete All (${data_pro.length})</button>`
    }else{
        btnDelete.innerHTML=""
    }
get_total()
 }

show_data()

////delete data
function delete_data(i){
    data_pro.splice(i,1);
    localStorage.product=JSON.stringify(data_pro)
    show_data()

}

function DeleteAll(){
    localStorage.clear();
    data_pro.splice(0)
    show_data()
}


////update

function updateData(i){
    title.value=data_pro[i].title
    price.value=data_pro[i].price
    taxes.value=data_pro[i].taxes
    ads.value=data_pro[i].ads
    discount.value=data_pro[i].discount
    get_total()
    count.style.display="none"
    category.value=data_pro[i].category
    submit.innerHTML="update"
    mode="update"
    temp=i
    scroll({
        top : 0,
        behavior:"smooth"
        
    })
    
 
}

//search
let searchMood="title";
function getSearchMood(id)
{
    let search =document.getElementById("search")
    if (id=="searchTitle"){
        searchMood="title"
        search.placeholder="Search By Title"
    }else{
        searchMood="Category"
        search.placeholder="Search By Category"
    }
search.focus()
search.value=""
show_data()

    
}


function searchData(value){
    let table = "";
    let lowerValue = value.toLowerCase();
    for (let i = 0; i < data_pro.length; i++){
        if (searchMood === "title") {
                if (data_pro[i].title.toLowerCase().includes(lowerValue)) {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${data_pro[i].title}</td>
                        <td>${data_pro[i].price}</td>
                        <td>${data_pro[i].taxes}</td>
                        <td>${data_pro[i].ads}</td>
                        <td>${data_pro[i].discount}</td>
                        <td>${data_pro[i].total}</td>
                        <td>${data_pro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="delete_data(${i})" id="delete">Delete</button></td>
                    </tr>`;
                }
            
        } else { 
                if (data_pro[i].category.toLowerCase().includes(lowerValue)) {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${data_pro[i].title}</td>
                        <td>${data_pro[i].price}</td>
                        <td>${data_pro[i].taxes}</td>
                        <td>${data_pro[i].ads}</td>
                        <td>${data_pro[i].discount}</td>
                        <td>${data_pro[i].total}</td>
                        <td>${data_pro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="delete_data(${i})" id="delete">Delete</button></td>
                    </tr>`;
                }
            
        }
    
        document.getElementById('tbody').innerHTML = table;
    }
    }