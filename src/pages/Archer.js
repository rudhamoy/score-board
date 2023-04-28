import React, { useState } from "react";

const CirclePoints = ["5", "4", "3", "2", "1", "0"];
const CircleNames = ["A", "B", "C", "D", "E", "F"];

// function getCircleScore(circle, round) {
//     const index = CircleNames.indexOf(circle);
//     const baseScore = CirclePoints[index];
//     const bonus = round > 1 && circle === previousCircle ? 2 : 0;
//     return parseInt(baseScore) + bonus;
// }

function getIndividualScore(scores, player) {
    return scores.reduce((acc, score) => acc + (score[player] || 0), 0);
}

function getTeamScore(scores, team) {
    return scores.reduce(
        (acc, score) => acc + (score[team[0]] || 0) + (score[team[1]] || 0),
        0
    );
}

function getBonusPoints(scores, team) {
    const teamScores = scores.map((score) =>
        (score[team[0]] === score[team[1]]) ? 2 : 0
    );
    return teamScores.reduce((acc, score) => acc + score, 0);
}

function Archer({ teams, order, rounds }) {
    const [scores, setScores] = useState([]);

    const handleRoundScore = (roundIndex, circle, player, score) => {
        const newScores = [...scores];
        const roundScores = newScores[roundIndex] || {};
        roundScores[player] = score;
        newScores[roundIndex] = roundScores;
        setScores(newScores);
    };

    const handleNextRound = () => {
        const newScores = [...scores];
        const roundScores = newScores[newScores.length - 1];
        const teamScores = Object.keys(teams).map((team) =>
            getTeamScore(newScores, teams[team])
        );
        const winningScore = Math.max(...teamScores);
        const winningTeams = Object.keys(teams).filter(
            (team) => getTeamScore(newScores, teams[team]) === winningScore
        );
        if (winningScore >= 60) {
            alert(`Game over. Winning team(s): ${winningTeams.join(", ")}`);
            return;
        }
        previousCircle = null;
        newScores.push({});
        setScores(newScores);
    };

    let previousCircle = null;

    return (
        <div>
            {/* {scores?.length < order?.length && (
                <button onClick={handleNextRound}>Next Round</button>
            )} */}
            {scores.map((roundScores, roundIndex) => {
                const round = order[roundIndex];
                return (
                    <div key={`round-${roundIndex}`}>
                        <h2>Round {roundIndex + 1}</h2>
                        <h3>Team scores</h3>
                        <ul>
                            {Object.keys(teams).map((team) => (
                                <li key={team}>
                                    {team}: {getTeamScore(scores, teams[team])}
                                </li>
                            ))}
                        </ul>
                        <h3>Individual Scores</h3>
                        <ul>
                            {Object.keys(teams).flatMap((team) =>
                                teams[team].map((player) => (
                                    <li key={`${team}-${player}`}>
                                        {player}:{" "}
                                        {getIndividualScore(scores, player)}{" "}
                                        ({roundScores[player] || 0})
                                    </li>
                                ))
                            )}
                        </ul>
                        <h3>Bonus points</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default Archer