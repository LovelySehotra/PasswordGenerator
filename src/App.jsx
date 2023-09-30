import { useCallback, useEffect, useRef, useState } from 'react'



function App() {
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(6);
  const [password, setPassword] = useState("");

  const passwordref = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);


    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordref.current?.select();
    passwordref?.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password);
  }, [password])
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='bg-black w-full h-screen flex flex-col justify-center items-center'>
      <h1 className='text-white mb-3 font-extrabold'>Welcome to Generate Password</h1>
      <div className='text-white bg-slate-600 rounded-xl w-96 text-center flex flex-col gap-3 h-96 items-center justify-center'>



        <div>
          <input
            type="text"
            className='text-black bg-transparent border  border-black rounded-lg p-2 m-2'
            value={password}
            readOnly
            ref={passwordref}
            placeholder='Password'

          />
          <button
            onClick={copyPassword}
            className='bg-black cursor-pointer p-2 rounded-xl hover:bg-slate-400'>
            Copy
          </button>
        </div>
        <div className='flex flex-col gap-4 '>

          <div className='flex justify-center items-center gap-2'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}

            />
            <label>Length :{" "}{length}</label>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <input
              type="checkbox"


              onChange={(e) => setNumberAllowed((prev) => !prev)}

            />
            <label>Number</label>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <input
              type="checkbox"


              onChange={(e) => setCharAllowed((prev) => !prev)}

            />
            <label>Chararacter</label>
          </div>


        </div>


      </div>
    </div>
  )
}

export default App
