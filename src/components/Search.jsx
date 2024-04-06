import React, {useState} from 'react';

const Search = ({handleSearch, searchResults, setClickPlayer}) => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchData, setSearchData] = useState({
    search: ''
  });

  const handleSearchDropDown = () => {
    if (searchResults.total === 0 && isSearched) {
      return (
        <div className="dropdown">
          <p>No results found</p>
        </div>
      );
    } else if (searchResults.results && isSearched) {
      return (
        <div className="dropdown">
          {searchResults.results.map((result) => (
            <p
              key={result.player_id}
              onClick={() => {
                setClickPlayer(result.player_id);
                setIsSearched(false);
              }}
            >
              {result.name}
            </p>
          ))}
        </div>
      );
    } else {
      return null; // No data available
    }
  };


  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  }

  return (
    <div className="search">
      <input type="text" name="search" value={searchData.search} onChange={(e) => {
        handleSearchChange(e)
      }}>
      </input>
      <button onClick={() => {handleSearch(searchData.search);
      setIsSearched(true);
      }}>
        Search
      </button>
      {handleSearchDropDown()}
    </div>
  )
}

export default Search;