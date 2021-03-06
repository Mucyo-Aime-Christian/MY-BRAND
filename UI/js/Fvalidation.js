
   //a function that checks the length of entered input fields.
const checkLength =(input,min)=>{
    if(input.value.trim().length < min){
        showError(input,`${input.id} should be atleast ${min} characters`);
    } else {
        removeError(input);
        return true
    }
}
    //a function to validate an email
 const checkEmail = (input)=>{
      const emailRegex =/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      const email = String(input.value).toLowerCase();
      const isValidEmail = emailRegex.test(email);
      if(!isValidEmail) {
          showError(input,'email is not valid');
      }else{
           removeError(input);
           return true;
      }
}

 //a function to display an error
const showError=(input,message)=>{
    if(message=="email is not valid" && input.id=="subscribe"){
        const input_error = input.parentElement;
        input_error.classList ='form-box error';
        const errorMessage = input_error.querySelector('h5');
        errorMessage.innerHTML = message;  
    } else{
    const input_error = input.parentElement;
    input_error.classList ='col-75 error';
    const errorMessage = input_error.querySelector('h5');
    errorMessage.innerHTML = message;
}
}
const removeError = (input)=>{
    var errormessage = document.getElementById('h');
    errormessage.style.visibility="hidden";
    if(input.id=="subscribe"){
        const input_error = input.parentElement;
        input_error.classList ='form-box error';
    }else{
    const input_error = input.parentElement;
    input_error.classList ='col-75';
}
}

 const validateImage = ()=> {
    var file = document.getElementById("fileimage");
    if (file.value==""){
        alert("please select the image");
        return false;
    }
    if (file.size > 1024000) {
        alert('Max Upload size is 1MB only');
        document.getElementById("fileimage").value = '';
        return false;
    }
    return true;
}
