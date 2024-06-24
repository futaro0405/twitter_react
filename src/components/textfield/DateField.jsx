export const DateField = (props) => {
  const { label, state, setState } = props;
  return (
    <DateField
      label={label}
      value={state}
      onChange={(newValue) => setState(newValue)}
    />
  );
};