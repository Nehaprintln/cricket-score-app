// import React, {useState} from 'react'

// export default function AdminView({socket}) {
//     const [score, setScore] = useState({ runs: 0, wickets: 0, over: 0, ball: 0 });

//     const updateScore = async (runs) => {
//       try {
//         // console.log({runs})
//         const response = await fetch('/api/scores/update', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             runs,
//             ball: score.ball,
//             over: score.over,
//             wickets: score.wickets,
//           }),
//         });
  
//         if (response.ok) {
//           const updatedScore = await response.json();
//           setScore(updatedScore);
//           socket.emit('scoreUpdate', updatedScore);
//         } else {
//           console.error('Failed to update score');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
  
//     return (
//       <div>
//         <h1>Admin View</h1>
//         <p>
//           Runs: {score.runs} / Wickets: {score.wickets} | Over: {score.over}.{score.ball}
//         </p>
//         <div>
//           <button onClick={() => updateScore(1)}>1 Run</button>
//           <button onClick={() => updateScore(4)}>4 Runs</button>
//           <button onClick={() => updateScore(6)}>6 Runs</button>
//           <button onClick={() => updateScore(0)}>Out</button>
//         </div>
//       </div>
//     );
// }
