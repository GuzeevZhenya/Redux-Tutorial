import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { useReducer, useState } from "react";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

const arr = [];

function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    console.log(state);
    return [
      ...state,
      {
        id: state.length ? state[state.length - 1].id + 1 : 1,
        text: action.input,
        completed: action.checked,
      },
    ];
  }
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, []);

  const addTask = (input, checked) => {
    dispatch({
      type: "ADD_TASK",
      input,
      checked,
    });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onClickAdd={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item key={obj.id} text={obj.text} completed={obj.completed} />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
