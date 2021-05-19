import React from "react";

interface PictureViewProps {
  photoUrl: string;
}

function PictureView({ photoUrl }: PictureViewProps): React.ReactElement {
  return (
    <img
      src={photoUrl}
      alt="균열"
      style={{ height: 400, width: "100%", objectFit: "fill" }}
    />
  );
}

export default PictureView;
