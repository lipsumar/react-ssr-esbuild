import { useState } from "react";
import { useServerData } from "../hooks/useServerData";

const Greet = () => {
  const { data, loading } = useServerData("greet");
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello, world!!!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>++</button>
      {loading ? <div>loading...</div> : <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
};
export default Greet;
