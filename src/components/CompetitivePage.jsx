import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompetitivePage = ({ player, playerId, gamemode }) => {
  const [gamemodeStats, setGamemodeStats] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [hoveredHero, setHoveredHero] = useState(null);
  const [displayedHeroes, setDisplayedHeroes] = useState(5); // Number of heroes to initially display


  useEffect(() => {
    axios.get(`/players/${playerId}/stats/summary/?gamemode=${gamemode}&platform=pc`)
      .then((response) => {
        console.log(response.data)
        setGamemodeStats(response.data);
      })
      .catch((error) => {
        console.log('Error getting player stats summary:', error);
      });

    axios.get(`/heroes`)
      .then((response) => {
        console.log(response.data)
        setHeroes(response.data);
      })
      .catch((error) => {
        console.log('Error getting heroes:', error);
      });
  }, []);

  const handleHeroClick = (heroName) => {
    if (hoveredHero === heroName) {
      setHoveredHero(null); // Close the hero info if it's already open
    } else {
      setHoveredHero(heroName); // Open the hero info if it's closed
    }
  };

  const displayStats = () => {
    if (gamemodeStats.general !== undefined) {
      return (
        <div>
          <div className="game-averages">
            <p>Games Played: {gamemodeStats.general.games_played}</p>
            <p>Games Won: {gamemodeStats.general.games_won}</p>
            <p>Games Lost: {gamemodeStats.general.games_lost}</p>
          </div>
          <div className="hero-stats">
            {Object.keys(gamemodeStats.heroes)
              .sort((heroNameA, heroNameB) => {
                return gamemodeStats.heroes[heroNameB].games_played - gamemodeStats.heroes[heroNameA].games_played;
              })
              .slice(0, displayedHeroes) // Display only the specified number of heroes
              .map((heroName) => {
                const hero = gamemodeStats.heroes[heroName];
                const heroData = heroes.find(heroData => heroData.key === heroName);
                const heroPortraitUrl = heroData ? heroData.portrait : '';

                return (
                  <div className="hero" key={heroName}>
                    <img
                      src={heroPortraitUrl}
                      alt={heroName}
                      onClick={() => handleHeroClick(heroName)}
                    />
                    {hoveredHero === heroName && (
                      <div className="hero-info">
                        <div className="hero-stats">
                          <p>Games Played: {hero.games_played}</p>
                          <p>Games Won: {hero.games_won}</p>
                          <p>Games Lost: {hero.games_lost}</p>
                          <p>KDA: {hero.kda}</p>
                          <p>Win Rate: {hero.winrate}%</p>
                        </div>
                        <div className="hero-average-stats">
                          <h3>Average</h3>
                          <p>Eliminations: {hero.average.eliminations}</p>
                          <p>Deaths: {hero.average.deaths}</p>
                          <p>Damage: {hero.average.damage_done}</p>
                          <p>Healing: {hero.average.healing_done}</p>
                        </div>
                        <div className="hero-total-stats">
                          <h3>Total</h3>
                          <p>Eliminations: {hero.total.eliminations}</p>
                          <p>Assists: {hero.total.assists}</p>
                          <p>Deaths: {hero.total.deaths}</p>
                          <p>Damage: {hero.total.damage}</p>
                          <p>Healing: {hero.total.healing}</p>
                        </div>
                      </div>
                    )}
                    {hero.games_played > 0 && (
                      <div className="progress-bar">
                        <div className="progress" style={{ width: `${hero.winrate}%` }}>{hero.games_won}</div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          {displayedHeroes < Object.keys(gamemodeStats.heroes).length && (
            <button onClick={() => setDisplayedHeroes(Object.keys(gamemodeStats.heroes).length)}>Show More</button>
          )}
        </div>
      );
    }
  };

  return (
    <div className="gamemode-page">
  <div className="gamemode-info">
    <h1>Season {player.competitive.pc.season}</h1>
    <div className="roles-ranks">
      <h2>Damage</h2>
      <div className="rank-tier-container">
        {player.competitive.pc.damage ? (
          <>
            <img src={player.competitive.pc.damage.rank_icon} alt="Damage Rank" />
            <img src={player.competitive.pc.damage.tier_icon} alt="Damage Tier" />
          </>
        ) : (
          <p>No competitive rank available</p>
        )}
      </div>
    </div>
    <div className="roles-ranks">
      <h2>Support</h2>
      <div className="rank-tier-container">
        {player.competitive.pc.support ? (
          <>
            <img src={player.competitive.pc.support.rank_icon} alt="Support Rank" />
            <img src={player.competitive.pc.support.tier_icon} alt="Support Tier" />
          </>
        ) : (
          <p>No competitive rank available</p>
        )}
      </div>
    </div>
    <div className="roles-ranks">
      <h2>Tank</h2>
      <div className="rank-tier-container">
        {player.competitive.pc.tank ? (
          <>
            <img src={player.competitive.pc.tank.rank_icon} alt="Tank Rank" />
            <img src={player.competitive.pc.tank.tier_icon} alt="Tank Tier" />
          </>
        ) : (
          <p>No competitive rank available</p>
        )}
      </div>
    </div>
  </div>
  <div className="gamemode-summary">
    <h1>General</h1>
    {displayStats()}
  </div>
</div>

  );
};

export default CompetitivePage;