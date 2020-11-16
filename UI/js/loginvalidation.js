let bt = document.getElementById("input_submit");
bt.onclick = validate;
error_message.style.visibility='hidden';
function validate(){
    var email = document.getElementById("login").value;
    var password = document.getElementById("field_password").value;
    var error_message = document.getElementById("error_message");
    
    error_message.style.padding = "10px";
    var text;
    if(email.indexOf("@") == -1 || email.length < 6){
      text = "Please Enter valid Email";
      error_message.style.visibility = 'visible';
      error_message.innerHTML = text;
      return false;
    }
    
     if(password.length<4 || password.length>10){
        text = "Please Enter valid password";
        error_message.style.visibility = 'visible';
        error_message.innerHTML = text;
        return false;
     }
     

     else{
      return true;   
     }
    }