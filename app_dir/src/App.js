import React from 'react';

const { ipcRenderer } = window.require("electron")
console.log("ERROR, SEE: https://github.com/electron/electron/issues/9920");

class App extends React.Component {
  handleBtnClick = (e) => {
    ipcRenderer.send("state", "connected")
  }
  render(){
      return (
        <div>
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            React Application with Electron
          </h1>
          <p
            className="cl_ho_horloge"
            style={{ textAlign: "center", marginTop: "1rem" }}
          ></p>
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            <div className="btn btn-outline-dark" onClick={ this.handleBtnClick }>
              Ajouter le menu
            </div>
          </p>
        </div>
      );
  }

}

export default App;
