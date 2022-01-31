import { useServerData } from "../hooks/useServerData";
import { Helmet } from "react-helmet-async";

const About = () => {
  const { data, loading } = useServerData("about");
  return (
    <div>
      <Helmet>
        <title>About - The app</title>
      </Helmet>
      <h1>About</h1>
      {loading ? <div>loading...</div> : <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
};
export default About;
