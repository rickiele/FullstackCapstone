import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { SkinTypeProvider } from './providers/SkinTypeProvider';
import { OpenUVProvider } from './providers/OpenUVProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <SkinTypeProvider>
          <OpenUVProvider>
            <Header />
            <ApplicationViews />
          </OpenUVProvider>
        </SkinTypeProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
