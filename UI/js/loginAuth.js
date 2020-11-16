const loginForm = document.querySelector('#form_wrapper');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.querySelector('#login').value;
    const pass = document.querySelector('#field_password').value;
    auth.signInWithEmailAndPassword(email, pass).then((cred)=>{
        console.log(cred.user);
        loginForm.reset();
        location.href='dashboard.html' 
    });
});

auth.onAuthStateChanged(user=>{
    if(user){
        console.log('user logged in', user);
        alert(`you are logged in as ${user.email}`);
    }else{
        console.log('user logged out', user);
    } 
})