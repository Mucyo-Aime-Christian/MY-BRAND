var pane_item=document.getElementsByClassName("pane-item");
pane_item[0].style.display="block";
function display_item(n){
    var menu=document.getElementsByClassName("menu-item");
    for(let i=0; i<menu.length; i++){
        menu[i].classList.remove("active");
        pane_item[i].style.display="none";
    }

    menu[n].classList.add("active");
    pane_item[n].style.display="block";
}





var sideNav= document.getElementById("left");
function dropSideNav(){
    sideNav.classList.add("responsive");
}
function closeSideNav(){
    sideNav.classList.remove("responsive");
}