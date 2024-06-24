import {TextField as MUITextField} from "@mui/material"

export const TextField = (props) => {
  const { name, type, label, value, handleChenge } = props;

  return (
    <MUITextField
      name={name}
      type={type}
      label={label}
      value={value}
      onChange={handleChenge}
      required
      fullWidth
      variant="outlined"
      margin="normal"
      InputLabelProps={{ shrink: true }}
    />
  );
}