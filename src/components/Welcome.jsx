import React, {useState} from 'react';
import Search from './Search.jsx';
import PlayerPage from './PlayerPage.jsx';
import axios from 'axios';
import PersonalProfile from './PersonalProfile.jsx';

const Welcome = ({account, handleProfileLinked}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [player, setPlayer] = useState({});
  const [playerClicked, setPlayerClicked] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [linkedProfile, setLinkedProfile] = useState(false);
  const [profileLink, setProfileLink] = useState('');
  const [profileData, setProfileData] = useState([])
  const [profileLinked, setProfileLinked] = useState(false);

const setClickPlayer = (player) => {
  axios.get(`/players/${player}/summary`)
  .then((data) => {
    console.log(data.data)
    setPlayerId(player)
    setPlayer(data.data)
    setPlayerClicked(true)
    handleProfileLinked(false)
  })
  .catch(() => {
    console.log('Error getting player summary')
  })
}




const handleSetProfile = (link) => { // Receive profile link as a parameter
  axios.get(`/players/${link}/summary`)
    .then((data) => {
      console.log(data.data);
      setProfileData(data.data);
      handleProfileLinked(true);
      setProfileLinked(true);

      axios.put('statswatchUsers/users/update', { email: account.email, player: link })
        .then(() => {
          console.log('Profile linked!');
        })
        .catch(() => {
          console.log('Error linking profile');
        });
    })
    .catch((err) => {
      throw err
      console.log(link)
      alert('No profile found');
    });
};
const handleSubmit = (event) => {
  event.preventDefault();

  handleSetProfile(profileLink); // Pass profileLink as a parameter
};

const handleLinkProfile = () => {

  if (linkedProfile) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={profileLink}
          onChange={(e) => {
            setProfileLink(e.target.value);
            console.log(profileLink);
          }}
        />
      </form>
    );
  }
};


const handleSearchProfile = () => {
  console.log(profileLinked, profileData);

if(account.player) {
  return <PersonalProfile account={account} />
} else if (profileLinked && profileData && playerClicked) {
  return handlePlayerClick();
} else if (profileLinked && profileData && !playerClicked) {
  return <PersonalProfile account={account} />
} else if (!profileLinked && (!profileData || profileData.length === 0)) {
  return (
    <div className="profile">
      <h1 className="welcome-message">Welcome {account.username}</h1>
      <div className="player-personal-profile">
        <p>No profile linked</p>
        <button onClick={() => setLinkedProfile(true)}>Link profile</button>
        {handleLinkProfile()}
      </div>
    </div>
  );
}



  // if (!profileLinked && (!profileData || profileData.length === 0)) {
  //   return (
  //     <div className="profile">
  //       <h1 className="welcome-message">Welcome {account.username}</h1>
  //       <div className="player-personal-profile">
  //         <p>No profile linked</p>
  //         <button onClick={() => setLinkedProfile(true)}>Link profile</button>
  //         {handleLinkProfile()}
  //       </div>
  //     </div>
  //   );
  // } else if (profileLinked && profileData && playerClicked) {
  //   return handlePlayerClick(); // Render player profile
  // } else if (profileLinked || account.player){
  //   return <PersonalProfile account={account} />; // Render personal profile
  // }
};




const handlePlayerClick = () => {
  if (playerClicked) {
    return (
      <PlayerPage player={player} playerId={playerId}/>
    );
  } else {
      return handleSearchProfile();
  }
}

  const handleSearch = (value) => {
    axios.get(`/players`, {params: {name: value}})
    .then((data) => {
      console.log(data.data)
      setSearchResults(data.data)
    })
    .catch(() => {
      console.log('Error getting players')
    })
  }



  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1 onClick={() => {
          setPlayerClicked(false)
        }}>StatsWatch</h1>
      </div>
      <Search handleSearch={handleSearch} searchResults={searchResults} setClickPlayer={setClickPlayer}/>
      {handlePlayerClick()}
    </div>
  );
}

export default Welcome;