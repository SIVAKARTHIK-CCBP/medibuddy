'use client'
import React from 'react'
import useCoins from '../hooks/useCoins'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

export default function Highlights(){
  const { data: top } = useCoins({ page:1, per_page:50, order:'market_cap_desc' })

  const losers = top ? [...top].sort((a:any,b:any)=>(a.price_change_percentage_24h||0)-(b.price_change_percentage_24h||0)).slice(0,5):[]
  const gainers = top ? [...top].sort((a:any,b:any)=>(b.price_change_percentage_24h||0)-(a.price_change_percentage_24h||0)).slice(0,5):[]
  const volume = top ? [...top].sort((a:any,b:any)=>(b.total_volume||0)-(a.total_volume||0)).slice(0,5):[]

  const { data: trending } = useQuery(['trending'], async()=>{
    const res = await api.get('/search/trending')
    return res.data.coins.map((c:any)=>c.item)
  })

  return (<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <Card title="Top Gainers (24h)">{gainers.map((c:any)=>(<Row key={c.id} name={c.name} val={`${c.price_change_percentage_24h?.toFixed(2)}%`} />))}</Card>
    <Card title="Top Losers (24h)">{losers.map((c:any)=>(<Row key={c.id} name={c.name} val={`${c.price_change_percentage_24h?.toFixed(2)}%`} />))}</Card>
    <Card title="Highest Volume">{volume.map((c:any)=>(<Row key={c.id} name={c.name} val={`$${c.total_volume?.toLocaleString()}`} />))}</Card>
    <Card title="Trending">{trending?.map((c:any)=>(<Row key={c.id} name={c.name} val={c.symbol} />))}</Card>
  </div>)
}

function Card({title, children}:{title:string, children:any}){
  return (<div className="bg-white p-4 rounded shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    <ul className="space-y-1 text-sm">{children}</ul>
  </div>)
}
function Row({name, val}:{name:string, val:string}){
  return (<li className="flex justify-between"><span>{name}</span><span>{val}</span></li>)
}
