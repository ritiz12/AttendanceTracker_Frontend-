import Expense from './Expense';
import { useEffect, useState } from 'react';
import axios from "axios";

const baseURL = "http://localhost:8080/attendance/hour";
const loginURL = "http://localhost:8080/attendance/logIn";
const logOutURL = "http://localhost:8080/attendance/logOut";

const DetailsMain = () => {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data.attendanceRecords);
    });
  }, []);

  const loginButtonStyle = {
    fontSize: '30px',
    backgroundColor: 'white',
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const disabledButtonStyle = {
    opacity: '0.5',
    cursor: 'not-allowed',
  };

  const handleLogIn = async () => {
    try {
      const response = await axios.post(loginURL);
      console.log("Data saved:", response.data);
      setIsLoggedIn(true); // Update login status
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Status code 500 indicates that the user is already logged in for today
        alert("User is already logged in for today's date.");
      } else {
        console.error("Error saving data:", error);
      }
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await axios.post(logOutURL);
      console.log("Data saved:", response.data);
      setIsLoggedIn(false); // Update login status
      window.location.reload();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const currentDate = new Date(); // Get the current date

  return (
    <div className='details-main'>
      <div className='new-button'>
        {/* Disable login button when logged in */}
        <button style={isLoggedIn ? { ...loginButtonStyle, ...disabledButtonStyle } : loginButtonStyle} onClick={handleLogIn} disabled={isLoggedIn}>Login</button>
        {/* Enable logout button when logged in */}
        <button style={!isLoggedIn ? { ...loginButtonStyle, ...disabledButtonStyle } : loginButtonStyle} onClick={handleLogOut} disabled={!isLoggedIn}>Logout</button>
      </div>
      <div className='expenses-container'>
        {data.map((item, index) => {
          const [loginHours, loginMinutes, loginSeconds] = item.logInTime.split(':');
          const [logoutHours, logoutMinutes, logoutSeconds] = item.logOutTime.split(':');

          const loginTime = new Date(2000, 0, 1, loginHours, loginMinutes, loginSeconds);
          const logoutTime = new Date(2000, 0, 1, logoutHours, logoutMinutes, logoutSeconds);

          const timeDifference = logoutTime.getTime() - loginTime.getTime();
          const hoursDifference = timeDifference / (1000 * 60 * 60);

          // Check if the date of the record is the current date
          const isCurrentDateRecord = loginTime.toDateString() === currentDate.toDateString();

          return (
            <Expense
              key={index}
              date={item.logInDate}
              inTime={item.logInTime}
              outTime={isLoggedIn && isCurrentDateRecord ? null : item.logOutTime}
              hours={hoursDifference.toFixed(2)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DetailsMain;
