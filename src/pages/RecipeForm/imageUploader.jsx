import { useState } from "react";
import { Box, Typography } from "@mui/material";

const ImageUploader = ({ handleFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file); // Pass the file to the parent function
      setFileName(file.name); // Display the file name
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
      setFileName(file.name);
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: dragging ? "2px dashed #FFB300" : "2px dashed #CCC",
        backgroundColor: dragging ? "#FFF3E0" : "#FFF",
        color: "#000",
        borderRadius: 2,
        padding: 3,
        textAlign: "center",
        cursor: "pointer",
        transition: "background-color 0.3s, border 0.3s",
      }}
    >
      <Typography variant="h6">
        {fileName
          ? `Selected File: ${fileName}`
          : "Drag & Drop Image Here or Click to Upload"}
      </Typography>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <Box
          sx={{
            backgroundColor: "#FFC107",
            color: "#000",
            padding: "10px 20px",
            borderRadius: 1,
            display: "inline-block",
            marginTop: 2,
            "&:hover": { backgroundColor: "#FFB300" },
          }}
        >
          Browse Files
        </Box>
      </label>
    </Box>
  );
};

export default ImageUploader;
