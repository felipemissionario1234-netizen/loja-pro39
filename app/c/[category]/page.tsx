export default async function Category({ params }:{params:{category:string}}){
  const res = await fetch('/products.json', { next: { revalidate: 60 } });
  const products = await res.json();
  const list = params.category === 'todos' ? products : products.filter((p:any)=> p.category === params.category);
  return (<section className="container py-8">
    <h2 className="text-2xl font-extrabold mb-4">Categoria: {params.category}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {list.map((p:any)=>(
        <a key={p.slug} href={`/p/${p.slug}`} className="card">
          <img src={p.image} alt={p.name} className="rounded-xl aspect-square object-cover mb-2"/>
          <div className="text-sm text-neutral-500">{p.brand}</div>
          <div className="font-bold">{p.name}</div>
          <div className="text-orange-700 font-extrabold">R$ {p.price.toFixed(2)}</div>
        </a>
      ))}
    </div>
  </section>)
}
