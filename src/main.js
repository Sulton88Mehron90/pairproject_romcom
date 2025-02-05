// Create variables targeting the relevant DOM elements here 👇

var savedCovers = [];
var currentCover;

  // Cover elements:
var coverImage = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var tagline1 = document.querySelector(".tagline-1");
var tagline2 = document.querySelector(".tagline-2");

  // Control Buttons:
var homeButton = document.querySelector(".home-button");
var randomCoverButton = document.querySelector(".random-cover-button");
var saveCoverButton = document.querySelector(".save-cover-button");
var viewSavedCoversButton = document.querySelector(".view-saved-button");
var makeYourOwnCoverButton = document.querySelector(".make-new-button");

  // Views:
var homeView = document.querySelector(".home-view");
var formView = document.querySelector(".form-view");
var savedView = document.querySelector(".saved-view");
var savedCoverSection = document.querySelector(".saved-covers-section");

  // Form elements:
var userInputCover = document.querySelector(".user-cover");
var userInputTitle = document.querySelector(".user-title");
var userInputDesc1 = document.querySelector(".user-desc1");
var userInputDesc2 = document.querySelector(".user-desc2");
var makeMyBookButton = document.querySelector(".create-new-book-button");

// Add your event listeners here 👇

  // Generate random covers:
window.addEventListener("load", getRandomCover);
randomCoverButton.addEventListener("click", getRandomCover);

  // Change views:
makeYourOwnCoverButton.addEventListener("click", viewMakeYourOwnCover);
viewSavedCoversButton.addEventListener("click", viewSavedCovers);
homeButton.addEventListener("click", viewHomePage);

  // Make your own cover:
makeMyBookButton.addEventListener("click", makeMyBook);

  // Save & Delete covers:
saveCoverButton.addEventListener("click", saveCover);
savedCoverSection.addEventListener("dblclick", deleteCover);

// Create your event handlers and other functions here 👇

// We've provided two functions to get you started 

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  };
  return cover
};

function getRandomCover() {
  currentCover = createCover(
  covers[getRandomIndex(covers)], titles[getRandomIndex(titles)], descriptors[getRandomIndex(descriptors)], descriptors[getRandomIndex(descriptors)]);

  coverImage.src = currentCover.coverImg
  coverTitle.innerText = currentCover.title
  tagline1.innerText = currentCover.tagline1
  tagline2.innerText = currentCover.tagline2
};

function viewMakeYourOwnCover() {
  formView.classList.remove('hidden');

  homeButton.classList.remove('hidden');
  viewSavedCoversButton.classList.remove('hidden');
  
  homeView.classList.add('hidden');
  savedView.classList.add('hidden');

  saveCoverButton.classList.add('hidden');
  randomCoverButton.classList.add('hidden');
  makeYourOwnCoverButton.classList.add('hidden');
};

function viewHomePage() {
  formView.classList.add('hidden');
  savedView.classList.add('hidden');

  homeView.classList.remove('hidden');

  homeButton.classList.add('hidden');

  randomCoverButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
  viewSavedCoversButton.classList.remove('hidden');
  makeYourOwnCoverButton.classList.remove('hidden');

  savedCoverSection.innerHTML = ``;
};

function makeMyBook(event) {
  event.preventDefault();

  if(!userInputCover.value || !userInputTitle.value || !userInputDesc1.value || !userInputDesc2.value) {
  alert("Error “Please fill out all required fields. Thank you!");
  } else {
    currentCover = createCover(userInputCover.value, userInputTitle.value, userInputDesc1.value, userInputDesc2.value)

    coverImage.src = currentCover.coverImg
    coverTitle.innerText = currentCover.title
    tagline1.innerText = currentCover.tagline1
    tagline2.innerText = currentCover.tagline2

    pushValuesToArray();

    viewHomePage();

    document.querySelector("form").reset();
  };
};

function pushValuesToArray() {
  covers.push(userInputCover.value);
  titles.push(userInputTitle.value);
  descriptors.push(userInputDesc1.value);
  descriptors.push(userInputDesc2.value);
};


function viewMakeYourOwnCover() {
  homeView.classList.add('hidden');
  savedView.classList.add('hidden');

  formView.classList.remove('hidden');

  saveCoverButton.classList.add('hidden');
  randomCoverButton.classList.add('hidden');

  homeButton.classList.remove('hidden');
  makeYourOwnCoverButton.classList.remove('hidden');
  viewSavedCoversButton.classList.remove('hidden');
};

function saveCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
    displaySavedCovers(); 
  } else {
    alert("This RomCom Cover has already been saved!");
  }; 
}

function viewSavedCovers() {
  homeView.classList.add('hidden');
  formView.classList.add('hidden');

  homeButton.classList.remove('hidden');
  makeYourOwnCoverButton.classList.remove('hidden');

  randomCoverButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  viewSavedCoversButton.classList.add('hidden');

  savedView.classList.remove('hidden');

  savedCoverSection.innerHTML = '';
  displaySavedCovers();
};

function displaySavedCovers() {
  for (var i = 0; i < savedCovers.length; i++) {
    savedCoverSection.innerHTML += 
    `
    <section class="mini-cover">
      <img class="cover-image" id="${savedCovers[i].id}" src="${savedCovers[i].coverImg}" alt="miniature RomCom cover">
      <h2 class="cover-title">${savedCovers[i].title}</h2>
      <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
      <img class="price-tag" src="./assets/price.png">
      <img class="overlay" src="./assets/overlay.png">
    </section>
    `
  };
};

function deleteCover(event) {
  var coverId = event.target.id;
  for(var i = 0; i < savedCovers.length; i++) {
    if(coverId === `${savedCovers[i].id}`) {
      savedCovers.splice(i, 1);
    };
  };
  viewSavedCovers();
};