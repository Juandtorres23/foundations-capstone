
const controlContainer = document.querySelector("#control-container")
const bgControlerContainer = document.querySelector(".background-container")
const controlImage = document.querySelector("#control-image")
const controlName = document.querySelector("#control-name")
const allControlName = document.querySelector("#all-control-name")
const smallInfoText = document.querySelector("#small-info")
const readMoreBtn = document.querySelector(".read-more")
const nextBtn = document.querySelector("#next-btn")
const controlId = document.querySelector(".control-id")
let allReadMoreBtn = document.querySelectorAll(".read-more")

const containersContainer = document.querySelector("containers-container")
const allControllersCont = document.querySelector(".allControllers")
const allBtn = document.querySelector("#allBtn")
const playBtn = document.querySelector(".controlBrand")
const xboxBtn = document.querySelector("#xboxBtn")
const nintendoBtn = document.querySelector("#nintendoBtn")
const homeBtn = document.querySelector("#homeBtn")
const controlBtn = document.querySelector("#dropbtn")

const commentBox = document.querySelector(".comment")
const commenter = document.querySelector(".commenter")
const commentConName = document.querySelector(".controller-name")
const allCommentCon = document.querySelector(".all-comment-container")
const commentHolder = document.querySelector(".commentHolder")

const postCommentCon = document.querySelector(".comment-form-container")
const commenterName = document.querySelector("#commenterName")
const commentInput = document.querySelector("#commentInput")
const postForm = document.querySelector(".commentForm")
const commentSection = document.querySelector(".postCommentCon")

const controlBrand = document.querySelectorAll(".controlBrand")

const yearDiv = document.querySelector(".yearDiv")
const largeInfo = document.querySelector(".largeInfo")

function hpInfo() {
    
    axios.get('/controllers/small')
    .then(res =>  {
        yearDiv.style.display = "none"
        largeInfo.style.display = "none"

        controlName.innerHTML = ''
        controlId.innerHTML = ''
        smallInfoText.innerHTML = ''
        readMoreBtn.href = ''
        controlImage.src = ''
        const data = res.data

        let randomIndex = Math.floor(Math.random() * data.length);
        const name = data[randomIndex].name
        const id = data[randomIndex].control_id
        const info = data[randomIndex].info_small
        // const href = data[randomIndex].href
        const image = data[randomIndex].imageurl 
        
        controlName.innerHTML += name
        controlId.innerHTML += id
        smallInfoText.innerHTML += info
        readMoreBtn.href += "/control"
        controlImage.src += image

        displayComments()
    })
    .catch(err => console.log(err))
}



// function selectId(e) {
//     const id = e.attributes.id
//     document.querySelector('body').id
//     controlName.attributes.id = id   
//     console.log(id)
// }


// function nextBtnFunc() {
//     let newId = controlName.attributes.id
//     console.log(newId)
//     newId++
//     setId()

// }

// function inspectingEvent(e) {
//     console.log(e.target)
// }

function makeControlCard(control) {
    const controlCard = `<div>
    <div class="all-control-container" id="all-control-container">
    <div class="all-image-div">
        <img 
        class="all-home-img"
        id="all-control-image"
        src=${control['imageurl']}
        > 
    </div>

    <div class="all-control-id">  </div>
    
    <div class="all-text-container" >
        <h2 id="all-control-name"> ${control['name']} </h2>
        <p class="all-smallInfo" id="all-small-info"> ${control['info_small']} </p>
        <div class="read-more" onclick="displayReadMore()">
            <a > Read More..</a>
        </div>
    </div>   
</div>
</div>`

return controlCard
}

function displayAllControls() {
    axios.get('/controllers/small')
    .then(res => {

        controlName.innerHTML = ''
        commentSection.style.display = "none"
        controlContainer.style.display = "none"
        bgControlerContainer.style.display = "none"
        homeBtn.classList.remove("active")
        controlBtn.style.backgroundColor = "rgb(184,22,25)"
        controlBtn.classList.add("active")

        allControllersCont.innerHTML = ''

        res.data.forEach(control => {
            const controlCard = makeControlCard(control)

            allControllersCont.innerHTML += controlCard
        }) 
        allReadMoreBtn = document.querySelectorAll(".read-more") 
        console.log(allReadMoreBtn)  
        for(let i = 0; i < allReadMoreBtn.length; i++) {
            allReadMoreBtn[i].addEventListener('click', displayReadMore)
        }
    })
    .catch(err => console.log(err))
} 

