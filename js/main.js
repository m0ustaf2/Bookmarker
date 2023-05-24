var siteNameInput=document.getElementById('siteName');
var siteUrlInput=document.getElementById('siteUrl');
var searchInput=document.getElementById('searchInput');
var submitBtn=document.getElementById('submitBtn');
var tBody=document.getElementById('tBody');
var inputs=document.getElementsByClassName('form-control')
var currentIndex=0;


if(localStorage.getItem('bookmarkData')==null)
{
    var bookmarkList=[];

    
}else{
    var bookmarkList=JSON.parse(localStorage.getItem('bookmarkData')) 
    displayBookmarkes();
}
// *******Submit-->Btn**********
submitBtn.onclick=function()
{
    if(submitBtn.innerHTML=='Submit')
    {
        createBookmark()        //add mode
    }
    else{
        updateBookmark(); //update mode
    }
    displayBookmarkes();
    clearForm()
}
// ***********create-->Bookmark************
function createBookmark()
{
    var bookmark={
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    bookmarkList.push(bookmark)
    localStorage.setItem('bookmarkData',JSON.stringify(bookmarkList))
}
//  ************display-->Bookmark**********
function displayBookmarkes()
{
  var trs='';
  for(var i=0;i<bookmarkList.length;i++)
  {
    trs+=` <tr>
    <td> <h2>${bookmarkList[i].name}</h2> </td>
    <td><a href="${bookmarkList[i].url}" target="_blank" class="btn btn-primary">visit</a> </td>
    <td><button onclick="getBookmarkInfo(${i})" class="btn btn-warning">update</button></td>
    <td><button onclick="deleteBookmark(${i})" class="btn btn-danger">delete</button></td>
    </tr>`
  }
  tBody.innerHTML=trs;
}
// ***********delete--->Bookmark************
function deleteBookmark(index)
{
    bookmarkList.splice(index,1);
    displayBookmarkes()
    localStorage.setItem('bookmarkData',JSON.stringify(bookmarkList) );

}
// **********clear-form**********************
function clearForm()
{ 
    for(var i=0;i<inputs.length;i++)
    {
        inputs[i].value='';
    }
}
//**********Search-->Bookmark**********
searchInput.onkeyup=function()
{
    var trs="";
    for(var i=0;i<bookmarkList.length;i++)
    {
        if(bookmarkList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
        {
            trs+=` <tr>
    <td> <h2>${bookmarkList[i].name}</h2> </td>
    <td><a href="${bookmarkList[i].url}" target="_blank" class="btn btn-primary">visit</a> </td>
    <td><button onclick="getBookmarkInfo(${i})" class="btn btn-warning">update</button></td>
    <td><button onclick="deleteBookmark(${i})" class="btn btn-danger">delete</button></td>
    </tr>`
        }
   tBody.innerHTML=trs;
    }
}
// ********Update--->Bookmark
function getBookmarkInfo(index)
{
    currentIndex=index;
    var currentBookmark=bookmarkList[index]//---->>>> bt3red el object kullo
    siteNameInput.value=currentBookmark.name
    siteUrlInput.value=currentBookmark.url
    submitBtn.innerHTML='Update Bookmark'
}
function updateBookmark()
{
    var bookmark={
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    bookmarkList[currentIndex]=bookmark;
    submitBtn.innerHTML='Submit'
    localStorage.setItem('bookmarkData',JSON.stringify(bookmarkList) );
}
// ****************siteName-Validation***********************
var nameAlert =document.getElementById('nameAlert');
siteNameInput.onkeyup=function()
{
    var nameRejex=/[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/
    if(nameRejex.test(siteNameInput.value))
    {//lw valid 7elo
        submitBtn.removeAttribute('disabled')
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none')

    }
    else{// not valid we74
        submitBtn.disabled='true';
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none')

    }
}
// ********************urlName-Validation*******************
var urlAlert =document.getElementById('urlAlert');
siteUrlInput.onkeyup=function()
{
    var nameRejex=(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(nameRejex.test(siteUrlInput.value))
    {//lw valid 7elo
        submitBtn.removeAttribute('disabled')
        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
        urlAlert.classList.add('d-none')

    }
    else{// not valid we74
        submitBtn.disabled='true';
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        urlAlert.classList.remove('d-none')

    }
}


