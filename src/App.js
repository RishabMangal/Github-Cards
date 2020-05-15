import React from 'react';
import GithubCards from './GithubCards';
import Footer from './Footer';
function App() {
  return (
    <div className="App">
      <GithubCards></GithubCards>
      <div style={{position: 'absolute',bottom:0,width:"100%"}}>
      <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
