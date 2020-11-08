let bt = document.getElementById("form_wrapper");
bt.onsubmit = validate;
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
      db.collection("message").add("{}");   
     }
      alert("Form Submitted Successfully!");
      return true;
     }

/*
    function sendEnquiry(){
      let email = document.getElementById('email').value;
      let message = document.getElementById('message').value;
      let form = document.getElementById('myform');
      
      db.collection('enquiries').doc().set({
        name: name,
        email: email,
        message: message
      }).then(()=>{
        form.reset();
        alert("An enquiry sent successfully")

      }).catch((error)=>{
        alert(error)
      })

    }

    function getEnquiries(){
      let table = document.getElementById('enquiryTable');
      db.collection('enquiries').get().then((enquiries)=>{
        enquiries.forEach(enquiry => {
          table.innerHTML+= `
          <tr>
          <td>${enquiry.data().name}</td>
          <td>${enquiry.data().email}</td>
          <td>${enquiry.data().message}</td>
          <td><img src="../assets/delete-icon-18-ffffff-16.png"</td>
        </tr>
          `
        });
      })
    }
    //getEnquiries();*/
