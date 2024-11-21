//button add Task Btn
const addTaskBtn=document.querySelector('.addTaskBtn')

//Div ouverly
const ouverly=document.querySelector('.ouverly')

//div modal
const modal=document.querySelector('#modal')

// svg de ferme modal
const fermeMoldalBtn=document.querySelector('.fermeModalSvg')






//Declaration des function

//Declaration du fonction d'affichage modal
function addTask() {
   ouverly.style.display= "block";
   modal.style.display= "block";
    
}

//Declaration du fonction de ferme modal
function fermeModal() {
    ouverly.style.display= "none";
    modal.style.display= "none";
}



//appel des functions

// L'appel du function  d'affichage modal
addTaskBtn.addEventListener('click',addTask)

// L'appel du function  de ferme  modal
fermeMoldalBtn.addEventListener('click', fermeModal)