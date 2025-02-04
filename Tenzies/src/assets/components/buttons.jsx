import '../styles/buttons.css'
import Confetti from 'react-confetti'

import { useState, useEffect, useRef } from 'react'
// import { useWindowSize } from 'react-use'

export default function Buttons(){

    //initalize dice values
    let initValue = new Array(10);
    for (let i=0;i<10;i++){
        initValue[i] = [Math.floor(Math.random() * 10), false]
    }

    //set States
    const[selected, setSelected] = useState(null)
    const[buttons, setButtons] = useState(initValue)
    const[won, setWon] = useState(false)

    let buttonRef = useRef(null)


    //create dice buttons
    const buttonsList = buttons.map((items, index)=>{
        return (
            <li key={index}><button onClick={handleClick} className={buttons[index][1]? 'select': null} id={index}>{items[0]}</button></li>
        )
    })


    //button click handler
    function handleClick(event){

        //get dice button identification
        const click = event.target.id

        //freeze 1st dice
        if (selected === null){
            setSelected(event.target.textContent);
            setButtons(prev =>
                prev.map((item, idx) =>
                    idx === Number(click) ? [item[0], true] : [...item]
                )
            )
        }

        //freeze other dice with same value as of 1st dice
        if(!buttons[click][1] && event.target.textContent==selected){
            setButtons(prev =>
                prev.map((item, idx) =>
                    idx === Number(click) ? [item[0], true] : [...item]
                )
            )
        }

    }


    //change dice values
    function handleRoll(){
        setButtons(prev => 
            prev.map((item, index) => 
                !item[1] ? [Math.floor(Math.random() * 10), false] : [...item]
            )
        )
    }


    //Winning flag
    useEffect(()=>{
        let flag = true

        for(let i=0;i<10;i++){
            if(!buttons[i][1]){
                flag = false
                break
            }
        }

        if(flag){
            setWon(true)
        }
    },[buttons])


    //new game
    function newGame(){
        setButtons(prev => 
            prev.map(() => 
                [Math.floor(Math.random() * 10), false]
            )
        )

        setSelected(null)

        setWon(false)

        buttonRef.current?.focus()
    }

    return(
        <div className="buttons">
        
        <>{won ? <Confetti /> : null}</>
            <ul>
                {buttonsList}
            </ul>
            <button onClick={handleRoll} id='roll' className={won ? 'no' : ''} >Roll</button>
            <div className={won ? '' : 'no'}>You Won</div>
            <button ref={buttonRef} className={won ? '' : 'no'} id='new' onClick={newGame}>New Game</button>
        </div>
    )
    
}