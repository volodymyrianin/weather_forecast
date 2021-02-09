const key = 'zfz4SsIoASuLrncRApJNLtm2GKkpuvWj';

//get weather information

const getWeather = async(cityKey) => {

	const base = `https://dataservice.accuweather.com/currentconditions/v1/`
	const query = `${cityKey}?apikey=${key}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];

}

// get city information
const getCity = async (city) => {

	const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
	const query = `?apikey=${key}&q=${city}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];


};

// console testing
//getCity('poltava')
//	.then(data => {
//		return getWeather(data.Key);
//	}).then(data => {
//		console.log(data);
//	}).catch(err => console.log(err));

