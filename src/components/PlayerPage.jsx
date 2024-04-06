import React, { useState } from 'react';
import CompetitivePage from './CompetitivePage.jsx';

const PlayerPage = ({ player, playerId }) => {
  const [gamemode, setGamemode] = useState('competitive');

  return (
    <div className="player-page">
    <div className="player-info">
  <div className="avatar-container">
    <img className="avatar" src={player.avatar} alt="Avatar" />
    <h1>{player.username}</h1>
    <div className="endorsement-container">
      <img className="endorsement" src={player.endorsement.frame} alt="Endorsement Frame" />
    </div>
  </div>
  <p>{player.title}</p>
</div>
    <div className="gamemode-stats">
      <CompetitivePage player={player} playerId={playerId} gamemode={gamemode} />
    </div>
  </div>

  );

}

export default PlayerPage;
