import { useState } from 'react';
import './App.css';

function App() {

  let [city,setcity]= useState('')
  let [wdetails,setwdetails]= useState()

  let getData=(event)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric
`)
.then((res)=>res.json())
.then((finalres)=>{
  if(finalres=="404"){
    setwdetails(undefined)
  }
  else{
    setwdetails(finalres)
  }
  
})
   event.preventDefault()
   setcity('')
  }
  return (
    <div className="App">
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather App</h1>

        <form onSubmit={getData}>
          <input type='text' value={city} onChange={(e)=>setcity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='City Name'/>
          <button className='bg-[#008000] w-[100px] h-[40px]'>Submit</button>
        </form>

        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px]'>


          {wdetails!== undefined
          ?
           <>
          <h3 className='font-bold text-[40px]'>{wdetails.name} <span className='bg-[yellow]'>{wdetails.sys.country}</span></h3>
          <h2 className='font-bold text-[40px]'>{wdetails.main.temp}</h2>
          <img className='block mx-auto' src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`}/>
          <p>{wdetails.weather[0].description}</p>
          </>
          :
          "NO DATA FOUND"
          }
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
