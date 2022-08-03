const fetchData = async () => {
  let response = await fetch("http://localhost:8000/data");
  let data = await response.json();
  console.log(data);
};
fetchData();
function App() {
  return <div className="App">App</div>;
}

export default App;
