import { TextField, MenuItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { inputStyle, menuItemStyle } from "../../../styles/styles";

const SelectField = ({ label, name, value, onChange, options }) => {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <TextField
        select
        fullWidth
        label={`Select ${label}`}
        name={name}
        value={value}
        onChange={onChange}
        sx={{ ...inputStyle, mb: 2 }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} sx={menuItemStyle}>
            {option === "select" ? "Select" : option}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectField;
