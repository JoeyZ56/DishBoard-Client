import { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

const ImageUploader = ({ setFormData }) => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null); //Store image preview URL
  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setFileName(file.name);

      // Create an object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

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
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
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
      {/* Show Image Preview if available */}
      {previewUrl && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <img
            src={previewUrl}
            alt="Uploaded Preview"
            style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: 8 }}
          />
        </Box>
      )}

      <Typography variant="h6">
        {fileName
          ? `Selected File: ${fileName}`
          : "Drag & Drop Image Here or Click to Upload"}
      </Typography>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
        required
      />

      {/* Clickable Box to Trigger File Input */}
      <Box
        sx={{
          backgroundColor: "#FFC107",
          color: "#000",
          padding: "10px 20px",
          borderRadius: 1,
          display: "inline-block",
          marginTop: 2,
          cursor: "pointer",
          "&:hover": { backgroundColor: "#FFB300" },
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        Browse Files
      </Box>
    </Box>
  );
};

export default ImageUploader;
