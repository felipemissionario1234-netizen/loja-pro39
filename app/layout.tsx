import '../styles/globals.css'
import Link from 'next/link'
export const metadata={title:'Ultra Market 10k Runtime',description:'Marketplace PRO com 10k produtos (runtime fetch)'};
export default function RootLayout({children}:{children:React.ReactNode}){
  return(<html lang="pt-br"><body>
    <header className="border-b bg-white">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-tight">ULTRA MARKET</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/c/todos">Catálogo</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/support">Suporte</Link>
          <Link href="/cart" className="font-bold">🛒 Carrinho</Link>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <footer className="border-t mt-10">
      <div className="container py-8 text-sm text-neutral-600 grid md:grid-cols-3 gap-4">
        <div><div className="font-extrabold">ULTRA MARKET</div><p>CNPJ 00.000.000/0001-00</p></div>
        <div className="space-y-1"><a href="/terms">Termos</a><br/><a href="/privacy">Privacidade</a></div>
        <div>© 2025 — Todos os direitos reservados.</div>
      </div>
    </footer>
  </body></html>)}
