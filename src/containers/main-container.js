import React from 'react';
import SideNav from './nav';
import '../styles/main.css';
import Home from './home';


function MainContainer() {
  return (
    <div>
        <SideNav>
          <Home />
        </SideNav>
    </div>
  );
}

export default MainContainer;
