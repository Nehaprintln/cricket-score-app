import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
// import AdminView from "./components/AdminView";
// import UserView from "./components/UserView";
// import OverControl from "./components/OverControl";
// import OverListing from "./components/OverListing";


// const socket = io('http://localhost:5000');
const url = "http://localhost:5000";


function App() {
  const [completedOvers, setCompletedOvers] = useState([]);
  const [score, setScore] = useState({ runs: 0, wickets: 0, over: 0, ball: 0 });

  useEffect(() => {
    // Fetch initial score and completed overs here if needed
    // socket.on('scoreUpdated', (newScore) => {
    //   setScore(newScore);
    //   // Update completed overs logic if needed
    // });
  }, []);

  const updateScore = async (runs) => {
    try {
      const response = await fetch(`${url}/api/scores/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          runs: 5,
          ball: score.ball,
          over: score.over,
          wickets: score.wickets,
        }),
      });
      console.log(response);
      const result = await response.json()
      console.log(result);


      if (response.ok) {
        const updatedScore = await response.json();
        // console.log(updatedScore);
        setScore(updatedScore);
        // TODO:
        // socket.emit('scoreUpdate', updatedScore);
        // socket.on('scoreUpdated', (newScore) => {
        //   setScore(newScore);
        //   // Update completed overs logic if needed
        // });
        // TODO:
        // Add logic to handle completed overs if necessary
      } else {
        console.error('Failed to update score');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Cricket Score App</h1>
      <button onClick={updateScore}>run</button>
      {/* <AdminView socket={socket} />
      <OverControl updateScore={updateScore} />
      <OverListing completedOvers={completedOvers} />
      <UserView socket={socket} /> */}
    </div>
  );
}

export default App;
