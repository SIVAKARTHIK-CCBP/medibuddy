'use client'
import React, { useState, useMemo } from 'react'
import useCoins from '../hooks/useCoins'
import { debounce } from 'lodash'

export default function CoinsTable({ onSelect }:{ onSelect:(coin:any)=>void }){
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('market_cap_desc')
  const { data, isLoading, isError, refetch } = useCoins({ page, per_page: 20, order: sort, query: search })

  const handleSearch = useMemo(()=>debounce((val:string)=>setSearch(val), 500),[])

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error. <button onClick={()=>refetch()}>Retry</button></div>
  if(!data || data.length===0) return <div>No results</div>

  return (<div className="bg-white rounded shadow p-4">
    <div className="flex items-center justify-between mb-4">
      <input onChange={(e)=>handleSearch(e.target.value)} placeholder="Search" className="border px-3 py-2 rounded w-64"/>
      <select value={sort} onChange={(e)=>setSort(e.target.value)} className="border px-2 py-1 rounded">
        <option value="market_cap_desc">Market Cap ↓</option>
        <option value="market_cap_asc">Market Cap ↑</option>
        <option value="volume_desc">Volume ↓</option>
        <option value="volume_asc">Volume ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="price_asc">Price ↑</option>
        <option value="24h_desc">24h Change ↓</option>
        <option value="24h_asc">24h Change ↑</option>
      </select>
    </div>
    <table className="w-full table-auto">
      <thead className="text-left text-sm text-slate-600">
        <tr><th>#</th><th>Name</th><th>Price</th><th>24h</th><th>Market Cap</th><th>Volume</th></tr>
      </thead>
      <tbody>
        {data.map((c:any, idx:number)=>(
          <tr key={c.id} className="border-t cursor-pointer hover:bg-slate-50" onClick={()=>onSelect(c)}>
            <td className="py-2">{(page-1)*20 + idx + 1}</td>
            <td className="py-2 flex items-center space-x-2">
              <img src={c.image} alt="" className="w-6 h-6" />
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-slate-500">{c.symbol.toUpperCase()}</div>
              </div>
            </td>
            <td className="py-2">${c.current_price.toLocaleString()}</td>
            <td className="py-2">{c.price_change_percentage_24h?.toFixed(2)}%</td>
            <td className="py-2">${(c.market_cap||0).toLocaleString()}</td>
            <td className="py-2">${(c.total_volume||0).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-between mt-4">
      <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 border rounded">Prev</button>
      <div>Page {page}</div>
      <button onClick={()=>setPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button>
    </div>
  </div>)
}
