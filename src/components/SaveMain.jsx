import axios from "axios";
import { useState } from "react";

const baseURL = "http://localhost:8080/expenses/add";

const SaveMain = () => {

  const[amount, setAmount] =  useState(0);
  const[date, setDate] = useState("");
  const[description, setDescription] = useState("");

  const handleDescChange = (e) => {
    setDescription(e.target.value);
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  const handleSave = async(e) => {
    e.preventDefault();
    console.log(amount, date, description);

    if(description == null || description == ""){
      alert("description is mandatory")
      return
    }

    if(amount == null || amount == 0){
      alert("Amount is mandatory")
      return
    }

    if(date == null || date == ""){
      alert("date is mandatory")
      return
    }

    
    const data = {
      amount: amount,
      date: date,
      description: description
    };


    try {
      const response = await axios.post(baseURL, data);
      console.log("Data saved:", response.data);
      setAmount("")
      setDate("")
      setDescription("")
    } catch (error) {
      console.error("Error saving data:", error);
    }

  }

  return (
    <div className='save-main'>
    <div className='save-button'>
        <span onClick={handleSave}>Save</span>
    </div>
    
    <div className="form-container">
        <input required type="text" name="description" id="desc-field" placeholder="Description (e.g., Amazon Prime Subscription)" value={description} onChange={handleDescChange}/>
        <input required type="number" name="amount" id="amount-field" placeholder="Amount (e.g. 24,000)" value={amount} onChange={handleAmountChange}/>
        <input required type="date" name="date" id="date-field" placeholder="Date (e.g., January 1, 2020)" value={date} onChange={handleDateChange} max={new Date().toISOString().split("T")[0]}/>

    </div>
</div>
  )
}

export default SaveMain