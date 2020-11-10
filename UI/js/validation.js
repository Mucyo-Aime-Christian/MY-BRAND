let bt = document.getElementById("submit");
bt.onclick = validate;

function remove_error(){
  error_message.style.visibility='hidden';
}

function validate(){
    var firstName = document.getElementById("fname").value;
    var  secondName= document.getElementById("lname").value;
    var message = document.getElementById("subject").value;

    var error_message = document.getElementById("error_message");
    var fName = document.getElementById("fname");
    var lName = document.getElementById("lname");
    var msg = document.getElementById("subject");
    fName.onfocus = remove_error;
    lName.onfocus = remove_error;
    msg.onfocus = remove_error;
    
    error_message.style.padding = "10px";
    error_message.style.marginLeft="20px";
    error_message.style.backgroundColor="red";
    var text;
    if(firstName.length ==""){
      error_message.style.visibility = 'visible';
      text = "First Name is required!";
      error_message.innerHTML = text;
      return false;
    }
    if(secondName.length ==""){
      error_message.style.visibility = 'visible';
      text = "Surname is Required";
      error_message.innerHTML = text;
      return false;
    }
    
    if(message.length <20){
      error_message.style.visibility = 'visible';
      text = "Enter minimum of 20 characters";
      error_message.innerHTML = text;
      return false;
    } 
    else{
      alert("Form validation Successfully!");
      sendEnquiry();
     // db.collection("message").add("{}");    
    }
      return true;
    }

    function sendEnquiry(){
      let firstName = document.getElementById('fname').value;
      let secondName = document.getElementById('lname').value;
      let message = document.getElementById('subject').value;
      let form = document.getElementById('myform');
      
      db.collection('message').doc().set({
         first_Name:firstName ,
         second_Name:secondName,
         message:message
      }).then(()=>{
        form.reset();
        alert("An enquiry sent successfully")

      }).catch((error)=>{
        alert(error)
      })

    }
