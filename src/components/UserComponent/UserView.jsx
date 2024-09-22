import React, { useEffect, useContext } from 'react'
import { ScoreContext } from '../ScoreComponents/ScoreContext';

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
        <div>
            <h1>Score: {score}/{wickets}</h1>
            <h2>Over: {currentBall === 6 ? `${over + 1}.0` : `${over}.${currentBall}`}</h2>

            <div className="balls-container">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`ball ${i === currentBall ? 'active' : ''}`}
                    >
                        {balls[i] ? (balls[i].isWicket ? 'W' : balls[i].run) : '-'}
                    </div>
                ))}
            </div>

            <div className="overs-summary">
                {oversData.slice(0, -1).reverse().map((over, index) => (
                    <div key={index}>
                        Over {oversData.length - 1 - index}: {over.balls.map((ball, i) => (ball.isWicket ? 'W' : ball.run)).join(', ')}
                    </div>
                ))}
            </div>
        </div>
    );
}
