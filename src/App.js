import Header from "./components/Header/Header";
import routes from "./routes";
import "./App.css";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
};

export default App;
