import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material'
import { useReducer, useState } from 'react'
import { AddField } from './components/AddField'
import { Item } from './components/Item'

function reducer(state, action) {
  if (action.type === 'ADD_TASK') {
    return [
      ...state,
      {
        id: state.length ? state[state.length - 1].id + 1 : 1,
        text: action.value.input,
        completed: action.value.checked,
      },
    ]
  }
  if (action.type === 'REMOVE_TASK') {
    const newTask = state.filter((item) => item.id !== action.value)

    return newTask
  }
  return state
}

function App() {
  const [state, dispatch] = useReducer(reducer, [])

  const addTask = (input, checked) => {
    dispatch({
      type: 'ADD_TASK',
      value: { input, checked },
    })
  }

  const removeTask = (id) => {
    dispatch({
      type: 'REMOVE_TASK',
      value: id,
    })
  }

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
            <Item
              key={obj.id}
              text={obj.text}
              id={obj.id}
              completed={obj.completed}
              removeTask={removeTask}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  )
}

export default App
