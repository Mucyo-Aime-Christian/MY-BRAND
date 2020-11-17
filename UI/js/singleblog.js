const myblogs = document.querySelector('#singleblog');
const commentForm = document.querySelector('#myform');
const commentsContent = document.querySelector('.commentscontainer');
const blogId = location.href.split('?id=')[1];
const name = document.querySelector('#fname');
const smail = document.querySelector('#email');
const message = document.querySelector('#subject');
let html ='';
db.collection('blogs').doc(blogId).onSnapshot((doc)=>{
       const get = doc.data();
        get.id = doc.id;
        html += `<div class="blogtitle">${get.title}</div>
        <div class="blogpost">
           <div class="post"> <img src="${get.image}" width="100%" height="100%"></div>
           <div class="post"><img src="./images/cover.jpg" width="100%" height="100%"></div>
           </div>
       <div class="paragraph"><span>${get.content}</span></div>`
    myblogs.innerHTML = html;
})



db.collection('blogs').doc(blogId).collection('comments').orderBy('time','desc').onSnapshot((docs)=>{
    let html = '';
    docs.forEach((doc)=>{
        const get = doc.data();
        html +=` <div class="commentscontainer">
      <div class="commentsbody">
        <div class="cmt_top">
       <div class="cmt_img"><img src="./images/pp.jpg"></div>
       <div class="cmt_info">
         <div class="cmt_name">${get.name}</div>
         <div class="cmt_time">${moment(get.time).fromNow()}</div>
         <div class="cmt_content">${get.Comment}</div>
       </div>
      </div>
        </div>
     </div>`
    })
    commentsContent.innerHTML = html;
})




commentForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(checkLength(name,3) && checkEmail(smail) && checkLength(message,3)){
           db.collection('blogs').doc(blogId).collection('comments').add({
                name: name.value,
                sender_email: smail.value,
                Comment: message.value,
                time: Date.now()
           }).then(()=>{
            commentForm.reset();
            alert("Comment submitted. Thank you")
           }).catch((error)=>{
               console.log(error);
               alert("an error occured !")
           })
      }
});