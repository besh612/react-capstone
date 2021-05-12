import React from "react";

type PictureViewProps = {
  photoUrl: string;
};

const PictureView = ({ photoUrl }: PictureViewProps) => (
  <img src={photoUrl} alt="균열" style={{ height: 400, width: "100%" }} />
);

export default PictureView;
