import React, { useState } from "react";
import { useViewer } from "react-three-viewer";
import Button from "@material-ui/core/Button";

const ModelView: React.FC = () => {
  const [url, setUrl] = useState(
    "https://cdn.thingiverse.com/assets/10/3b/f2/b5/f2/xbox_wheel_wide_use_lowProfile_pivotAndRack.stl"
  );
  const [binds, { load, fetch }] = useViewer();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) {
      return;
    }
    const file = fileList[0];
    if (!file) {
      return;
    }
    load(file);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const urlValue = event.target.value;
    setUrl(urlValue);
  };

  const handleFileFetch = () => {
    fetch(url);
  };

  return (
    <div className="App">
      <section className="files">
        <input type="file" onChange={handleFileChange} />
      </section>
      <section className="files">
        <h2>Fetch by url</h2>
        <input type="text" value={url} onChange={handleUrlChange} />
        <Button onClick={handleFileFetch}>Fetch</Button>
      </section>
      <section>
        <canvas className="viewer" ref={binds} />
      </section>
    </div>
  );
};
export default ModelView;
