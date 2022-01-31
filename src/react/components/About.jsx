import { useServerData } from "../hooks/useServerData";

const About = () => {
  const { data, loading } = useServerData("about");
  return (
    <div>
      <h1>About</h1>
      {loading ? <div>loading...</div> : <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
};
export default About;
