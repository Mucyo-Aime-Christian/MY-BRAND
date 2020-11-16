
const profile = document.querySelector('#info-section');
db.collection('profiles').onSnapshot((docs)=>{
    docs.forEach((doc)=>{
        let html = '';
        const get = doc.data();
        var id =doc.id;
        html +=`<div class="info"><div class="info-label">Username: </div>
            <div class="info-value" id="name">
                ${get.Username}
            </div></div> <div class="info">
            <div class="info-label">Email: </div>
            <div class="info-value" id="email">
                ${get.Email}
            </div>
        </div>

        <div class="info">
            <div class="info-label">
                Phone:
            </div>
            <div class="info-value" id="phone">
                ${get.Phone}
            </div>
        </div>

        <div class="info">
            <div class="info-label">
                Address:
            </div>
            <div class="info-value" id="address">
                ${get.Address}
            </div>
        </div>`
        profile.innerHTML = html;
    // })
    let inputname= document.querySelector('.name');
let inputemail= document.querySelector('.email');
let inputphone = document.querySelector('.phone');
let inputaddress = document.querySelector('.address');
var queryString = location.search.substring(1);
console.log(queryString);

db.collection('profiles')/*.doc(queryString)*/.onSnapshot(snapshot=>{
    //console.log(snapshot);
    
        fillform(snapshot);
    
});

function fillform(docs){ 
    //console.log(docs);
    docs.forEach(doc =>{
   const get= doc.data();
    inputname.value= get.Username;
    inputemail.value= get.Email;
    inputphone.value= get.Phone;
    inputaddress.value= get.Address;
    });
}
let updateBtn=document.querySelector('#profile_save');
auth.onAuthStateChanged(user=>{
updateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(user){
               if( checkLength(inputname,3)  && checkEmail(inputemail) && checkLength(inputphone,10) && checkLength(inputaddress,4) ){
                  db.collection('profiles').doc(id).update({
                     Username: inputname.value,
                      Email: inputemail.value,
                      Phone: inputphone.value,
                      Address: inputaddress.value
                    }).then(()=>{
                        alert('data updated successfully');
                        location.href='dashboard.html'
                      });
            
                 }
                } else{
                    alert('please login to edit');
                } 
});

})
})  
})
var error_message = document.getElementById('h');
error_message.style.visibility='hidden';
const checkLength =(input,min)=>{
    if(input.value.trim().length < min){
        showError(input,`${input.id} should be atleast ${min} characters`);
        return false;
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
          return false;
      }else{
           removeError(input);
           return true;
      }
}

 //a function to display an error
const showError=(input,message)=>{
    const input_error = input.parentElement;
    input_error.classList ='control error';
    const errorMessage = input_error.querySelector('#h');
    errorMessage.innerHTML = message;
    errorMessage.style.visibility='visible';

}
const removeError = (input)=>{
    const errormessage = document.getElementById('h');
    error_message.style.visibility='hidden';
    const input_error = input.parentElement;
    input_error.classList ='control error';
}




//changing profile picture

const pp= document.querySelector('#profile_img');
const pp1 = document.querySelector('.profile-img');
const pp2 = document.querySelector('.user-avatar');
db.collection('profiles').onSnapshot((docs)=>{
    docs.forEach((doc)=>{
        let html = '';
        const get = doc.data();
        //var id =doc.id;
        html +=`
            <img src="${get.image}" alt="">`
            pp.innerHTML=html;
            pp1.innerHTML=html;
            pp2.innerHTML=`<img src="${get.image}" alt="" onclick="dropNav()">`
    })
    
})


let img;
 let editImage = document.querySelector('#picture');
var queryString = location.search.substring(1);
auth.onAuthStateChanged(user=>{
console.log(queryString);
let savebtn=document.querySelector('#pp_image');
savebtn.addEventListener('click',(e)=>{
    e.preventDefault();
    img = editImage.files[0];
   if(user){
    const storageRef = firebase.storage().ref('profile_images/');
            const uploadImage = storageRef.put(img);
            uploadImage.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                console.log(downloadURL);

                db.collection('profiles').doc('GfABUPxFhYXDNL4UmlAJ').update({
                    image: downloadURL
                   }).then(()=>{
                       alert('data updated successfully');
                       location.href='dashboard.html'
                
                    });
                });
            } else{
                alert('please login to edit');
            } 
            });
        });