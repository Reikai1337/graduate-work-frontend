import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

import { Box, FormHelperText, Typography } from "@mui/material";

type ImageUploaderProps = {
  onChange: (file: File) => void;
  file: File | null;
  helperText?: string;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  file,
  helperText,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    if (rejectedFiles.length > 0) {
      setError("Invalid file format. Please select an image.");
    } else if (acceptedFiles.length > 0) {
      setError(null);
      onChange(acceptedFiles[0]);
    }
  };

  const url = file ? URL.createObjectURL(file) : null;

  return (
    <Box>
      <Dropzone onDrop={handleDrop} accept={{ "image/*": [] }} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            style={{ border: "1px dashed gray", padding: "20px" }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input {...getInputProps()} />
            {url ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={url}
                alt="Uploaded Image"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            ) : (
              <Typography>
                Перетягніть зображення сюди або клацніть, щоб вибрати
                зображення.
              </Typography>
            )}
          </Box>
        )}
      </Dropzone>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </Box>
  );
};
