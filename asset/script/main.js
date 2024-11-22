//button add Task Btn
const addTaskBtn = document.querySelector(".addTaskBtn");

//Div ouverly
const ouverly = document.querySelector(".ouverly");

//div modal
const modal = document.querySelector("#modal");

// svg de ferme modal
const fermeMoldalSvg = document.querySelector(".fermeModalSvg");

// button add dans add task
const fermeModalBtn = document.querySelector(".fermeModalBtn");

//button sauvegarder
const sauvegarder = document.querySelector("#sauvegarder");

//L'input du title
let title = document.querySelector("#title");

//L'input du decrition
let description = document.querySelector("#description");

//les inputs du type task
const radios = document.querySelectorAll('input[name="task"]');

// div to do
const tasks = document.querySelector(".tasks");

//index du task
let currentIndex = null;

//les div qui contient les name task
const nametask=document.querySelectorAll('.nametask')

// button de ferme modala dafichage data
const fermer = document.querySelector('#fermer')



// tableau du data
let data = [];

//Declaration des function

//Declaration du fonction d'affichage modal
function addTask() {
  ouverly.style.display = "block";
  modal.style.display = "block";
}

//Declaration du fonction de ferme modal
function fermeModal() {
  ouverly.style.display = "none";
  modal.style.display = "none";
}

//Decration du fonction de remlire data
function remplireData(e) {
  e.preventDefault();
  let selectedValue = null;

  radios.forEach((radio) => {
    if (radio.checked) {
      selectedValue = radio.value;
    }
  });

  //validation des inputs
  if (title.value == "" || description.value == "" || selectedValue == null) {
    return;
  }

  let valueInpits = {
    Title: title.value,
    Description: description.value,
    typeTask: selectedValue,
  };
  data.push(valueInpits);

  displayTask();
  localStorageData()
  //ferme modal
  ouverly.style.display = "none";
  modal.style.display = "none";

  title.value = "";
  description.value = "";
}

//declaration du fonction de ouvrir Modal Update
function ouvrirModalUpdat(index) {
  currentIndex = index;
  title.value = data[index].Title;
  description.value = data[index].Description;
  // ouvert du modal pour modifier
  ouverly.style.display = "block";
  modal.style.display = "block";
  fermeModalBtn.style.display = "none";
  fermeMoldalSvg.style.display = "none";
  sauvegarder.style.display = "block";
}

// declaration de fonction de updateData
function updateData() {
  let selectedValue = null;
  console.log(currentIndex);
  if (currentIndex !== null) {
    radios.forEach((radio) => {
      if (radio.checked) {
        selectedValue = radio.value;
      }
    });

    if (title.value == "" || description.value == "" || selectedValue == null) {
      return;
    }
    data[currentIndex] = {
      Title: title.value,
      Description: description.value,
      typeTask: selectedValue,
    };
    displayTask();

    //ferme modal
    ouverly.style.display = "none";
    modal.style.display = "none";

    //renitialisation des champ
    title.value = "";
    description.value = "";
    //renitialisation des  btn
    fermeModalBtn.style.display = "block";
    sauvegarder.style.display = "none";
    localStorageData()
  }
}

//function de delet task
function deletTask(index) {
     data.splice(index,1)
    
    displayTask()
    localStorageData()
}
//l'affichage du detail du task
function afficherDetail(index) {
      // ouvert du modal pour voir les detail
  ouverly.style.display = "block";
  modal.style.display = "block";
  fermeModalBtn.style.display = "none";
  sauvegarder.style.display = "none";
  title.style.display = "none";
  description.style.display = "none";
  fermeMoldalSvg.style.display = "none";
  fermer.style.display = "block";
   nametask.forEach(e=>{
    e.style.display = "none"; 
})
radios.forEach(radio => {
    radio.style.display = "none";        
  });
  //aficher data du task
  document.querySelector('.titleTask').textContent=data[index].Title
  document.querySelector('.descriptionTask').textContent=data[index].Description
  document.querySelector('.nameTaskh6').textContent=data[index].typeTask

  
}
function fermeModalData() {
    //femer le modal 
  ouverly.style.display = "none";
  modal.style.display = "none";
  fermeModalBtn.style.display = "block";
 
  title.style.display = "block";
  description.style.display = "block";
  fermer.style.display = "none";
  fermeMoldalSvg.style.display = "block";
   nametask.forEach(e=>{
    e.style.display = "block"; 
    
})
radios.forEach(radio => {
    radio.style.display = "block";        
  });
 
  //aficher data du task
  document.querySelector('.titleTask').textContent=""
  document.querySelector('.descriptionTask').textContent=""
  document.querySelector('.nameTaskh6').textContent=""
}

// local storage des data
function localStorageData() {
    localStorage.setItem("data", JSON.stringify(data));
}

// initialisation des données locales
function initData() {
    const storedData = localStorage.getItem("data");
    if (storedData) {
        data = JSON.parse(storedData);
        displayTask();
    }
}


function displayTask() {
  tasks.innerHTML = ``;
  //display task
  data.forEach((item, index) => {
    tasks.innerHTML += `
                <div class="task" onclick="afficherDetail(${index})">
                 <h5>${item.Title}</h5>
               <div class="proprieter">
                   <p>${item.typeTask}</p>
                    <div class="updetDelet">
                        <svg class="svg" onclick="ouvrirModalUpdat(${index}), event.stopPropagation();" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                        <svg class="svg" onclick="deletTask(${index}); event.stopPropagation();"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                   </div>
               </div>
           </div>
              
           
       `;
  });
}

//appel des functions

// L'appel du function  d'affichage modal
addTaskBtn.addEventListener("click", addTask);

// L'appel du function  de ferme  modal
fermeMoldalSvg.addEventListener("click", fermeModal);

// L'appel du function  de dissply data
fermeModalBtn.addEventListener("click", remplireData);

//
sauvegarder.addEventListener("click", updateData);

// l'appel du fonction de ferme modal apre l'affichage
fermer.addEventListener('click',fermeModalData)

// Fonction exécutée au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    initData(); // Charge les données stockées
});