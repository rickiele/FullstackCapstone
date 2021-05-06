import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { SkinTypeProvider } from './providers/SkinTypeProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <SkinTypeProvider>
          <Header />
          <ApplicationViews />
        </SkinTypeProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
