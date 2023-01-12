import React, { useEffect, useState } from "react"; 

export default function Meme(){

    const[meme, setMeme] = useState(
        {
            topText:"",
            bottomText:"",
            randomImage:"http://i.imgflip.com/1bij.jpg" 
        }
    )
    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        async function getMemes(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    },[])

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }

    function getMemeImage(){
        const randomImage = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomImage].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage : url
        }))
    }
    return(
        <main>
            <div className="form">
               <input 
                 type="text"
                 placeholder="Top Text"
                 name="topText"
                 onChange={handleChange}
                 value={meme.topText}
                 className="form--input"
               />
               <input 
                 type="text"
                 placeholder="Top Text"
                 name="bottomText"
                 onChange={handleChange}
                 value={meme.bottomText}
                 className="form--input"
               /> 
               <button 
                 className="form--button"
                 onClick={getMemeImage}>Get Random Images
               </button>
            </div>
            <div className="meme">
                <img
                  alt=""
                  src={meme.randomImage}
                  className="meme--image"
                />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}