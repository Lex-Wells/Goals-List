let quoteBtn = document.getElementById("click-here")
let quoteHeader = document.getElementById("quote-header")
const quoteContainer = document.getElementById("quote-container")
const inputBoxEl = document.getElementById("input-box")
const imgInputEl = document.getElementById("img-input")
const submitBtnEl = document.getElementById("submit-btn")
let renderContainerEL = document.getElementById('render-outer-container')
const closeModalBtn = document.getElementById('exit-button')
const modal = document.getElementById("pop-up")
const darkBackground = document.getElementById("dark-modal")
const addPicBtn = document.getElementById('add-btn')
const customImgBtn = document.getElementById("material-icons-round-add")
const totdoTotalCounter = document.getElementById("finished-todo-counter")
const savedContainer = document.getElementById("tasks-container")
const savedTodosModal = document.getElementById("tasks-pop-up")
const closeTodosModal = document.getElementById("exit-button-tasks")

let totals = 0
let todoList = []
let savedTodos = []

 

function render(){
  renderContainerEL.innerHTML = ''
todoList.forEach((todo)=>{

  const renderContainer = document.createElement('div')
  renderContainer.classList.add("render-container")
  renderContainerEL.appendChild(renderContainer)


  let renderBox = document.createElement('div')
  renderBox.classList.add("render-box")
  const toDoPar = document.createElement('p')
  toDoPar.classList.add('todo-par')
  toDoPar.innerHTML = todo.text
  renderContainer.appendChild(renderBox)
  
  const expandButton = document.createElement('div')
  expandButton.innerHTML = '<span id="expand-button" class="material-icons-outlined">expand_more</span>'
  expandButton.classList.add("material-icons-outlined")
  renderBox.appendChild(expandButton)

  
  expandButton.addEventListener('click',function(){
  
    if(todo.img === ""){
      alert("No Pic")
    }else{
      
    const openContainer = renderImgContainer
    openContainer.classList.toggle("render-img-container-active")
    expandButton.classList.toggle("chevron-toggle")

    }
  })


  const renderImgContainer = document.createElement('div')
  renderImgContainer.classList.add("render-img-container")
  renderImgContainer.style.backgroundImage = `url(${todo.img})`
  renderContainer.appendChild(renderImgContainer)
 

  renderBox.appendChild(toDoPar)
  
  const DoneButton = document.createElement('div')
  DoneButton.innerText = 'Done'
  DoneButton.classList.add("done-button")
  DoneButton.id = todo.id
  DoneButton.style.cursor = "pointer"
  renderBox.appendChild(DoneButton)  
  DoneButton.addEventListener("click",()=>{
   DoneButton.innerHTML = "Save"
   DoneButton.style.color = "#227027"
   DoneButton.addEventListener("click",()=>{
    console.log("clicked me");
    totals += 1
    totdoTotalCounter.innerHTML=`<h3>${totals} Goal${totals>1? "s": ""} Completed</h>`
    totdoTotalCounter.classList.add("finished-todo-counter-active")
    savedTodos.push(todo)
    deleteButton.click()
   })

  })


  const deleteButton = document.createElement('div')
  deleteButton.innerText = "Delete"
  deleteButton.classList.add("delete-btn")
  deleteButton.id = todo.id
  deleteButton.style.cursor = "pointer"
  deleteButton.onclick = deleteTodoItem
  renderBox.appendChild(deleteButton)  

  customImgBtn.style.color = "white"

  apiView

})}







function addToList(){

  const imgDataString = imgData.toString()
  let todoInfo = inputBoxEl.value;
  let imgInfo = imgDataString 
  const idNum = new Date().getTime();

  todoList.push({
    text: todoInfo,
    id: idNum, 
    img: imgInfo  
  })
  render()  
  imgData = []
  apiView()
}

function deleteTodoItem(event){
 const deleteEvent = event.target
 const deleteTarget = deleteEvent.id
 todoList = todoList.filter(function(todo){
  if(todo.id == deleteTarget){
    return false}else{
      return true
    }
 })
 render()
}
submitBtnEl.addEventListener("click",()=>{
  if (inputBoxEl.value == "") {
    return false;
}else{
  addToList()
  inputBoxEl.value =''
}
})

inputBoxEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitBtnEl.click();
    }
  });

function apiView(){
  if(todoList.length > 0){
    quoteContainer.classList = "quote-container-hide"
  }
}



 
let imgData = []
imgInputEl.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result;
      let imgContainer = document.getElementById("img-render-container")
      imgContainer.style.backgroundImage = `url(${uploaded_image})`;
      imgPicValue = uploaded_image
    });
    reader.readAsDataURL(this.files[0]);
    openModal(modal)
  });



  addPicBtn.addEventListener("click",()=>{
    imgData.push(imgPicValue)
    closeModal(modal)
    customImgBtn.style.color = "#808080"
  })






closeModalBtn.addEventListener("click",()=>{
    closeModal(modal)
})
darkBackground.addEventListener("click",()=>{
 closeModal(modal)
})
function openModal(modal){
 if(modal == null)return
 modal.classList.add('active')
 darkBackground.classList.add('active') 
}
function closeModal(modal){
 if(modal == null)return
 modal.classList.remove('active')
 darkBackground.classList.remove('active') 
}

  async function random(){
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    let randomQuote = data.content
    let randomAuthor = data.author
    let quote = document.createElement('p') 
    quote.innerText = randomQuote
    quote.classList.add('quote')
    let quoteAuthor = document.createElement('h5')
    quoteAuthor.innerText = randomAuthor
    quoteAuthor.classList.add('author')
    quoteContainer.append(quote,quoteAuthor)

}
quoteBtn.addEventListener("click",function(){ 
    random()
    random = null
})






