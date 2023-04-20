// const apiKey = 'dfd5f4589d1bc484a9bb2684e9f84e60';
const form = document.querySelector('form');
const input = document.querySelector('input[name="city"]');
const weatherDiv = document.querySelector('#weather');

form.addEventListener('submit', event => {
  event.preventDefault();
  
  const api_key = "dfd5f4589d1bc484a9bb2684e9f84e60";
  const city = input.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
    .then(response => response.json())
    .then(data => {
      const cityHeading = document.createElement('h2');
      cityHeading.textContent = data.name;

      const tempPara = document.createElement('p');
      const { temperature, description } = convertToCelsius(data.main.temp);
      tempPara.innerHTML = `t: ${temperature} °C`;

      const img = document.createElement('img');
      img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      const descPara = document.createElement('p');
      const weatherMain = data.weather[0].main;
      if (weatherMain === 'Clouds') {
        descPara.textContent = 'Cloudy';
      } else if (weatherMain === 'Clear') {
        descPara.textContent = 'Sunny';
      } else {
        descPara.textContent = ` ${data.weather[0].description}`;
      }

      weatherDiv.innerHTML = '';
      weatherDiv.appendChild(cityHeading);
      weatherDiv.appendChild(tempPara);
      weatherDiv.appendChild(img);
      weatherDiv.appendChild(descPara);
    })
    .catch(error => console.error(error));
});

function convertToCelsius(kelvin) {
  const celsius = kelvin - 273.15;
  const temperature = `${celsius.toFixed(1)} `;
  const description = celsius > 0 ? 'warm' : 'cold';
  return { temperature, description };
}

