import React from 'react'
import { useState } from 'react'

function BgChanger() {
    const [color, setColor] = useState("olive");

    return (
        <>
            <div className='w-full h-screen relative' style={{ backgroundColor: color }}>
                <div className="w-full absolute bottom-8 flex items-center justify-center">
                    <div className="p-5 bg-white rounded-xl flex items-center justify-evenly gap-3">
                        <button className="bg-red-500 text-white px-5 py-2 rounded-md" onClick={() => setColor("red")}>Red</button>
                        <button className="bg-green-500 text-white px-5 py-2 rounded-md" onClick={() => setColor("green")}>Green</button>
                        <button className="bg-yellow-500 text-white px-5 py-2 rounded-md" onClick={() => setColor("yellow")}>Yellow</button>
                        <button className="bg-pink-500 text-white px-5 py-2 rounded-md" onClick={() => setColor("pink")}>Pink</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BgChanger