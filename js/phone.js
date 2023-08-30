//all the global variables
let phones = [];
let phonesDisplay = [];
let phoneContainer = document.getElementById("phone-container");
let showAllBtn = document.getElementById("show-all-btn");
let showDetailsButton = document.querySelector('#show-details-btn');


let loadData = async (searchText = 'iphone') => {
  let result = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  let data = await result.json();
  phones = data.data;

  if (phones.length < 6) {
    showAllBtn.classList.add('hidden');
  }
  phonesDisplay = phones.slice(0,6);
  displayPhones(phonesDisplay);
}

// display phones function
let displayPhones = (phones) => {
  // console.log(phones);
  // clearing container so that it can display whatever is given
  phoneContainer.innerHTML = ''
  phones.forEach(phone => {

    let phoneCard = document.createElement('div');
      phoneCard.innerHTML = `
        <div class="card card-compact bg-gray-100 shadow-xl w-96">
          <figure class="p-4"><img src="${phone.image}" alt="${phone.slug}" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
            
            <!-- Show Details modal -->
            <button id="show-details-btn" class="btn" onclick="handleShowDetails('${phone.slug}')" >Show Details</button>
            
            </div>
          </div>
        </div>      
      `
    phoneContainer.appendChild(phoneCard);
  });
}

// handle search function
let handleSearch = () => {
  let searchField = document.getElementById("search-field");
  let searchText = searchField.value;
  loadData(searchText);
}

// handle show all button
let handleShowAll = () => {
  phonesDisplay = phones;
  displayPhones(phonesDisplay);
  showAllBtn.classList.add('hidden')
}

// handle show details modal
let handleShowDetails = async (id) => {
  let res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  let data = await res.json();
  let phone = data.data;
  // console.log(data.data)
  showPhoneDetails(phone);
}

let showPhoneDetails = (phone) => {
  // display the modal
    // console.log(phone)
  show_details_modal.showModal();
  let modalContainer = document.getElementById("show_details_modal");
  modalContainer.innerHTML = ''
  modalContainer.innerHTML = `
    <form method="dialog" class="modal-box">
      <figure class="p-4">
        <img src="${phone.image}" alt="${phone.slug}" />
      </figure>
      <h2 class="card-title">${phone.name}</h2>
      <p>${phone.slug}</p>
      <!-- it will close the modal -->
      <div class="modal-action">
          <button class="btn">Close</button>
      </div>
    </form>
  `

}
// showDetailsButton.addEventListener('click', () => {
//   my_modal_1.showModal();
// });

loadData();