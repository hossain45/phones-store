//all the global variables
let phones = [];
let phoneContainer = document.getElementById("phone-container");


let loadData = async () => {
  let result = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
  let data = await result.json();
  phones = data.data;
  console.log(phones);
  displayPhones(phones);
}

// display phones function
let displayPhones = (phones) => {
  // console.log(phones);
  let phone = document.createElement('div');
  phoneContainer = ''

  phoneContainer.innerHTML = `
  
  `

}


loadData();