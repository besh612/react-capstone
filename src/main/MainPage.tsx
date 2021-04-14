import React, { useState } from "react";
import axios from "axios";

import server from "../config/credentials.json";

function MainPage() {
  const [data, setData] = useState(null);
  const handleGetData = async () => {
    try {
      const response = await axios.get(`${server.url}user/1`);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>여기는 메인페이지</h1>
      <button type="button" onClick={handleGetData}>
        불러오기
      </button>
      {data && <textarea value={JSON.stringify(data, null, 2)} readOnly />}
    </div>
  );
}
export default MainPage;
