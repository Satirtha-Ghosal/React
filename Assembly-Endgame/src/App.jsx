import Header from "./assets/components/header";
import Keyboard from "./assets/components/keyboard";
import Languages from "./assets/components/languages";
import Confetti from 'react-confetti'

import './App.css'
import { useState, useEffect } from "react";


export default function App() {

  const [word, setWord] = useState("");
  const [match, setMatch] = useState([]);
  const [langDead, setLangDead] = useState(0);
  const [won, setWon] = useState(null)

  useEffect(() => {
    if (won == null) {
      fetch('https://random-word-api.vercel.app/api?words=1&alphabetize=true')
        .then(data => data.json())
        .then(data => {
          setWord(data[0])
          setMatch(new Array(data[0].split("").length).fill(false))
        })
    }
  }, [won])

  useEffect(() => {
    if ((match.filter(item => item === true).length === match.length) && (langDead < 8) && (match.length > 0)) {
      setWon(true);
    }
    else if ((langDead == 8)) {
      setWon(false)
    }
    else {

    }
  }, [match, langDead])

  return (
    <>
      <>{won?<Confetti></Confetti>:null}</>
      <Header></Header>
      <Languages word={word} setWord={setWord} match={match} setMatch={setMatch} langDead={langDead} setLangDead={setLangDead} won={won} setWon={setWon} ></Languages>
      <Keyboard word={word} setMatch={setMatch} match={match} setLangDead={setLangDead} won={won} ></Keyboard>
    </>
  )
}