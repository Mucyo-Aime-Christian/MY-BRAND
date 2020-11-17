
let img;
let inputTitle= document.querySelector('#title');
let inputContent= document.querySelector('#description');
let editImage = document.querySelector('.file-input');
var queryString = location.search.substring(1);
//console.log(queryString);

db.collection('blogs').doc(queryString).get().then((snapshot)=>{
    //console.log(snapshot.data());
    fillform(snapshot);
});

function fillform(doc){
    const get = doc.data();
    inputTitle.value= get.title;
    inputContent.value= get.content;

}

let updateBtn=document.querySelector('#update_btn');
updateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    img = editImage.files[0];
    if(img){
        const storageRef = firebase.storage().ref(`post_images/${img.name}`);
            const uploadImage = storageRef.put(img);
            uploadImage.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                console.log(downloadURL);
                if( checkLength(inputTitle,7) && checkLength(inputContent,100)){
                  db.collection('blogs').doc(queryString).update({
                     title: inputTitle.value,
                      content: inputContent.value,
                     image: downloadURL
                    }).then(()=>{
                        alert('data updated successfully');
                        location.href='dashboard.html'
                      });
                }
                    })
                
           
    } 
    else if( checkLength(inputTitle,7) && checkLength(inputContent,100)){
        db.collection('blogs').doc(queryString).update({
           title: inputTitle.value,
            content: inputContent.value,
          }).then(()=>{
            alert('data updated successfully');
            location.href='dashboard.html'
          });
            
            
      }
});