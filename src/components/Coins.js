import React ,{useState} from 'react'
import CoinItem from './CoinItem'
import Coin from '../routes/Coin'
import { Link } from 'react-router-dom'

const Coins = (props) => {
    const hasResults = props.coins.length > 0;

  return (
    <div className='container'>
        
        <div>
            <div className='heading'>
                <p>#</p>
                <p className='coin-name'>Coin</p>
                <p>Price</p>
                <p>24h</p>
                <p className='hide-mobile'>Volume</p>
                <p className='hide-mobile'>Market Cap</p>
            </div>

            {hasResults ? (
             props.coins.map((coin) => (
            <Link to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
              <CoinItem coins={coin} />
            </Link>
            ))
            ) : (
            <div className='no-results'>No results found.</div>
            )}
        </div>
    </div>
  )
}

export default Coins