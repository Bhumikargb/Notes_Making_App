console.log('Welcome to Notes App Made by Bhumika Khanna');
showNotes();

// if user adds a note,add it to local storage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
  let addTxt=document.getElementById('addTxt');
  addTitle=document.getElementById('addTitle');
  let notes=localStorage.getItem('notes');

  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);
  }
  let myobj={
    title:addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myobj);
  localStorage.setItem('notes',JSON.stringify(notesObj));
  addTxt.value="";
  addTitle.value="";
  console.log(notesObj);
  showNotes();
})

// function to show elements from local storage
function showNotes(){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index) {
        html+=`
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${element.title}</h5>
                  <p class="card-text">${element.text}</p>
                  <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
              </div> `;
    });

    notesElm=document.getElementById('notes');
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`Nothing to show! Use "Add a Note" section above to add a Note.`;
    }
}

// function to delete a note
function deleteNode(index){
    console.log("I am deleting",index);
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){   //input--upon typing 
    let inputVal=search.value.toLowerCase();
    console.log("Input event fired!",inputVal);
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerHTML;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        // console.log(cardTxt);
    })
})
