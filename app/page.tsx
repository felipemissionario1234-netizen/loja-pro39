export default async function Home(){
  const res = await fetch('/products.json', { next: { revalidate: 60 } });
  const products = await res.json();
  const featured = products.slice(0,12);
  return (<section className="container py-8">
    <div className="rounded-2xl p-8 bg-gradient-to-br from-orange-50 to-white border mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold">Ofertas relâmpago</h1>
      <p className="text-neutral-600">Frete grátis* • Envio em 24h • Compra segura</p>
      <div className="mt-4"><a href="/c/todos" className="btn btn-primary">Ver catálogo</a></div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {featured.map((p:any)=>(
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
