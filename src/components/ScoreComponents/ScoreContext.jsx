import React from 'react'
import { Children, createContext, useState } from "react";

export const ScoreContext = createContext();


export default function ScoreProvider({children}) {

    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [over, setOver] = useState(0); // current over
    const [currentBall, setCurrentBall] = useState(0); // current ball in over
    const [balls, setBalls] = useState([]); // Store data for balls in current over
    const [oversData, setOversData] = useState([]); // Store data for all overs

  return (
    <ScoreContext.Provider value={{
        score, setScore,
        wickets, setWickets,
        over, setOver,
        currentBall, setCurrentBall,
        balls, setBalls,
        oversData, setOversData
    }}>
        {children}
    </ScoreContext.Provider>
  )
}
