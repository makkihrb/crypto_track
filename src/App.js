import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Routes, Route, useLocation } from 'react-router-dom'
import Coins from './components/Coins';
import Coin from './routes/Coin';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';



function App() {

  

  const [coins, setCoins]= useState([])
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    axios.get(url).then((response)=> {
      setCoins(response.data)
      console.log(response.data[0])
    }).catch((error)=> {
      console.log(error)
      console.log("API Error")
    })
  }, []) 

  const handleSearch = (searchInput) => {

    const filteredResults = coins.filter((coin) => {
      const symbol = coin.symbol;
      const name = coin.name.toLowerCase();
      const search = searchInput.toLowerCase();
      return  name.includes(search) ||  symbol.startsWith(search) || name.startsWith(search) || symbol === search;
    });
    setSearchResults(filteredResults);
    setSearchQuery(searchInput);
  };

  const noResultsFound = searchQuery.length > 0 && searchResults.length === 0;


  return (
    <>
    <Navbar />
    {location.pathname === '/' && <SearchBar onSearch={handleSearch} />}
    <Routes>
    <Route path="/" element={<Coins coins={noResultsFound ? [] : searchResults.length > 0 ? searchResults : coins} />} />
      <Route path='/coin' element={<Coin />}>
        <Route path=':coinId' element={<Coin />} />
      </Route>
    </Routes>
    
    </>
  );
}

export default App;
