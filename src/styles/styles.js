export const inputStyle = {
  backgroundColor: "#FFF",
  mb: 2,
  "& .MuiOutlinedInput-root fieldset": { borderColor: "black" },
  "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "black" },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "black" },
  "& .MuiInputLabel-root": { color: "black" },
  "& .MuiInputLabel-root.Mui-focused": { color: "black" },
};

export const menuItemStyle = {
  "&.Mui-selected": {
    backgroundColor: "#EFEBE9 !important",
    color: "#000",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#FFB300",
  },
  "&:hover": {
    backgroundColor: "#FFC107",
  },
};

export const authStyle = {
  backgroundColor: "#FFF",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "black", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "black", // Border color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "black", // Label color
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black", // Label color when focused
  },
};

export const buttonStyle = {
  backgroundColor: "#FFC107",
  color: "#000",
  "&:hover": { backgroundColor: "#FFB300" },
};

//Box Styles
export const mainBoxStyle = {
  backgroundColor: "#795548",
  minHeight: "100vh",
};
export const wrapBoxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "100%",
  maxWidth: "600px",
  mx: "auto",
  mt: "3rem",
  px: { xs: 2, sm: 3 }, // responsive padding
  py: 3,
  border: "1px solid #ccc",
  backgroundColor: "#FFF3E0",
  borderRadius: 2,
  boxShadow: 3,
  boxSizing: "border-box",
};

export const largeWrapBoxStyle = {
  display: "flex",
  mx: "auto",
  mt: "3rem",
  px: { xs: 2, sm: 3 },
  py: 3,
  border: "1px solid #ccc",
  backgroundColor: "#FFF3E0",
  borderRadius: 2,
  boxShadow: 3,
  boxSizing: "border-box",
};

export const loadingStyle = {
  color: "#FFC107",
};

export const loadingProps = {
  size: 80,
  thickness: 5,
};

//Error message
export const errorMessage = {
  backgroundColor: "#FFF3E0",
  width: "100%",
};
