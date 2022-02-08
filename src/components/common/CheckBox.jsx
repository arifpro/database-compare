const CheckBox = ({ title, name, state, setState }) => {
  return (
    <>
      <label>{title}</label>
      <input
        type="checkbox"
        name={name}
        checked={state[name]}
        onChange={(e) =>
          setState({ ...state, [e.target.name]: e.target.checked })
        }
      />
    </>
  );
};

export default CheckBox;
