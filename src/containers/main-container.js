import React from 'react';
import SideNav from './nav';
import '../styles/main.css';
import Home from './home';
import Bookmark  from './bookmark';
import PostTab from '../components/posts-tab'


function MainContainer() {
  return (
    <div>
        <SideNav>
            {/* <Home/> */}
            <PostTab />
        </SideNav>
    </div>
  );
}

export default MainContainer;
