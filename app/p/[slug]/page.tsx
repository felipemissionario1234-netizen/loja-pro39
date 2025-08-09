'use client'
import { useEffect, useState } from 'react'
const CHECKOUT='COLE_AQUI_O_LINK_DO_CHECKOUT'
export default function Product({ params }:{params:{slug:string}}){
  const [item,setItem]=useState<any>(null)
  const [qty,setQty]=useState(1)
  const [size,setSize]=useState('U')
  const [color,setColor]=useState('Padrão')

  useEffect(()=>{
    fetch('/products.json').then(r=>r.json()).then((arr)=>{
      const found = arr.find((p:any)=> p.slug===params.slug)
      if(found){ setItem(found); setSize(found.sizes?.[0]||'U'); setColor(found.colors?.[0]||'Padrão') }
    })
  },[params.slug])

  function buy(){
    if(!item) return
    if(CHECKOUT.includes('COLE_AQUI')){ alert('Configure o link de checkout'); return }
    const usp = new URLSearchParams({ sku: item.sku, qty: String(qty), size, color })
    window.open(CHECKOUT + (CHECKOUT.includes('?') ? '&' : '?') + usp.toString(), '_blank')
  }

  if(!item) return <div className="container py-10">Carregando...</div>

  return (<section className="container py-8 grid md:grid-cols-2 gap-8">
    <div>
      <img src={item.image} alt={item.name} className="rounded-2xl aspect-square object-cover"/>
      <div className="flex gap-2 mt-2">
        <img src={item.image} className="w-16 aspect-square rounded-xl object-cover"/>
        <img src={item.image} className="w-16 aspect-square rounded-xl object-cover"/>
        <img src={item.image} className="w-16 aspect-square rounded-xl object-cover"/>
      </div>
    </div>
    <div>
      <div className="text-sm text-neutral-500">{item.brand}</div>
      <h1 className="text-3xl font-extrabold">{item.name}</h1>
      <div className="flex items-end gap-3 mt-2">
        <div className="line-through text-neutral-400">R$ {(item.price*1.3).toFixed(2)}</div>
        <div className="text-3xl font-extrabold text-orange-700">R$ {item.price.toFixed(2)} <span className="text-base text-neutral-600 font-bold">no Pix</span></div>
      </div>
      <div className="mt-4 space-y-3">
        <div><div className="font-bold mb-1">Tamanho</div><div className="flex gap-2">{(item.sizes||['U']).map((s:string)=>(
          <button key={s} onClick={()=>setSize(s)} className={`px-3 py-2 rounded-xl border ${size===s?'border-orange-500 bg-orange-50':''}`}>{s}</button>
        ))}</div></div>
        <div><div className="font-bold mb-1">Cor</div><div className="flex gap-2">{(item.colors||['Padrão']).map((c:string)=>(
          <button key={c} onClick={()=>setColor(c)} className={`px-3 py-2 rounded-xl border ${color===c?'border-orange-500 bg-orange-50':''}`}>{c}</button>
        ))}</div></div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setQty(Math.max(1, qty-1))} className="px-3 py-2 border rounded-xl">-</button>
          <input value={qty} onChange={e=>setQty(Math.max(1, Number(e.target.value)||1))} className='w-16 border rounded-xl text-center py-2 font-bold'/>
          <button onClick={()=>setQty(qty+1)} className="px-3 py-2 border rounded-xl">+</button>
        </div>
        <div className="flex gap-2">
          <button onClick={buy} className="btn btn-primary">Comprar agora</button>
          <a className="btn btn-outline" href="/cart">Ver carrinho</a>
        </div>
      </div>
    </div>
  </section>)
}
