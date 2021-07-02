let addToy = false;

const url = "http://localhost:3000/toys";
// const likeButton = document.getElementsByClassName('like-btn')
// Array.from(likeButton, (element) => {element.addEventListener('click', likeHandler(element))})

document.addEventListener("DOMContentLoaded", () => {
  getToy(url);
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    formSubmit = document.querySelector('.submit')
    formSubmit.addEventListener('click', handleSubmit)
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyCollection = document.querySelector("#toy-collection");
console.log(toyCollection);

function getToy() {
  fetch(url).then(resp => resp.json()).then(data => {
    data.forEach(toy => makeNewToy(toy))
  })
  
};

function makeNewToy (toy) {
  let h2 = document.createElement('h2');
  let image = document.createElement('img');
  let p = document.createElement('p');
  let button = document.createElement('button');
  button.setAttribute('class', 'like-btn')
  button.setAttribute('id', toy.id)
  button.addEventListener('click', likeHandler)
  h2.innerText = toy.name;
  image.setAttribute('src', toy.image);
  p.innerText = toy.likes;
  const toyCollect = document.getElementById('toy-collection')
  const toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')
  toyCard.append(h2, image, p, button)
  toyCollect.append(toyCard)


function likeHandler (e) {
console.log(toy, 'this is the toy we are sending thru fetch')
  fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: toy.id,
    likes: toy.likes ++
  })
  })
  .then(resp => resp.json())
  .then(data => console.log(data, 'this is server response'))
}
};

function handleSubmit(e) {
  e.preventDefault()
  nameInput = document.querySelector('form.add-toy-form input[name="name"]')
  imgInput = document.querySelector('form.add-toy-form input[name="image"]')
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameInput.value,
      image: imgInput.value
    })
  })
  .then(resp => resp.json())
  .then(data => makeNewToy(data))
}