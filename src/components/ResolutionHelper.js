import {  useState } from "react";
import ParceLib from "../libs/parcerLib";
import HttpClient from "../libs/httpClient.js";

function ResolutionHelper({ domBoardRef }) {

  const [logs, setLogs] = useState([]);
  const [requestBodys, setRequestBodys] = useState([]);
  const [percentageRequest, setPercentageRequest] = useState(0);
  const scanDomTree = () => {
    const ApiRequestsBody = ParceLib.convertDomToMatrix(domBoardRef);
    setRequestBodys(ApiRequestsBody);
    return ApiRequestsBody;
  };

  const progressStatusUpdate = (percentage) => {
    setPercentageRequest(percentage);
  };

  const requestLogs = (log)=>{
    logs.push(log);
    setLogs([...logs]);
  }

  const createMegaverse = async (requestBodys) => {
    const requests = scanDomTree()
    await HttpClient.createAll(
      requests,
      progressStatusUpdate,
      requestLogs
    );
  };

  return (
    <div>
       
      <button
        onClick={() => {
          createMegaverse(requestBodys);
        }}
      >
        Create MegaVerse
      </button>
      <div>
        <progress id="file" value={percentageRequest} max="100">
        </progress>
        <div>
            <ul>
              {logs.map((log)=>{
                return (<li>{log}</li>)
              })}
            </ul>
        </div>
      </div>
     
    </div>
  );
}

export default ResolutionHelper;
