function Navbar() {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="flex justify-between items-center px-4 py-5 h-14">

        <div className="font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500"> Manager/&gt;</span>
        </div>

        <button className="text-white bg-green-700 rounded-full flex items-center">
          <span className="font-bold px-4">GitHub</span>
        </button>

      </div>
    </nav>
  )
}

export default Navbar