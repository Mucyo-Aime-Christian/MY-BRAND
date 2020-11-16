
auth.onAuthStateChanged(user=>{
    if(user){
        console.log('user logged in', user);
    }else{
        console.log('user logged out', user);
    }
})
//signup authantication
const signupForm = document.querySelector('#form_wrapper');
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.querySelector('#login').value;
    const pass = document.querySelector('#field_password').value;

    console.log(email,pass);

    auth.createUserWithEmailAndPassword(email, pass).then(cred=>{
        console.log(cred.user);
        signupForm.reset();
        location.href='dashboard.html'
    });
});

