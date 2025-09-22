'use client'
import CoinsTable from '../components/CoinsTable'
import Highlights from '../components/Highlights'
import CoinDetailModal from '../components/CoinDetailModal'
import { useState } from 'react'

export default function Page(){
  const [selected, setSelected] = useState<any>(null)
  return (<div className="space-y-6">
    <Highlights />
    <CoinsTable onSelect={setSelected} />
    <CoinDetailModal coin={selected} onClose={()=>setSelected(null)} />
  </div>)
}
