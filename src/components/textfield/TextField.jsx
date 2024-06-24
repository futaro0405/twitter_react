export const TextField = (props) => {
  const { lavel, type, state, setState } = props;

  return (
    <TextField
      variant="outlined"
      required
      fullWidth
      margin="dense"
      type={type}
      label={lavel}
      value={state}
      onChange={event => setState(event.target.value)}
    />
  );
}