import { useEffect } from 'react'
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
    // const newTask = state.filter((item) => item.id !== action.value)
    // return newTask
    return state.filter((item) => item.id !== action.value)
  }

  if (action.type === 'TOGGLE_COMPLETED') {
    return state.map((item) => {
      if (item.id === action.value) {
        return {
          ...item,
          completed: !item.completed,
        }
      }
      return item
    })
  }

  if (action.type === 'SELECT_TASKS') {
    if (action.value) {
      return state.map((item) => {
        return { ...item, completed: true }
      })
    } else {
      return state.map((item) => {
        return { ...item, completed: false }
      })
    }
  }

  if (action.type === 'CLEAR_TASKS') {
    return []
  }

  return state
}

function App() {
  const [state, dispatch] = useReducer(reducer, [])
  const [allCompleted, setAllCompleted] = useState(false)
  const [selectedCheckbox, setSelectedCheckbox] = useState(false)

  useEffect(() => {
    state.every((item) => {
      if (item.completed === true) {
        setSelectedCheckbox(true)
      } else {
        setSelectedCheckbox(false)
      }
    })
  }, [state])

  const addTask = (input, checked) => {
    dispatch({
      type: 'ADD_TASK',
      value: { input, checked },
    })
  }
  console.log(state)
  const removeTask = (id) => {
    dispatch({
      type: 'REMOVE_TASK',
      value: id,
    })
  }

  const toggleComplete = (id) => {
    dispatch({
      type: 'TOGGLE_COMPLETED',
      value: id,
    })
  }

  const clearAllTasks = () => {
    dispatch({
      type: 'CLEAR_TASKS',
    })
  }

  const selectAllTasks = () => {
    dispatch({
      type: 'SELECT_TASKS',
      value: allCompleted,
    })
    setAllCompleted(!allCompleted)
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
              onClickCheckbox={() => toggleComplete(obj.id)}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={selectAllTasks}>
            {selectedCheckbox ? 'Снять отметки' : 'Отметить всё'}
          </Button>
          <Button onClick={clearAllTasks}>Очистить</Button>
        </div>
      </Paper>
    </div>
  )
}

export default App
