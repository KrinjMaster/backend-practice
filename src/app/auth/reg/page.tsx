import Link from 'next/link'

const Reg = () => {
  return (
    <main className="text-white font-bold flex h-screen">
      <div className="w-[300px] flex bg-slate-100/20 h-[350px] m-auto text-3xl rounded-lg align-middle justify-center items-center">
        <form className="flex flex-col w-[250px] text-center m-auto">
          <label>Username:</label>
          <input type="text" className="bg-transparent border rounded-lg text-lg"></input>
          <label>Password:</label>
          <input type="text" className="bg-transparent border rounded-lg text-lg"></input>
          <button className="text-zinc-600 bg-white rounded-lg relative bottom-0 mt-5">Log in</button>
          <Link href='/auth' className="text-gray-400 text-sm mt-5 hover:text-white">Go back</Link>
        </form>
      </div>
    </main>
  )
}

export default Reg