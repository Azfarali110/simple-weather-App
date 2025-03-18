import { useState } from 'react';
import './App.css';



function App() {
  let [city, setcity] = useState('')
  let [wDetails, setwDetails] = useState()
  let [isloading, setIsloading] = useState(false)
  let getData = (event) => {
    setIsloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric
`)
      .then((res) => res.json())
      .then((finalres) => {
        if (finalres.cod == "404") {
          setwDetails(undefined)
        }
        else {
          setwDetails(finalres)
        }

        setIsloading(false)
      })
    event.preventDefault()
    setcity('')
  }

  return (

    <div className="App">
      <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
        <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather App</h1>

          <form onSubmit={getData} className='flex space-x-0.5'>
            <input type='text' value={city} onChange={(event) => setcity(event.target.value)} placeholder='city Name' className='w-[300px] h-[40px] pl-2' />
            <button className='text-[white] h-[40px] bg-[#006400] w-[100px] gap-[20px]'>Submit</button>
          </form>


          <div className='w-[440px] bg-white shadow-lg-mt-[40px] p-[25px] my-[40px] relative'>


            <div className="flex justify-center items-center">
              <div className={`w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin ${isloading ? '' : 'hidden'}`}></div>
            </div>
            {wDetails !== undefined
              ?
              <>
                <h3 className='font-bold text-[30px]'>
                  {wDetails.name} <span className='bg-[yellow]'>{wDetails.sys.country}</span></h3>
                <h2 className='font-bold text-[30px]'>{wDetails.main.temp}</h2>
                <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} />
                <p>{wDetails.weather[0].description}</p>
              </>
              :
              "No Data"
            }


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
