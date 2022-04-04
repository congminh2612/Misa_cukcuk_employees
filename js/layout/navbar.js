const menuItems=document.querySelectorAll('.menu-item')

menuItems.forEach(item=>{
    item.addEventListener('click',()=>{
        removeClassActive();
        item.classList.add('active')
    })
})
function removeClassActive() {
   menuItems.forEach(item=>{
       item.classList.remove('active')
   })
        
}
    