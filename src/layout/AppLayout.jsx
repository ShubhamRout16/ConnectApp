// this layout wraps all the authenticateed pages so the navbar appears everywhere
import Navbar from "@/components/Navbar";
export default function AppLayout({ children }){
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar/>
      <main className="pt-20 max-w-4xl mx-auto px-4">
        {children}
      </main>
    </div>
  );
}