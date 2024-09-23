import React, { useState, useRef, useEffect, useContext } from "react";
import "./admin.css";
import { ScoreContext } from "../ScoreComponents/ScoreContext";
import Layout from "../LayoutComponent/Layout";

export default function AdminView() {
  const {score, setScore, wickets, setWickets, over, setOver, currentBall, setCurrentBall, balls,
    setBalls, oversData, setOversData} = useContext(ScoreContext);

  const [showOptions, setShowOptions] = useState(false); // Show options on ball click
//   const [isSticky, setIsSticky] = useState(false);
  const url = "http://localhost:5000";
  const ballOptionsRef = useRef();
  //   console.log({score})
  //   console.log(oversData);

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

  const handleBallClick = async (run, isWicket) => {
    // Update score and wickets based on selection
    const updatedBalls = [...balls, { run, isWicket }]; 

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
      setOversData([...oversData, updatedBalls]);
      setBalls([]); // Reset balls for next over
      setCurrentBall(0); // Reset ball count
      setOver(over + 1); // Move to next over
    } else {
      setBalls(updatedBalls);
      setCurrentBall(currentBall + 1);
    }
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

            setShowOptions(false);
        };
        const handleCurrentBallClick = () => {
            setShowOptions(true); // Show options on click
        };
        
        useEffect(() => {
            function handleClickOutside(event) {
                if (
                    ballOptionsRef.current &&
                    !ballOptionsRef.current.contains(event.target)
                ) {
                    setShowOptions(false); 
                }
            }
            fetchMatchData(); //TODO: 22.
            
            
                // window.addEventListener("scroll", handleScroll); //TODO: scroll
                document.addEventListener("mousedown", handleClickOutside);
                
                return () => {
                    document.removeEventListener("mousedown", handleClickOutside);
                    // window.removeEventListener("scroll", handleScroll); //TODO:
                };
            }, [ballOptionsRef]);
            //   console.log(oversData)
            
            return (
                <Layout>
                <div className="admin">
                    <div className="scroll">
                    <div className="scores-display">
                    <h1 className="scores-wicket-display">{score}/{wickets}</h1>
                
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
                        className={`ball ${balls[i] ? balls[i].isWicket ? "wicket" : `run-${balls[i].run}` : ""} ${i === currentBall ? "active" : ""}`}
                        onClick={() => i === currentBall && handleCurrentBallClick()}
                        >
                            {balls[i] ? (balls[i].isWicket ? "W" : balls[i].run) : "-"}
                        </div>
                        ))}
                        <div style={{ display: "flex", gap: "10px" }}>
                            {[...Array(6)].map((_, i) => {
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

                    {currentBall === 6 && (
                        <button
                        className="over-complete-message"
                        onClick={fetchMatchData}
                        style={{ cursor: "pointer"}}
                        >
                        Update
                        </button>
                    )}

                    {/* Show options when the current ball is clicked */}
                    {showOptions && (
                        <div className="run-ball-display">
                            <p className="ball-para">run scored</p>
                            <div className="ball-options" ref={ballOptionsRef}>
                        {" "}
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
                            ? "#f1361d" 
                            : ball.run === 0
                            ? "white" 
                            : ball.run === 1 || ball.run === 2 || ball.run === 3
                            ? "#b8b7b7" 
                            : ball.run === 4
                            ? "#64dbd1" 
                            : ball.run === 6
                            ? "#119e71" 
                            : "transparent",
                            color: ball.run === 0 ? "black" : "white" 
                            }}
                            >
                            {ball.isWicket ? "W" : ball.run}
                        </div>
                    ))}
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    </Layout>             
  );
}
