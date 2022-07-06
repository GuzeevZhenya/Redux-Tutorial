import React, { useState } from 'react'
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const Item = ({ text, completed, id, removeTask, onClickCheckbox }) => {
  const [checked, setChecked] = useState(completed)

  const deleteTask = () => {
    if (window.confirm('Удалить задачу?')) {
      removeTask(id)
    }
  }
  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={completed}
          onClick={() => setChecked(!checked)}
          onChange={() => onClickCheckbox()}
        />
        <Typography className="item-text">{text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={deleteTask}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  )
}
