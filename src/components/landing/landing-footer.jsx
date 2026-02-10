/**
 * Landing page footer
 */
export default function LandingFooter() {
  return (
    <footer className="border-t border-white/5 py-12 bg-navy-900 relative z-10 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-xl tracking-tight text-white">Nutri-Tech</span>
      </div>
      <p className="text-gray-500 text-sm">Empowering Nigerian Students to Eat Smart.</p>
      <p className="text-gray-600 text-xs mt-4">© 2024 Nutri-Tech. All rights reserved.</p>
    </footer>
  );
}
