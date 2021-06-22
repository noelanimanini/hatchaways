import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [word, setData] = useState("");
  const [pressed, setPressed] = useState(false);

  let array = [];
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/sentences/1")
      .then((response) => response.json())
      .then((data) => reportWord(data));
  }, []);

  const reportWord = (data) => {
    for (let ele in data) {
      setData(data[ele]["sentence"]);
    }
  };

  const scrambleWord = () => {
    let result = word.split(" ");
    let scram;
    let result2;
    let first;
    let last;
    for (let i = 0; i < result.length; i++) {
      if (result[i].length > 2) {
        first = result[i][0];
        last = result[i][[result[i].length - 1]];

        scram = result[i].slice(1, -1);
        result2 = scram.split("").sort(() => {
          return 0.5 - Math.random();
        });

        result2.unshift(first);
        result2.push(last);

        array.push(result2.join(""));
      } else {
        array.push(result[i]);
      }
    }
  };

  scrambleWord();
  let count = array.join(" ").split("");
  let counter = {};
  for (let i = 0; i < count.length; i++) {
    counter[count[i]] = (counter[count[i]] || 0) + 1;
  }

  const handleKeyPress = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <div className="background" id="scrambled-word">
        <div className="words">
          {array.map((x) => (
            <div>
              {" "}
              <h1>{x} </h1>
            </div>
          ))}
        </div>
        <div className="sentence">
          <h2>
            Guess the sentence! Start typing. The yellow blocks are meant for
            spaces{" "}
          </h2>
        </div>
        <h1>Score: 0</h1>

        <ul className="keyboard">
          {Object.keys(counter).map((x) => {
            if (x === " ") {
              return (
                <li>
                  <input
                    answer={x}
                    type="text"
                    id="text"
                    onKeyPress={(e) => handleKeyPress(e)}
                    maxLength="1"
                  ></input>
                </li>
              );
            } else {
              return <li value={x} onKeyPress={(e) => handleKeyPress(e)}></li>;
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
