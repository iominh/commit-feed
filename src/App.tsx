import React, { useState } from "react";
import { Router, Route } from "react-router-dom";

function App() {



  return (
    <Router>
      <div>
        
      </div>
            <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
