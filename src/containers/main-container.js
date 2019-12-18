import React from 'react';
import SideNav from './nav';
import '../styles/main.css';
import Home from './home';
// import Bookmark from '../components/bookmark'


function MainContainer() {
  return (
    <div>
        <SideNav>
            <Home/>
            {/* <Bookmark /> */}
        </SideNav>
    </div>
  );
}

export default MainContainer;
