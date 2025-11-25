// this layout wraps all the authenticateed pages so the navbars appears everywhere
import Sidebar from "@/components/Feed/Sidebar";
import RightSidebar from "@/components/Feed/RightSidebar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex">

      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex w-72 border-r border-white/10">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-10">
        {children}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="hidden lg:flex w-80 border-l border-white/10">
        <RightSidebar />
      </aside>

    </div>
  );
}
