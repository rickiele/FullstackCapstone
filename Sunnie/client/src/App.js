import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { SkinTypeProvider } from './providers/SkinTypeProvider';
import { OpenUVProvider } from './providers/OpenUVProvider';
import { ProductProvider } from './providers/ProductProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ProductProvider>
          <SkinTypeProvider>
            <OpenUVProvider>
              <Header />
              <ApplicationViews />
            </OpenUVProvider>
          </SkinTypeProvider>
        </ProductProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
