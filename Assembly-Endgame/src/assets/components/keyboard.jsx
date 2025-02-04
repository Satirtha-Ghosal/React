import '../styles/keyboard.css'

import { useEffect, useRef } from 'react';

export default function Keyboard(props){

    const keyRefs = useRef([]);

    useEffect(() => {
        if (props.won == null) {
            keyRefs.current.forEach((key) => {
                if (key) key.style.backgroundColor = "rgb(210, 138, 30)";
            });
        }
    }, [props.won]);


    function handleClick(event){

        let char = event.target.textContent.toLowerCase();
        console.log(char)
        let wordArr = props.word.split("")

        let flag = true
        
        for(let i=0;i<wordArr.length;i++){
            if((char===wordArr[i]) && !(props.match[i])){
                event.target.style.backgroundColor = "#10a85b";
                props.setMatch((prev) => 
                    prev.map((item,index)=>(
                        i == index ? true : item
                    ))
                )
                flag=false
                
            }
        }
        if(flag){
            event.target.style.backgroundColor = "#eb5d49";
            props.setLangDead(prev => prev+1)
        }

    }


    return(
        <>
            <div id="keyboard">
                <ul>
                    {Array.from({ length: 26 }, (_, i) => {
                        const letter = String.fromCharCode(65 + i);
                        return (
                            <li key={letter}>
                                <button
                                    ref={(el) => (keyRefs.current[i] = el)}
                                    onClick={handleClick}
                                    className="key"
                                    disabled={props.won!=null ? true : false}
                                >
                                    {letter}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}