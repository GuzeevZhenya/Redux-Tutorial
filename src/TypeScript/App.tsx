import React, { useReducer } from "react";

type User = {
  id:number,
  fullName:string,
}

type State = [];

function reducer(state:State, action) {

    return [];
}

function App(){
  const [state] = useReducer(reducer, []);
  return (
    <div>
      <input placeholder="name" />
      <button>Add</button>
      <ul>
        {state.map((obj) => (
          <li></li>
        ))}
      </ul>
    </div>
  );
};

export default App;