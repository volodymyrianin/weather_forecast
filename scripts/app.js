const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) =>{

	//const cityDetails = data.cityDetails;
	//const weather = data.weather;

	//destructure

	const { cityDetails, weather } = data;

	// update details template
	details.innerHTML = `
				<h5 class="my-3">${cityDetails.EnglishName}</h5>
				<div class="my-3">${weather.WeatherText}</div>
				<div class="display-4 my-4">
					<span>${weather.Temperature.Metric.Value}</span>
					<span>&deg;C</span>
				</div>
	`;

	// update night and day and icon images
	const iconSrc = `img/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	let timeSrc = null;
	if(weather.IsDayTime){
		timeSrc = 'img/day.png';
	} else {
		timeSrc = 'img/night.png'
	};
	time.setAttribute('src', timeSrc);

	// remove display none class
	if (card.classList.contains('d-none')){
		card.classList.remove('d-none');
	};

};

const updateCity = async (city) => {

	const cityDetails = await getCity(city);
	const weather = await getWeather(cityDetails.Key);

	return {
		cityDetails: cityDetails,     //short hand notation variant if the name and value are the same cityDetails,
		weather: weather    //short hand notation variant if the name and value are the same weather
	};                           // return { cityDetails, weather};

};

cityForm.addEventListener('submit', e => {
	//prevent delault action
	e.preventDefault();

	//get city value
	const city = cityForm.city.value.trim();
	cityForm.reset();

	//update the user`s ui with new city
	updateCity(city)
		.then(data => updateUI(data))
		.catch(err => console.log(err));

});