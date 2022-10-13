

const allControllersCont = document.querySelector('.allControllers')
const allBtn = document.querySelector('#allBtn')
const playBtn = document.querySelector('#playBtn')
const xboxBtn = document.querySelector('#xboxBtn')
const nintendoBtn = document.querySelector('#nintendoBtn')
makeControlCard()


function displayAllControls() {
    if(window.location === "/controls")
    console.log(1)
    
    axios.get("/controllers/large")
    .then(res => {
        // allControllersCont.innerHTML = ''
        render = res.data
        console.log(2)
        res.data.forEach(control => {
    
            const controlCard = makeControlCard(control)

            allControllersCont.innerHTML += controlCard
        })    
    })
    .catch(err => console.log(err))
} 

allBtn.addEventListener('click', displayAllControls)