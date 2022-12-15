import React from "react";

function SongResult({result}) {
    return (
        <div className="w-3/5 h-[300px] rounded shadow-md hover:shadow-lg flex flex-row space-x-16 p-[30px] m-6 bg-white bg-opacity-80">
            <img src="https://upload.wikimedia.org/wikipedia/en/1/1a/RageAgainsttheMachineRageAgainsttheMachine.jpg" alt="Italian Trulli" 
            className="w-[240px] h-[240px] rounded shadow-md w-full" draggable="false" />
            <div className="flex flex-col items-start">
                <h3 className="font-medium text-3xl">{result.name}</h3>
                {Object.keys(result).map((key, index) => {
                    if (key === "artist") {
                        return <h4 className="pt-2 pb-1">by {result[key]}</h4>
                    } else if (key === "album") {
                        return <h4 className="pb-1">featured in {result[key]}</h4>
                    } else if (key !== "name") {
                        return <h4 className="pb-1">{key}: {result[key]}</h4>
                    }
                })}
            </div>
        </div>
    );
}

export default SongResult;