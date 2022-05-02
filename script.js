console.log('It is the api website to get the temperature at the given city');
let rough= document.getElementById('rough');

let place;
let latitude;
let longitude;
let weather;
let temp;


let input= document.getElementById('city');
let temperature= document.getElementById('temperature');
let submit= document.getElementById('done');
let container= document.getElementById('container');

input.addEventListener('focusin', function (){
    console.log('the form  is in focus');
    document.addEventListener('keydown', function(e){
        // console.log('It is inside the inpput and key is pressed');
        // console.log(e);
        if (e.key==='Enter')
            console.log('Enter key is pressed');
            // getLatLong();
    })
})

let cityName= input.value;
let apiKey= 'fc80203da81b326a508f73b26f9b742e';
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

submit.addEventListener('click', getLatLong);

function getLatLong(){
    console.log('button is just clicked here!');
    console.log('Trying to get the latitude and longitude of the entered city');
    let geoencode= `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&appid=${apiKey}`;
    console.log(input.value);
    console.log(geoencode);
    fetch(geoencode)
        .then((result) => {
            console.log('the guy from the result tag the expected and the lucky guy')
            result.json()
            .then(data=> {
                place= data;
                console.log(place, 'hello world');
                // console.log('The second line checking if it supports multi line code') and it does that
                latitude= place[0].lat;
                longitude= place[0].lon;
                getTemperature();
            })
        }).catch((err) => {
            console.log(err);
            alert('Some error occured see console for more information');
        });
    }
    
    function getTemperature() {
        let weatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        fetch(weatherUrl)
        .then((result) => {
            console.log('the guy from the result tag the expected and the lucky guy')
            result.json()
            .then(data=> {
                weather= data;
                console.log(weather);
                temp= weather.main.temp;
                temp= temp- 273.1;
                console.log('Your temperature is: ', temp);
                if (!temperature.innerText){
                    temperature.innerHTML = temperature.innerHTML + '  ' + parseInt(temp) + '°C';
                    changeColor(temp)
                }else{
                    temperature.innerHTML='';
                    temperature.innerHTML = temperature.innerHTML + '  ' + parseInt(temp) + '°C';
                    changeColor(temp);

                }
            })
        }).catch((err) => {
            console.log(err)
        });
}

function changeColor(tem) {
    let color;
    
    color= `rgb(${0+(tem*5.1)},0, ${255-(tem*5.1)})`
    container.style.backgroundColor= color;
}

//roght aka for testing purposes
// function Yo(){
//     rough.innerHTML+= <h1>Hello World</h1>
// }


//let yellow and blue component be 80 and 80 repectively. 60 celsius = 255 red value 0 celsius = 0
//at 0 celsius blue be 255 other  0. at  50 celsius red be 255 other 0.