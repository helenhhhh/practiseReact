
import React from 'react';
import './index.css';
function Header (){
    return  <header className="header">Status Bar</header>;
}
function Footer(){
  return (
  <ul class="flex-container">
    <li class="flex-item"> </li>
    <li class="flex-item"> </li>
    <li class="flex-item"> </li>
    <li class="flex-item"> </li>
  </ul>
);
}

function Context(){
  return (
  <div class="Context-container">
  <div class="Context-item"> </div>
  <div class="Context-item"> </div>
  <div class="Context-item"> </div>
  <div class="Context-item"> </div>
  <div class="Context-item"> </div>
  <div class="Context-item"> </div>
  <div class="Context-item"> </div>
  <div class="Context-item"> </div>
  </div>
  );
}
function Screen(){
  return (
    <div className = "wrap">
    <Header />
    <Context className = "context" />
    <Footer className = "footer"/>
    </div>
  );
}
export default Screen;