function displayBrandControls(e) {
    axios.get('/controllers/brands')
    .then(res => {

        commentSection.style.display = "none"
        controlContainer.style.display = "none"
        bgControlerContainer.style.display = "none"
        homeBtn.classList.remove("active")
        controlBtn.style.backgroundColor = "rgb(184,22,25)"
        controlBtn.classList.add("active")

        const control = e.target.textContent
        console.log(control)

        controlContainer.innerHTML = ''
        bgControlerContainer.innerHTML = ''

        allControllersCont.innerHTML = ''

        for(let i = 0; i < res.data.length; i++){
           if(res.data[i].brand_name === control) {
                const data = res.data[i]  
                console.log(data)
                const controlCard = makeControlCard(data)
    
                allControllersCont.innerHTML += controlCard 
                // allReadMoreBtn.onclick(displayReadMore)
            } 
        }
    })
    .catch(err => console.log(err))
} 

function createCommentCard(control) {
    const commentCard = `
    <section class="commentHolder">
   <p class="commenter"> ${control.commenter} </p>
   <p class="controller-name"> ${control.name} </p>
   <p class="comment"> ${control.comment} </p>
   </section>
`
    return commentCard
}


function displayComments() {

    axios.get('/controllers/comments')
    .then(res => {
        allCommentCon.innerHTML = ''

        const controllerId = controlId.innerHTML

  for(let i = 0; i < res.data.length; i++) {
      if(res.data[i].control_id == controllerId) {
        const data = res.data[i]

        const controlCard = createCommentCard(data)
        allCommentCon.innerHTML += controlCard

      }
  }
    })
    .catch(err => console.log(err))
}

function postComment(e) {
  e.preventDefault()

  if(commentInput.value < 1) {
    alert('Must enter Comment!')
    return
  } 

  const controllerId = controlId.innerHTML

  let bodyObj = {
    controlId: +controllerId,
    comment: commentInput.value,
    commenter: commenterName.value,
  }

  axios.post("/postcomments", bodyObj)
  .then((res) => {

    displayComments()
    postForm.reset()
  })
  .catch(err => console.log(err))
}

function displayReadMore() {
    axios.get("/controllers/large")
    .then (res => {
        smallInfoText.style.display = "none"
        readMoreBtn.style.display = "none"
        nextBtn.style.display = "none"
        yearDiv.style.display = "block"
        largeInfo.style.display = "block"

        commentSection.style.display = "flex"
        controlContainer.style.display = "flex"
        bgControlerContainer.style.display = "flex"

        // controlId.innerHTML = ''
        // largeInfo.innerHTML = ''
        // yearDiv.innerHTML = ''
        // controlImage.src = ''
        
        const control = controlName.innerHTML 
console.log(control)

        for(let i = 0; i < res.data.length; i++){
            if(res.data[i].name === control) {
                 const data = res.data[i]  

                 controlId.innerHTML = ''
                 largeInfo.innerHTML = ''
                 yearDiv.innerHTML = ''
                 controlImage.src = ''

                 const name = data.name
                 const id = data.control_id
                 const info = data.info_large
                 const image = data.imageurl
                 const year = data.year

                 controlName.innerHTML = name
                 controlId.innerHTML = id
                 largeInfo.innerHTML = info
                 yearDiv.innerHTML = year
                 controlImage.src = image

                 commentSection.style.display = "flex"
                 controlContainer.style.display = "flex"
                 bgControlerContainer.style.display = "flex"
                 displayComments()
            }
        }
    })
    .catch(err => console.log(err))
}

// function displayReadMoreAll() {
//     axios.get("/controllers/large")
//     .then (res => {
//         smallInfoText.style.display = "none"
//         readMoreBtn.style.display = "none"
//         nextBtn.style.display = "none"
//         yearDiv.style.display = "block"
//         largeInfo.style.display = "block"
        
//         const control = allControlName.innerHTML 
// console.log(control)

//         for(let i = 0; i < res.data.length; i++){
//             if(res.data[i].name === control) {
//                  const data = res.data[i]  

//                  controlId.innerHTML = ''
//                  largeInfo.innerHTML = ''
//                  yearDiv.innerHTML = ''
//                  controlImage.src = ''

//                  const name = data.name
//                  const id = data.control_id
//                  const info = data.info_large
//                  const image = data.imageurl
//                  const year = data.year

//                  controlName.innerHTML = name
//                  controlId.innerHTML = id
//                  largeInfo.innerHTML = info
//                  yearDiv.innerHTML = year
//                  controlImage.src = image

//                  commentSection.style.display = "flex"
//                  controlContainer.style.display = "flex"
//                  bgControlerContainer.style.display = "flex"
//                  displayComments()
//             }
//         }
//     })
//     .catch(err => console.log(err))
// }

hpInfo()

postForm.addEventListener('submit', postComment)
allBtn.addEventListener('click', displayAllControls)
playBtn.addEventListener('click', displayBrandControls)


for(let i = 0; i < controlBrand.length; i++) {
    controlBrand[i].addEventListener('click', displayBrandControls)
}

for(let i = 0; i < allReadMoreBtn.length; i++) {
    allReadMoreBtn[i].addEventListener('click', displayReadMore)
}


// nextBtn.addEventListener('click', nextBtnFunc)