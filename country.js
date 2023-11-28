let qContainer = document.querySelector(".country-info");
let letters = document.querySelector(".letters");
let countryList = document.querySelector(".countryList");

let mainP = document.querySelector(".text");
let countryData = [];
let countryName = [];



async function fetchData() {
  const response = await fetch(" https://restcountries.com/v3.1/all ");
  const data = await response.json();
  countryData = data;

  for (let i = 0; i < countryData.length; i++) {
    // countryData.sort(function(a,b){ return a[1]-b[1]})
    countryName.push(countryData[i].name.common);
  }
  // console.log(countryName.sort());
//   console.log(getCountryFirstletter());

  // alert(letters[letters.selectedIndex].value);

  const couLetter = getCountryFirstletter();
  for (let i = 0; i < couLetter.length; i++) {
    letters.innerHTML += `<li>${couLetter[i]}</li>`;
  }

  const len = data.length;

  //     qContainer.innerHTML =` <p>The Country Name is ${data[randomNo].name.common} with the population ${data[randomNo].population}</p>
  //    `
  qContainer.innerHTML = ` 
`;
  letters.addEventListener("click", showCountry);
}

function getCountryFirstletter() {
  let soretedCountry = countryName.sort();

  return soretedCountry
    .map((ele) => {
      return ele.slice(0, 1);
    })
    .filter((val, i, ar) => {
      return ar.indexOf(val) == i;
    });
}

function showCountry(event) {
  countryList.innerHTML = "";

  const clickedLetter = event.target.textContent;

  for (let i = 0; i < countryName.length; i++) {
    qContainer.innerHTML = "";
    if (clickedLetter == countryName[i].slice(0, 1)) {
      countryList.innerHTML += `<li>${countryName[i]}</li>`;
    }
  }

  countryList.addEventListener("click", showCountryDetails);
}

function showCountryDetails(event) {
  countryList.innerHTML = "";
  mainP.innerHTML = "";

  const clickedCountry = event.target.textContent;

  for (let i = 0; i < countryData.length; i++) {
    //  qContainer.innerHTML=""
    if (clickedCountry == countryData[i].name.common) {
      let arrLang = Object.values(countryData[i].languages);
      console.log(countryData[i].timezones.length);

      // console.log(countryData[i]);
      qContainer.innerHTML = `   <span id="name">${countryData[i].name.common}</span> 
            <table >
            <tr>
            <td rowspan="2" >    <ul class="detailList">
                <li class="list-item one">Official Name:  ${countryData[i].name.official} </li>
                <li class="list-item two">Capital:  ${countryData[i].capital[0]} </li>
                <li class="list-item two">Continents:  ${countryData[i].continents}</li>
                <li class="list-item two">Languagess:  ${arrLang}</li>
                 <li> <span style="text-align: center;"><a href="${countryData[i].maps.googleMaps}">${countryData[i].name.common} on Google Map</a></span></li>
                
            </ul></td>
            <td class="td-2"> <span id="flag"><img src="${countryData[i].flags.png}" id="flagid" 
                        alt="${countryData[i].flags.alt}"></span>

            </td>
           
        </tr>
        <tr>
            <td >       
             <span class="population"><h3>Population :</h3>${countryData[i].population} </span>
            </td>

        </tr>
     
    </table>
    <table class="timezone">  <tr> <td> Timezones:  ${countryData[i].timezones} </td></tr>  </table>
    `;
    }
  }

  countryList.addEventListener("click", showCountryDetails);
}

function getCountryInfo() {
  const countryInput = document.getElementById("countryInput").value.trim();
  if (countryInput === "") {
    alert("Please enter a country name.");
    return;
  }

  const url = `https://restcountries.com/v3/name/${countryInput}?fullText=true`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 404 || data.length === 0) {
        displayResult("Country not found.");
      } else {
        const country = data[0];
        console.log(country);
        const result = `   <span id="name">${country.name.common}</span> 
                <table >
            <tr>
                <td rowspan="2" >    <ul class="detailList">
                    <li class="list-item one">Official Name:  ${country.name.official} </li>
                    <li class="list-item two">Capital:  ${country.capital[0]} </li>
                    <li class="list-item two">Continents:  ${country.continents}</li>
                    <li class="list-item two">Languagess:  ${country.languages.eng}, ${country.languages.hin},${country.languages.tam} </li>
                    <li class="list-item two">Timezones:  ${country.timezones} </li>
                    <li> <span style="text-align: center;"><a href="${country.maps.googleMaps}">${country.name.common} on Google Map</a></span></li>
                      
                </ul></td>
                <td > <span id="flag"><img src="${country.flags[1]}"
                            alt="${country.flags.alt}"></span>
            
                </td>
            </tr>
            <tr>
                <td >       
                 <span class="population"><h3>Population :</h3>${country.population} </span>
                </td>
            
            </tr>
            </table>
            `; //     <h2>${country.name.common}</h2>
        displayResult(result);
      }
    })
    .catch((error) => {
      displayResult("An error occurred while fetching data.");
      console.error(error);
    });
}

function displayResult(content) {
  // document.getElementById('resultContainer').innerHTML = content;
  qContainer.innerHTML = "";

  qContainer.innerHTML = content;
}
