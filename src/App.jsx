import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [specialAllowed, setSpecialAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if (numberAllowed) {
      str += "0123456789";
    }

    if (specialAllowed) {
      str += "!@#$%^&*()_+";
    }

    if(charAllowed){
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, specialAllowed, charAllowed, setPassword]);

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(()=>{
    passwordGenerator();
  }, [numberAllowed, length, charAllowed, specialAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-600">
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="w-full outline-none py-1 px-3"
          placeholder="Select the category and length"
          readOnly
          value={password}
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClip} className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 active:bg-blue-900">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min="8"
            max="100"
            value={length}
            className=""
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="lengthInput">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={(e) => {
              setNumberAllowed((prev) => !prev);
            }}
          />

          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={(e) => {
              setCharAllowed((prev) => !prev);
            }}
          />

          <label htmlFor="numberInput">Characters</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={specialAllowed}
            id="charInput"
            onChange={(e) => {
              setSpecialAllowed((prev) => !prev);
            }}
          />

          <label htmlFor="numberInput">Specials</label>
        </div>
      </div>
    </div>
  );
};

export default App;
