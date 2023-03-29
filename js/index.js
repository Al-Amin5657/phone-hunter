const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // Display no phone found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    // Display all phones
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
    <div class="card p-4 h-100">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
            Show Details
            </button>
    </div>
  </div>
    `;
        phonesContainer.appendChild(phoneDiv);
    })
    // loading stop
    toggleSpinner(false);

}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field').value;
    loadPhones(searchField, dataLimit);
}

// Handle search btn click
document.getElementById('btn-search').addEventListener('click', function () {
    // Loading start
    processSearch(10)

})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none')
    }

}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    console.log(phone)
    const phoneDetail = document.getElementById('phoneDetailModalLabel').innerText = phone.name;
    const modalBody = document.getElementById('phone-details');
    console.log(phone.mainFeatures.sensors[0])
    modalBody.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'} </p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth found'} </p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage found'} </p>
    <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'No sensor'} </p>

    `
}

loadPhones('apple');