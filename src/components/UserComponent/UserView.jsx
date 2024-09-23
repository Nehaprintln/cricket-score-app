import React, { useEffect, useContext } from 'react'
import { ScoreContext } from '../ScoreComponents/ScoreContext';
import Layout from '../LayoutComponent/Layout';
// import '../AdminComponent/adnim.css';


export default function UserView() {
    const {score, setScore, wickets, setWickets, over, setOver, currentBall, setCurrentBall, balls, setBalls, oversData, setOversData} = useContext(ScoreContext);

    const fetchMatchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/scores/match');
            const data = await response.json();
            setScore(data.score);
            setWickets(data.wickets);
            setOver(data.currentOver);
            setCurrentBall(data.currentBall);
            setBalls(data.overs[data.currentOver]?.balls || []);
            setOversData(data.overs);
        } catch (err) {
            console.error('Error fetching match data:', err);
        }
    };

    useEffect(() => {
        fetchMatchData();
    }, []);
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
                style={{ cursor: 'default' }}
                //   className={`ball ${i === currentBall ? 'active' : ''}`}
                className={`ball ${balls[i] ? balls[i].isWicket ? "wicket" : `run-${balls[i].run}` : ""} ${i === currentBall ? "active" : ""}`}>
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
