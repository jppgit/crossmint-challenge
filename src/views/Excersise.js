import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import FirstChallenge from "../Challenges/firstChallenge";
import SecondChallange from "../Challenges/secondChallange";

import ResolutionHelper from "../components/ResolutionHelper";

function Excesersise() {
  const params = useParams();
  const [showChallege, setShowChallenge] = useState();

  const challengeRef = useRef();
  useEffect(() => {
    setShowChallenge(params.ID);
  }, [params?.ID]);
  return (
    <div className="excercise">
       <div className="log-helper">
        <ResolutionHelper domBoardRef={challengeRef}></ResolutionHelper>
      </div>
      <div className="boards-matrix">
        {showChallege === "1" && (
            <FirstChallenge refo={challengeRef}></FirstChallenge>
        )}

        {showChallege === "2" && (
            <SecondChallange refo={challengeRef}></SecondChallange>
        )}
      </div>

     
    </div>
  );
}

export default Excesersise;
