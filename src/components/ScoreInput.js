import React, { useState } from 'react'

const ScoreInput = ({ teams, setTeams, setGameStart, setWinner }) => {

    const [teamScores, setTeamScores] = useState([])
    const [gameRound, setGameRound] = useState(0)

    let gamePoints = {
        A: 5, B: 4, C: 3, D: 2, E: 1, F: 0
    }


    function inputPoint(player, event) {
        setTeams([...teams.map((team) => {
            for (let key of team.players) {
                if (key.name === player) {
                    key.score = event
                }
            }
            return team
        })])
    }

    // convert alphabet to point function
    const pointConverter = (alphaScore) => {
        let point
        if (gamePoints.hasOwnProperty(alphaScore)) {
            point = gamePoints[alphaScore] + gameRound
        }
        return point
    }

    // check if any team has reach 60
    const checkWinner = () => {
        teams.forEach((team, i) => {
            if(team.totalScore >= 20) {
                console.log(team)
                setGameStart(false)
                return team
            }
        })

        return -1
    }
  
    checkWinner()

    let modified
    const nextRoundHandler = () => {
        modified = teams.map((team) => {

            let player1Score = pointConverter(team.players[0].score)
            let player2Score = pointConverter(team.players[1].score)

            let newScore

            // check if player1 and player2 has the same score
            if (player1Score === player2Score) {
                newScore = [player1Score + 1, player2Score + 1]
                team.bonus = 2
            } else {
                newScore = [player1Score, player2Score]
            }

            team.rounds = [...team.rounds, newScore]

            // calculate the total team scores
            if (team.rounds.length) {
                const allPoints = [].concat(...team.rounds)
                team.totalScore = allPoints.reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0)
            }

            return { ...team }

        })

        // save each team and player score of every round.
        setTeamScores(prev => [...prev, modified])

        // clear the score of each player
        const newTeams = teams.map(mod => {
            for (const item of mod.players) {
                item.score = 0
            }
            return { ...mod }
        })

        setTeams(newTeams)

        // increment game round
        setGameRound(gameRound + 1)

    }

    return (
        <>
            <div style={{ display: "flex", gap: 10 }}>
                {teams.map((team, i) => (
                    <div key={i}>
                        {team.players.map((player, i) => (
                            <div key={i}>
                                <input
                                    style={{ width: '50px', border: "1px solid gray" }}
                                    value={player.score}
                                    onChange={(e) => inputPoint(player.name, e.target.value)}
                                />
                                <span>{player.name}</span>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={nextRoundHandler}>Next Round</button>
            </div>
            <div style={{ marginTop: "20px", border: "1px solid gray", padding: "4px" }}>
                {teamScores.map((game, roundIndex) => (
                    <div key={roundIndex}>
                        <p style={{ fontWeight: "bold", textAlign: "center" }}>Round {roundIndex + 1}</p>
                        <div>
                            <p style={{ textDecoration: "underline" }}>Team Score</p>
                            {game.map(item => (
                                <li>{item.name}: {item.totalScore}</li>
                            ))}
                        </div>

                        {/* <div>
                            <p style={{ textDecoration: "underline" }}>Individual Score</p>
                            {game.map(players => {
                                return players.players.map((item, i) => {
                                    return <div>{item.name}: {item.score}</div>
                                })
                            })}
                            
                        </div> */}
                        <div>
                            <p style={{ textDecoration: "underline" }}>Bonus Score</p>
                            {game.map(item => (
                                <li>{item.name}: {item?.bonus}</li>
                            ))}

                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ScoreInput