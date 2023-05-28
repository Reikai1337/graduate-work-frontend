import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

import { Box, Button, Typography } from "@mui/material";

type ImageUploaderProps = {
  onUpload: (file: File) => void;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    if (rejectedFiles.length > 0) {
      setError("Invalid file format. Please select an image.");
      setSelectedImage(null);
    } else if (acceptedFiles.length > 0) {
      setError(null);
      setSelectedImage(acceptedFiles[0]);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      onUpload(selectedImage);
      setSelectedImage(null);
      setError(null);
    }
  };

  return (
    <Box>
      <Dropzone onDrop={handleDrop} accept={{ "image/*": [] }} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            style={{ border: "1px dashed gray", padding: "20px" }}
          >
            <input {...getInputProps()} />
            {selectedImage ? (
              <p>Selected image: {selectedImage.name}</p>
            ) : (
              <p>Drag and drop an image here, or click to select an image.</p>
            )}
          </Box>
        )}
      </Dropzone>
      {error && <Typography color="red">{error}</Typography>}
      <Button onClick={handleUpload} disabled={!selectedImage}>
        Upload Image
      </Button>
    </Box>
  );
};
