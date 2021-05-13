import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { SkinTypeProvider } from './providers/SkinTypeProvider';
import { OpenUVProvider } from './providers/OpenUVProvider';
import { ProductProvider } from './providers/ProductProvider';
import { FavoriteProvider } from './providers/FavoriteProvider';
import { PrecautionProvider } from './providers/PrecautionProvider';

function App() {

  library.add(faHeart)

  return (
    <Router>
      <UserProfileProvider>
        <ProductProvider>
          <FavoriteProvider>
            <SkinTypeProvider>
              <PrecautionProvider>
                <OpenUVProvider>
                  <Header />
                  <ApplicationViews />
                </OpenUVProvider>
              </PrecautionProvider>
            </SkinTypeProvider>
          </FavoriteProvider>
        </ProductProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;
