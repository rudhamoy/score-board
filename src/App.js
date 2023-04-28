import './App.css';
import { useState } from 'react';
import Scoreboard from './components/Scoreboard';
import TeamList from './components/TeamList';

function App() {
  const [teams, setTeams] = useState([])
  return (
    <div className="" style={{ maxWidth: '800px', margin: "auto", padding: "20px", display: "flex", justifyContent: "space-evenly" }}>
      <TeamList teams={teams} setTeams={setTeams} />
      <Scoreboard teams={teams} setTeams={setTeams} />
    </div>
  );
}

export default App;
