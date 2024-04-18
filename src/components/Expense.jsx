
const Expense = ({date, inTime, outTime, hours}) => {
  return (
    <div className='expense-box'>
       <div className='description-box'>
            {date}
       </div>
       <div className='amount-box'>
        <span>{inTime}</span>
        <span>{outTime}</span>
        <span>{hours}</span>

       </div>

    </div>
  )
}

export default Expense