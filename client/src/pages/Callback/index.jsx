import { useState } from "react";

function Callback() {
  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState(null);

  const getData = async () => {
    if (processing) {
      return;
    }

    setProcessing(true);

    // get data from the api
    const userGames = await fetch("/api", {
      credentials: "include", // important for session data
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());

    setData(userGames);
    setProcessing(false);
  };

  // eslint-disable-next-line react/no-unescaped-entities
  return (
    <>
      <h2>You're in!</h2>
      {data ? (
        <pre>{JSON.stringify(data, "", 2)}</pre>
      ) : (
        <button onClick={getData}>Get User Games</button>
      )}
    </>
  );
}

export default Callback;
