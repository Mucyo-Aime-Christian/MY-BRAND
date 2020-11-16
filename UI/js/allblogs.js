
const myblogs = document.querySelector('#blogs');
let html ='';
db.collection('blogs').orderBy('time','desc').onSnapshot((docs)=>{
    docs.forEach((doc)=>{
       const get = doc.data();
        get.id = doc.id;
       html += `<div class="post_1"><i class="fa fa-calendar"></i><span style="font-size:small;">
        ${moment(get.time).format("MMMM DD YYYY")}</span>
        <a href="./blogdetails.html?id=${get.id}"><img src="${get.image}"  height="60%" width="100%"></a>
      <h3>${get.title}</h3><br/>
      <p style="font-size: medium;" id="words">${get.content}</p>
      <a href="#"><img src="./images/like.png" width="9%"></a><a href="blogdetails.html#comments?id=${get.id}">
      <img src="./images/comment.png" width="9%" align="right"></a>
    </div>`
    })
    myblogs.innerHTML = html;
})
