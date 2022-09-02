// load phones from url
const loadPhones = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        data.data.length ? displayPhones(data.data) : showError();

    }
    catch (err) { console.log(err); }
}

// show error
const showError = () => {

    const errField = document.getElementById('err-section');
    errField.classList.remove('d-none');
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

}

// displayphones from json data
const displayPhones = phones => {
    const errField = document.getElementById('err-section');
    errField.classList.add('d-none');
    console.log(phones);

    // phones = phones.slice(0, 5);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    // loop through array
    phones.forEach(element => {

        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        <div class="card p-3">
            <img src="${element.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.
                </p>
            </div>
            <div> 
                <button type="button" onclick="showDetails('${element.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> See Details </button>
        </div>
        `;
        phoneContainer.appendChild(div);
    });
}

// see details after clicking
const showDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data)
    showModal(data.data);

}

// show modal function
const showModal = data => {
    const modalTitle = document.getElementById('modal-title-id');
    modalTitle.innerText = data.name;
}

document.getElementById('search-btn').addEventListener('click', () => {
    const searchText = document.getElementById('search-text').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    loadPhones(url);
})