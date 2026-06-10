export default function Footer() {
  return (
    <footer className="border-t border-gray-200 p-6 text-center" role="contentinfo">
      <div className="max-w-[900px] mx-auto flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-2 font-serif text-[0.95rem] text-gray-500">
          <img src="/images/logo.png" alt="Blooming Sparrow" className="w-[22px] h-[22px] object-contain" />
          <span>Blooming Sparrow</span>
        </div>
        <p className="text-[0.775rem] text-gray-400">© 2025 Blooming Sparrow. Handcrafted with ♥ in India.</p>
      </div>
    </footer>
  );
}
