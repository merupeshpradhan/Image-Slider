import Imageslider from "./image-slider";

function App() {
  return (
    <div>
      <Imageslider url={"https://picsum.photos/v2/list"} page={"1"} limit={"10"} />
    </div>
  );
}

export default App;
