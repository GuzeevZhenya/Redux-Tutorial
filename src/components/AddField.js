import { useState } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AddField = ({ onClickAdd }) => {
  const [input, setInput] = useState();
  const [checked, setChecked] = useState(false);

  console.log(input);

  const addTask = () => {
    onClickAdd(input, checked);
    setInput("");
    setChecked(false);
  };

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={checked}
        onClick={(e)=>setChecked(!checked)}
      />
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите текст задачи..."
        variant="standard"
      />
      <Button onClick={addTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
