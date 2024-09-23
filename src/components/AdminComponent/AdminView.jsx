import React, { useState, useRef, useEffect, useContext } from "react";
import "./admin.css";
import { ScoreContext } from "../ScoreComponents/ScoreContext";

export default function AdminView() {
  // const [score, setScore] = useState(0);
  // const [wickets, setWickets] = useState(0);
  // const [over, setOver] = useState(0); // current over
  // const [currentBall, setCurrentBall] = useState(0); // current ball in over
  // const [balls, setBalls] = useState([]); // Store data for balls in current over
  // const [oversData, setOversData] = useState([]); // Store data for all overs
  const {
    score,
    setScore,
    wickets,
    setWickets,
    over,
    setOver,
    currentBall,
    setCurrentBall,
    balls,
    setBalls,
    oversData,
    setOversData,
  } = useContext(ScoreContext);
  const [showOptions, setShowOptions] = useState(false); // Show options on ball click
//   const [isSticky, setIsSticky] = useState(false);
  const url = "http://localhost:5000";
  // Ref to track ball options for closing it when clicking outside
  const ballOptionsRef = useRef();
  //   console.log({score})
  //   console.log(oversData);
  console.log({ currentBall });
  //   TODO: ======
  const fetchMatchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/scores/match");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setScore(data.score);
      setWickets(data.wickets);
      setOver(data.currentOver);
      setCurrentBall(data.currentBall);
      setBalls(data.overs[data.currentOver]?.balls || []);
      setOversData(data.overs);
    } catch (err) {
      console.error("Error fetching match data:", err);
    }
  };
  // TODO:==========
  // Handle clicks outside of the ball options

  const handleBallClick = async (run, isWicket) => {
    // Update score and wickets based on selection
    const updatedBalls = [...balls, { run, isWicket }]; //TODO: this line added 21.

    if (isWicket) {
      setWickets(wickets + 1);
    } else {
      setScore(score + run);
    }

    // Store ball data
    const newBall = { run, isWicket };
    setBalls([...balls, newBall]);

    // Move to next ball or next over
    if (currentBall === 6) {
      // Over complete
      //setOversData([...oversData, [...balls, newBall]]); // Save over data with current ball
      setOversData([...oversData, updatedBalls]); //TODO: addeted line 21.
      setBalls([]); // Reset balls for next over
      setCurrentBall(0); // Reset ball count
      setOver(over + 1); // Move to next over
    } else {
      setBalls(updatedBalls); //TODO: line added 21.
      setCurrentBall(currentBall + 1); // Move to next ball
    }
    //   TODO: =====
    try {
        const response = await fetch(`http://localhost:5000/api/scores/match`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                score,
                wickets,
                // currentBall: currentBall === 5 ? 0 : currentBall + 1,
                // currentOver: currentBall === 5 ? over + 1 : over,
                currentBall: currentBall + 1,
                currentOver: over,
                balls: updatedBalls,
            }),
        });
        
        const data = await response.json();
        console.log("Match data updated:", data);
    } catch (error) {
        console.error("Error updating match data:", error);
    }
    // fetch(`${url}/api/scores/match`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
            //     score,
            //     wickets,
    //     currentBall: currentBall === 5 ? 0 : currentBall + 1,
    //     currentOver: currentBall === 5 ? over + 1 : over,
    //     balls: updatedBalls
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
        //     console.log('Match data updated:', data);
        // })
        // .catch(error => {
            //     console.error('Error updating match data:', error);
            // });
            // TODO:=====
            // Hide ball options after selection
            setShowOptions(false);
        };
        // TODO: Ball-container ke uper parent div pabana hoga ******************
        // This over ke niche ek parent div banana hoga
        const handleCurrentBallClick = () => {
            setShowOptions(true); // Show options on click
        };
        // const handleScroll = () => {
        //     // Check if the horizontal scroll position is greater than or equal to 20px
        //     if (window.scrollX >= 1) {
        //       setIsSticky(true);
        //     } else {
        //       setIsSticky(false);
        //     }
        //   };
        
        useEffect(() => {
            function handleClickOutside(event) {
                if (
                    ballOptionsRef.current &&
                    !ballOptionsRef.current.contains(event.target)
                ) {
                    setShowOptions(false); // Close options when clicking outside
                }
            }
            fetchMatchData(); //TODO: 22.
            // if (currentBall === 0 && over > 0) {
                //     fetchMatchData();
                // }
                // Bind the event listener
                // window.addEventListener("scroll", handleScroll); //TODO: scroll
                document.addEventListener("mousedown", handleClickOutside);
                
                // Unbind the event listener on cleanup
                return () => {
                    document.removeEventListener("mousedown", handleClickOutside);
                    // window.removeEventListener("scroll", handleScroll); //TODO:
                };
            }, [ballOptionsRef]);
            //   console.log(oversData)
            
            return (
                <div className="admin">
        <div className="scroll">

        <div className="scores-display">
        <h1 className="scores-wicket-display">
        {score}/{wickets}
      </h1>
      {/* <h2>
          Over: {over}.{currentBall}
          </h2> */}
      <h4 className="ovres-display">
        {/* If currentBall is 6, show next over with ball 0 */}
        Over ({currentBall === 6 ? `${over + 1}.0` : `${over}.${currentBall}`})
      </h4>
        </div>
      
<div className="over-run-container">
<div className="balls-container">
        <p className="current-over-title">This Over</p>
        <div className="balls-div">
        {[...Array(6)].map((_, i) => (
          <div
          key={i}
          //   className={`ball ${i === currentBall ? 'active' : ''}`}
          className={`ball ${
              balls[i]
              ? balls[i].isWicket
              ? "wicket"
              : `run-${balls[i].run}`
              : ""
            } ${i === currentBall ? "active" : ""}`}
            onClick={() => i === currentBall && handleCurrentBallClick()} // Show options only for the current ball
            >
            {balls[i] ? (balls[i].isWicket ? "W" : balls[i].run) : "-"}
          </div>
        ))}
       <div style={{ display: "flex", gap: "10px" }}>
  {[...Array(6)].map((_, i) => {
    // Determine the correct suffix for each number
    const suffix =
      i + 1 === 1 ? "st" : i + 1 === 2 ? "nd" : i + 1 === 3 ? "rd" : "th";
      
      return (
          <div key={i} style={{fontSize: '12px', paddingLeft: '10px', color: 'red', marginTop: '-8px'}}>
        {`${i + 1}${suffix} ball`}
      </div>
    );
})}
</div>
        </div>
        
      </div>

      {/* ===================== */}
      {currentBall === 6 && (
          <button
          className="over-complete-message"
          onClick={fetchMatchData}
          style={{ cursor: "pointer"}}
          >
           Update
        </button>
      )}
      {/* ================== */}

      {/* Show options when the current ball is clicked */}
      {showOptions && (
          <div className="run-ball-display"> {/*TODO:*/}
            <p className="ball-para">run scored</p>
            <div className="ball-options" ref={ballOptionsRef}>
          {" "}
          {/*//TODO: working on div*/}
          <button onClick={() => handleBallClick(0, false)}>0</button>
          <button onClick={() => handleBallClick(1, false)}>1</button>
          <button onClick={() => handleBallClick(2, false)}>2</button>
          <button onClick={() => handleBallClick(3, false)}>3</button>
          <button onClick={() => handleBallClick(4, false)}>4</button>
          <button onClick={() => handleBallClick(6, false)}>6</button>
          <button onClick={() => handleBallClick(0, true)}>Out</button>
        </div>
        </div>
        
    )}
</div>
      </div>
 

      {/* Display completed overs */}
      {/* <div className="overs-summary">
  {oversData.map((over, index) => (
    <div key={index}>
    Over {index + 1}: {over.balls.map((ball, i) => (ball.isWicket ? 'W' : ball.run)).join(', ')}
    </div>
    ))}
    </div> */}
      <div className="overs-layout">
        <h4>Over Listings</h4>
        <div className="over-listing">
          <p className="overs-label">Overs</p>
          <p className="runs-label">Runs</p>
        </div>
        <div className="overs-summary">
          {oversData
            .slice(0, -1).reverse().map((over, index) => (
                <div key={index} style={{ display: "flex",justifyContent: 'space-around',gap: '20px', marginBottom: '5px'}}>
                <div style={{ width: "15%",height: '40px',textAlign: 'center',paddingTop: '8px', margin: '6px 0' }}>
                  {oversData.length - 1 - index}
                </div>
                <div style={{ width: "80%",height: '40px',textAlign: 'center',padding: '5px 7px', display: "flex", gap: "10px", border: '1px solid gray', margin: '5px',height: '40px' }}>
                  {over.balls.map((ball, i) => (
                    // TODO:
    //                 <div 
    //                   key={i}
    //                   style={{ display: "flex", alignItems: "center", justifyContent: 'center', width: '35px',
    //                     height: '35px', border:'0.5px solid gray',
    //                     borderRadius: '50%',
    //                     backgroundColor: ball.isWicket
    //   ? "#f1361d" // Red color for wicket
    //   : ball.run === 0
    //   ? "transparent" // White for 0 runs
    //   : ball.run === 1 || ball.run === 2 || ball.run === 3
    //   ? "#b8b7b7" // Gray for 1, 2, 3 runs
    //   : ball.run === 4
    //   ? "#64dbd1" // Blue for 4 runs
    //   : ball.run === 6
    //   ? "#119e71" // Green for 6 runs
    //   : "transparent",
    //                  }}
    //                 >
    //                   {ball.isWicket ? "W" : ball.run}
    //                 </div>
    <div
    key={i}
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "35px",
        height: "35px",
        border: "0.5px solid gray",
        borderRadius: "50%",
        backgroundColor: ball.isWicket
        ? "#f1361d" // Red color for wicket
        : ball.run === 0
        ? "white" // White background for 0 runs
        : ball.run === 1 || ball.run === 2 || ball.run === 3
        ? "#b8b7b7" // Gray for 1, 2, 3 runs
        : ball.run === 4
        ? "#64dbd1" // Blue for 4 runs
        : ball.run === 6
        ? "#119e71" // Red for 6 runs
        : "transparent",
        color: ball.run === 0 ? "black" : "white" // Text color based on run value
    }}
>
  {ball.isWicket ? "W" : ball.run}
</div>
                    //TODO:
                ))}
                </div>
                {/* Over {oversData.length - 1 - index}:  */}
              </div>
            ))}
        </div>
      </div>

      {/* <div className="overs-summary">
          {oversData.map((over, index) => (
            <div key={index}>
            Over {index + 1}: {over.map((ball, i) => (ball.isWicket ? 'W' : ball.run)).join(', ')}
            </div>
            ))}
            </div> */}
    </div>
  );
}
