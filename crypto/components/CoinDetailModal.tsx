'use client'
import React from 'react'

export default function CoinDetailModal({ coin, onClose }:{ coin:any, onClose:()=>void }){
  if(!coin) return null
  return (<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-lg w-96 relative">
      <button onClick={onClose} className="absolute top-2 right-2">X</button>
      <div className="flex items-center space-x-2 mb-4">
        <img src={coin.image} alt="" className="w-8 h-8" />
        <h2 className="text-lg font-semibold">{coin.name} ({coin.symbol.toUpperCase()})</h2>
      </div>
      <p>Price: ${coin.current_price}</p>
      <p>24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>

      <p>Market Cap: ${coin.market_cap?.toLocaleString()}</p>
      <p>Volume: ${coin.total_volume?.toLocaleString()}</p>
    </div>
  </div>)
}
