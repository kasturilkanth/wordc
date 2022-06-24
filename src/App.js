import { useEffect, useState } from "react";
import Instructions from "./components/Instructions";
import Keyboard from "./components/Keyboard";
import Leaderboard from "./components/Leaderboard";
import Scoreboard from "./components/Scoreboard";
import WordsList from "./components/WordsList";
import useGameRules from "./hooks/useGameRules";
import("./styles/gameboard.css");

function App() {
  const [isLoggingKeys, setIsLoggingKeys] = useState(false);

  const {
    wordStack,
    stackWordIndex,
    startTimer,
    isGameEnded,
    checkForCharMatch,
    nextChar,
    score,
    delay,
    isMistype,
    pressedChar,
    setPressedChar,
    multiplier,
  } = useGameRules();

  function startGame() {
    startTimer();
    setIsLoggingKeys(true);
  }

  useEffect(() => {
    function handleKeyUp(e) {
      if (e.key !== " ") {
        checkForCharMatch(e.key);
        setPressedChar(e.key);
      }
    }

    function handleKeyDown(e) {
      setPressedChar("");
    }
    if (isLoggingKeys && !isGameEnded) {
      document.addEventListener("keyup", handleKeyUp);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLoggingKeys, isGameEnded]);

  if (isLoggingKeys && !isGameEnded) {
    return (
      <div className="GameBoard">
        <Scoreboard multiplier={multiplier} score={score} delay={delay} />
        <WordsList stack={wordStack} currentIndex={stackWordIndex} />
        <Keyboard
          nextChar={nextChar}
          pressedChar={pressedChar}
          isMistype={isMistype}
        />
      </div>
    );
  } else if (isGameEnded) {
    return <Leaderboard finalScore={score} />;
  } else {
    return <Instructions startGame={startGame} />;
  }
}

export default App;