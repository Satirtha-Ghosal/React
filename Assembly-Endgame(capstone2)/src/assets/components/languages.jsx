import '../styles/languages.css'

import { useEffect } from 'react'

export default function Languages(props) {

    const inputSlots = props.word?.split("").map((char, index) => {

        return (
            <div className='input' key={index} id={`input-${index}`} type="text" ></div>
        )
    })

    let langs = ["HTML","CSS","JavaScript","React","TypeScript","Node.js","Python","Ruby","Assembly"]

    const farewell = {

    }

    useEffect(() => {
        for (let i = 0; i < props.match.length; i++) {
            if (props.match[i]) {
                document.getElementById(`input-${i}`).textContent = props.word.split("")[i].toUpperCase();
            }
        }
    }, [props.match])

    useEffect(() => {
        if(props.won == false){
            for (let i = 0; i < props.match.length; i++) {
                    document.getElementById(`input-${i}`).textContent = props.word.split("")[i].toUpperCase();
            }
        }
    }, [props.won])

    function newGame(){
        props.setWord("")
        props.setMatch([])
        props.setLangDead(0)
        props.setWon(null)
    }


    console.log(props.word)

    return (
        <>

            <div className={((props.langDead>0)&&(props.won==null)) ? "show" : "hidden"}>"FareWell
                {langs.map((item,index)=>{
                    if(index<props.langDead){
                        if(index==props.langDead-1){
                            return(
                                ` ${item}`
                            )
                        }
                        else{
                            return(
                                ` ${item} &`
                            )
                        }
                    }
                })}
            " 🫡</div>

            <div className={props.won ? "result-won result" : "hidden" }>
                <h5>You Won!</h5>
                <p>Well Done!🎉</p>
            </div>
            <div className={props.won==false ? "result-lost result" : "hidden"}>
                <h5>Game Over</h5>
                <p>You lost! Better start learning Assembly 😭</p>
            </div>

            <div className="languages">
                <button id='html' className={props.langDead >= 1 ? 'dead' : null} data-num='1' >HTML</button>
                <button id='css' className={props.langDead >= 2 ? 'dead' : null} data-num='2' >CSS</button>
                <button id='js' className={props.langDead >= 3 ? 'dead' : null} data-num='3' >Javascript</button>
                <button id='react' className={props.langDead >= 4 ? 'dead' : null} data-num='4' >React</button>
                <button id='ts' className={props.langDead >= 5 ? 'dead' : null} data-num='5' >Typescript</button>
                <button id='node' className={props.langDead >= 6 ? 'dead' : null} data-num='6' >Node.js</button>
                <button id='py' className={props.langDead >= 7 ? 'dead' : null} data-num='7' >Python</button>
                <button id='ruby' className={props.langDead >= 8 ? 'dead' : null} data-num='8' >Ruby</button>
                <button id='asm' className={props.langDead >= 9 ? 'dead' : null} data-num='9' >Assembly</button>
            </div>

            <div className="guess">
                {inputSlots}
            </div>

            <button className={((props.won==true)||(props.won==false)) ? "newGame" : "hidden"} onClick={newGame}>New Game</button>

        </>
    )
}