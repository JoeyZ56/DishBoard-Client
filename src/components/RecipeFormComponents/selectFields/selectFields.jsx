import {
  TextField,
  MenuItem,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";
import { inputStyle, menuItemStyle } from "../../../styles/styles";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  helperText,
  required,
}) => {
  return (
    <FormControl fullWidth required={required} error={error} sx={{ mb: 2 }}>
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
            {option === "select" ? `Select ${label}` : option}
          </MenuItem>
        ))}
      </TextField>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
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
