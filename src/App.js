// import React from 'react';
// import { Modal } from "@material-ui/core";

// function App() {
//   return (
//     <Modal></Modal>
//   )
// }

// export default App;




import React from 'react';
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails';
import Auth from './components/Auth/Auth';

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Navbar />
      <Container maxWidth="xl">
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to={`/posts`} />}
          />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route
            exact
            path="/auth"
            component={() => (user ? (
              <Redirect to="/posts" />
            ) : (
              <Auth />
            ))}
          />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;