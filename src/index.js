console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

function imageLoader(){
    return fetch(imgUrl)
    .then(res => res.json())
    .then(images => addImages(images.message));
}

function addImages(array){
    
    array.forEach(e => {
        
        let image = document.createElement('img');
        image.setAttribute('src', e);
        document.querySelector('#dog-image-container').appendChild(image);
    })
}

function breedLoader(){
    
    fetch(breedUrl)
    .then(res => res.json())
    .then(breeds => {
        const array = Object.keys(breeds.message);
        addBreeds(array)
        filterer(array)
    })
}

function addBreeds(array){

    document.querySelector('#dog-breeds').innerHTML = ''

    array.forEach(e => {
        let p = document.createElement('p');
        p.textContent = e;
        p.addEventListener('click', (e) => {
            e.target.style.color = 'lightgreen'
        })
        document.querySelector('#dog-breeds').appendChild(p);
    })
}

function filterer(array){
    document.querySelector('#breed-dropdown').addEventListener('change', () => {
        const dropDown = document.querySelector('#breed-dropdown');
        const letter = dropDown.value;
        const filtered = array.filter(breed => breed.startsWith(letter));
        addBreeds(filtered);
    })
}

function init(){
    imageLoader();
    breedLoader();
}

document.addEventListener('DOMContentLoaded', init)