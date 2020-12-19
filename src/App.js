import Header from "./components/Header/Header";
import routes from "./routes";
import {useLocation} from "react-router-dom"


const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname === "/" ? null : <Header />}
      {routes}
    </div>
  );
};

export default App;
