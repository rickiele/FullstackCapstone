import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { SkinTypeProvider } from './providers/SkinTypeProvider';
import { OpenUVProvider } from './providers/OpenUVProvider';
import { ProductProvider } from './providers/ProductProvider';
import { FavoriteProvider } from './providers/FavoriteProvider';


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ProductProvider>
          <FavoriteProvider>
            <SkinTypeProvider>
              <OpenUVProvider>
                <Header />
                <ApplicationViews />
              </OpenUVProvider>
            </SkinTypeProvider>
          </FavoriteProvider>
        </ProductProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;
