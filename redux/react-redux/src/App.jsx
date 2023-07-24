import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/Store";
import CakeContainer from "./components/CakeContainer";
import HooksCakeContainer from "./components/HooksCakeContainer";
import IcecreamContainer from "./components/IcecreamContainer";
import HooksIcecreamContainer from "./components/HooksIcecreamContainer";
import NewCakeContainer from "./components/HooksNewCakeContainer";
import HooksNewCakeContainer from "./components/HooksNewCakeContainer";
import ItemsContainer from "./components/ItemsContainer";
import UserContainer from "./components/UserContainer";

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* <ItemsContainer cake />
        <ItemsContainer icecream />
        <mark>REDUX</mark>
        <CakeContainer />
        <IcecreamContainer />
        <hr />
        <mark>HOOKS</mark>
        <HooksCakeContainer />
        <HooksIcecreamContainer />
        <hr />
        <mark>REDUX</mark>
        <NewCakeContainer />
        <hr />
        <mark>HOOKS</mark>
        <HooksNewCakeContainer /> */}
        <UserContainer />
      </div>
    </Provider>
  );
}

export default App;
