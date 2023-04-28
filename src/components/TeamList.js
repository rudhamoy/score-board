import React from 'react'

const TeamList = ({ teams }) => {
    return (
        <div style={{borderRight: "1px solid gray"}}>
            <p>Team and Player</p>
            <ul>
                {/* team list */}
                {teams.length > 0 && teams.map(team => (
                    <li style={{padding: '2px', border: "1px solid gray"}}>{team.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default TeamList