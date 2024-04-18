import axios from "axios";
import { useEffect, useState } from "react"

const baseURL = "http://localhost:8080/attendance";


const Summary = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
        console.log(response)
        console.log(response.data)
        console.log(response.data.expenses)
        setData(response.data.monthWiseData)
      });
  

  }, [])

  return (
    <div className='summary-container'>
      {
        data.map((item, index) => <div key={index} className='summary-item'>
        <span className='date-span'>{item.monthYear}</span>
        <span className="amount-span">{item.monthlyWorkingHaours}</span>
    </div> )
      }
        

        {/* <div className='month-two'>
            <span className='date-span'>Date</span>
            <span>Amount</span>
        </div>

        <div className='month-three'>
            <span className='date-span'>Date</span>
            <span>Amount</span>
        </div> */}

    </div>
  )
}

export default Summary