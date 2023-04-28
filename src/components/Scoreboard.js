import React, { useState } from 'react'
import ScoreInput from './ScoreInput'

const Scoreboard = ({ teams, setTeams }) => {
    // const [teams, setTeams] = useState([])
    const [teamName, setTeamName] = useState('')
    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')

    const [gameStart, setGameStart] = useState(false)

    const addTeamHandler = (e) => {
        e.preventDefault()
        setTeams((prev) => [...prev, {
            name: teamName,
            players: [{ name: playerOne, score: 0 }, { name: playerTwo, score: 0 }],
            rounds: [],
            totalScore: 0,
        }])

        // clear the input value
        setTeamName('')
        setPlayerOne('')
        setPlayerTwo('')

    }


    return (
        <div>

            {/* input team and player */}


            <div style={{ marginTop: "20px" }}>
                {gameStart === false ? (
                    <>
                        <form>
                            <input placeholder='Enter Team Name' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                            <div>
                                <input placeholder='Input Player One' value={playerOne} onChange={(e) => setPlayerOne(e.target.value)} />
                                <input placeholder='Input Player Two' value={playerTwo} onChange={(e) => setPlayerTwo(e.target.value)} />
                                <button onClick={addTeamHandler}>Submit</button>
                            </div>
                        </form>

                        <div style={{ marginTop: "20px" }}>
                        <button onClick={() => setGameStart(true)}>Start Game</button>
                        </div>

                    </>
                ) : (
                    <ScoreInput teams={teams} setTeams={setTeams} setGameStart={setGameStart} />
                )}
            </div>

        </div>
    )
}

export default Scoreboard