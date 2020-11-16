const blogsArea= document.querySelector('.blogs-area');
db.collection('blogs').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        renderBlogs(doc);
    });
}).catch(err =>{
    console.log(err.message);
});

function renderBlogs(doc){
    let blog= document.createElement('div');
    blog.setAttribute('class','blog');
    blog.setAttribute('data-id',doc.id);

    let blogImg=document.createElement('div');
    blogImg.setAttribute('class', 'blog-img');

    let coverImg=document.createElement('img');
    coverImg.setAttribute('src', doc.data().image);

    let blogText=document.createElement('div');
    blogText.setAttribute('class','blog-text');

    let blogTitle= document.createElement('div');
    blogTitle.setAttribute('class','blog-title');
    
    let blogInfo= document.createElement('div');
    blogInfo.setAttribute('class','blog-info');

    let blogAuthor= document.createElement('div');
    blogAuthor.setAttribute('class','blog-author');
    
    let blogDate= document.createElement('div');
    blogDate.setAttribute('class','blog-date');

    let blogBtns= document.createElement('div');
    blogBtns.setAttribute('class','blog-btns');

    let viewBtn= document.createElement('button');
    viewBtn.setAttribute('class','view-btn');

    let editBtn= document.createElement('button');
    editBtn.setAttribute('class','edit-btn');

    let deleteBtn= document.createElement('button');
    deleteBtn.setAttribute('class','delete-btn');


    blogTitle.textContent= doc.data().title;
    blogAuthor.textContent= "Mr. Chris";
    blogDate.textContent=moment(doc.data().time).format("MMMM DD, YYYY");
    deleteBtn.textContent="Delete";
    editBtn.textContent="Edit";
    viewBtn.textContent="View";

    blogImg.appendChild(coverImg);

    blogBtns.appendChild(viewBtn);
    blogBtns.appendChild(editBtn);
    blogBtns.appendChild(deleteBtn);

    blogInfo.appendChild(blogAuthor);
    blogInfo.appendChild(blogDate);


    blogText.appendChild(blogTitle);
    blogText.appendChild(blogInfo);
    blogText.appendChild(blogBtns);

    blog.appendChild(blogImg);
    blog.appendChild(blogText);


   

    blogsArea.appendChild(blog);
    viewBtn.addEventListener('click', (e)=>{
        let id= e.target.closest(".blog").getAttribute('data-id'); 
        console.log(id);
     location.href=`blogdetails.html?id=${id}`
    });

    auth.onAuthStateChanged(user=>{
        if(user){
    deleteBtn.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id= e.target.closest(".blog").getAttribute('data-id');
        console.log(id);
        db.collection('blogs').doc(id).delete();
        alert("Blog Deleted successfully!");
        
    
    });

    editBtn.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id= e.target.closest(".blog").getAttribute('data-id');
        console.log(id);
        alert("Your are being redirected");

        location.replace("edit-blog.html?"+id);     
        

    });
        }else if(editBtn.addEventListener('click', ()=>{ alert('please login to edit');})|| deleteBtn.addEventListener('click', ()=>{ alert('please login to delete');})){
           
            console.log('user logged out', user);
        }
    })

    

}

