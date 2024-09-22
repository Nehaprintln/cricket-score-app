// import React,{useState, useEffect} from 'react'

// export default function UserView({socket}) {
//     const [score, setScore] = useState({ runs: 0, wickets: 0, over: 0, ball: 0 });

//     useEffect(() => {
//       socket.on('scoreUpdate', (newScore) => {
//         setScore(newScore);
//       });
//     }, [socket]);
  
//     return (
//       <div>
//         <h1>User View</h1>
//         <p>Runs: {score.runs} / Wickets: {score.wickets} | Over: {score.over}.{score.ball}</p>
//       </div>
//     );
// }
