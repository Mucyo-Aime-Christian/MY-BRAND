const createBlogForm = document.querySelector('#blogform');
const Title = document.querySelector('#title');
const description = document.querySelector('#description');
const blogImage = document.querySelector('#fileimage');
createBlogForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(checkLength(Title,5) && checkLength(description,100) && validateImage()){
        
        const imageFile = blogImage.files[0];
        const storageRef = firebase.storage().ref(`post_images/${imageFile.name}`);
        const uploadImage = storageRef.put(imageFile);
        uploadImage.snapshot.ref.getDownloadURL().then((downloadURL)=>{
            console.log(downloadURL);
           db.collection('blogs').add({
              image: downloadURL,
              title: Title.value,
              content: description.value,
              
              time: Date.now(),
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
           }).then(()=>{
                createBlogForm.reset();
                location.href = './blog.html'
            }).catch(error=>{
                console.log(error);
            });
        });
    }
});

