import Home from './components/Home/Home';
import Header from './components/Header/Header';
import routes from './routes';
import {withRouter} from 'react-router-dom';

const App = (props) => {
  return (
    <div className="App">
      {props.location.pathname === "/"
      ?
      null
      :
      <div>
        <Header/>
        <Home/>
      </div>
      }
      {routes}
    </div>
  );
}

export default withRouter(App);
