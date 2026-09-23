import SearchBar from "./components/SearchBar";

function App() {
  return <SearchBar onSearch={(username) => console.log("searching:", username)} />;
}

export default App;