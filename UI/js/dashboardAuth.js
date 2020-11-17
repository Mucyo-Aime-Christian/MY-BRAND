auth.onAuthStateChanged(user=>{
    if(user){
        console.log('user logged in', user);
        
    }else{
        console.log('user logged out', user);
        
    }
})
const logout = document.querySelector('#logged-in');
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut();
});