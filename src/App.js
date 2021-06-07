import './App.css';
import {Login} from "./components/login/Login";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Registration from "./components/login/Registration";
import PostContainer from "./components/postComponent/postContainer";


function App() {
  return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/registration' component={Registration} />
                    <Route path="/post/:id" render={(props) => <PostContainer {...props} />} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
