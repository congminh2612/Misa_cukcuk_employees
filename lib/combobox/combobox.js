const data=document.querySelector(".m-combobox-data")
const button=document.querySelector(".m-combobox-button")
// const display=data.style.display;
button.addEventListener('click',function(){
    if(data.style.display=="block"){
        data.style.display='none';
    }
    else{
        data.style.display='block';
    }
})

const itemSelects=document.querySelectorAll('.m-combobox-item')

itemSelects.forEach(item=>{
    item.addEventListener('click',function(){
        removeSelectClass();
        item.classList.add('select')
    })
})
function removeSelectClass(){
    itemSelects.forEach(item=>{
        item.classList.remove('select')
    })
}