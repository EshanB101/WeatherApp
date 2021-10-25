window.addEventListener('load', ()=>{
    let weatherInfo = document.querySelector('.temp-description');
    let temperature = document.querySelector('.temp-value');
    let timeZone = document.querySelector('.location-timezone'); 
 
    //WEATHER FOR THIMPHU
    let api = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Thimphu?unitGroup=us&key=7MDHK2UMDPXVXZT9E9XS2PFXZ';

    fetch(api)
    .then(response => response.json())
    .then(data => {

        console.log(data.currentConditions)
        //DOM
        const {temp,conditions,icon} = data.currentConditions;
        // temperature.textContent = temp;
        weatherInfo.textContent = conditions;
        timeZone.textContent = data.resolvedAddress;

        farToDeg(temp)
        setIcons(icon, document.querySelector('.icon'))

        //activity suggest
        //[https://github.com/visualcrossing/WeatherApi/blob/master/lang/en.txt] here for all condition
         
        let btn = document.querySelector('.btn')
        btn.addEventListener('click',()=>{
                       
        let display = document.querySelector('.activity')
       if(conditions === 'Drizzle' || conditions === 'Heavy Drizzle' || conditions === 'Light Drizzle'){
        display.innerHTML = `<div class="alert alert-primary">
         Wait for rain to stop and check again!! .
        </div>`
        }else if(conditions === 'Rain' || conditions === 'Heavy Rain' || conditions === 'Light Rain') {
            display.innerHTML = `<div class="alert alert-primary">
             Stay Indoor, drink Coffee, watch Movie .
            </div>`
        }else if(conditions==='Partially cloudy'){
            display.innerHTML = `<div class="alert alert-primary">
        Good day for going out. Hike to buddha Point or Sangaygang.
        </div>`
        }
        else if(conditions==='Clear'){
        display.innerHTML = `<div class="alert alert-primary">
         Good day for a swim or going to town for icecream .
        </div>`
        }
        else if(conditions==='Snow' || conditions==='Heavy Snow' || conditions==='Light Snow'){
        display.innerHTML = `<div class="alert alert-primary">
         Dress warm and go for Snow fight .
        </div>`
        }
        else if(conditions==='Thunderstorms' || conditions==='Hail'){
        display.innerHTML = `<div class="alert alert-primary">
         Bad weather. Stay indoor .
        </div>`
        }
        setTimeout(()=>{
            location.reload()  
        },9000)              
    })
    })

        //farenheit to degree
        function farToDeg(farValue){
            let newTemp = Math.round((farValue -32)*(5/9))
            temperature.textContent = `${newTemp}`;
        }

    //from skycons documentation
    function setIcons(icon, iconID){
        let skycons = new Skycons({"color": "white"});
        let currentIcon = icon.replace(/-/g, "_").toUpperCase();        //replace - with _ cuz icon name in api and uupperCase as in skycons
        skycons.play();
        
        return skycons.set(iconID, Skycons[currentIcon])
    }
})
