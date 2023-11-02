import React, { useState, useCallback,useEffect,useRef} from "react";

function PasswordGenerator() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharactersAllowed, setSpecialCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  // --------------------------------- //
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
    if (numberAllowed) str += "0123456789";
    if (specialCharactersAllowed) str += "@#$%&?{}[]/!~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length, numberAllowed, specialCharactersAllowed, setPassword]);

  // --------------------------------- //
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(password);
  },[password]);
  // -------------------------------- //
  useEffect(()=>{
    PasswordGenerator();
  },[length,numberAllowed,specialCharactersAllowed,PasswordGenerator])


  return (
    <>
      <div className="m-5 p-4 bg-slate-800" style={{ width: "30rem" }}>
        <h1 className="text-center mb-2">Random Password Generator</h1>
        <div className="w-full flex">
          <input 
            type="text" 
            value={password}
            id="password"
            className="rounded-md p-2 w-full rounded-r-none outline-none bg-black shadow-md shadow-black" 
            readOnly 
            ref={passwordRef}
          />
          <button 
            className="bg-white text-black font-medium px-3 rounded-md rounded-l-none outline-none shrink-0 shadow-md shadow-black hover:shadow-none"
            onClick={copyPasswordToClipboard}
          >COPY</button>
        </div>
        <div className="flex gap-1 justify-evenly mt-2">
          <div className="flex items-center justify-center">
            <input 
              type="range" 
              min={6} 
              max={20} 
              value={length} 
              className="cursor-pointer mr-2" 
              name="range" 
              onChange={(e) => setLength(e.target.value)} 
            />
            <label htmlFor="range">length ({length})</label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              name="numbers"
              className="mr-1"
              defaultChecked={numberAllowed}
              onChange={()=>{setNumberAllowed((prev)=>!prev)}} 
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="flex items-center justify-center">
            <input 
              type="checkbox" 
              name="characters" 
              className="mr-1"
              defaultChecked={specialCharactersAllowed}
              onChange={()=>{setSpecialCharacterAllowed((prev)=>!prev)}}
            />
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default PasswordGenerator;