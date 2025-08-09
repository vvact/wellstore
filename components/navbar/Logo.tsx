import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center justify-center rounded-full bg-black text-white w-8 h-8 md:w-10 md:h-10 font-bold text-lg md:text-xl">
        M
      </div>
      <div className="hidden md:block">
        <div className="font-bold text-lg md:text-xl uppercase tracking-tight">MANWELL</div>
        <div className="text-[10px] uppercase tracking-widest opacity-75">
          Where street meets sleek
        </div>
      </div>
    </Link>
  )
}
