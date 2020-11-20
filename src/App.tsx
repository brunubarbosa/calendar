import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from './components/Button';
import Main from './containers/Main';

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="App">
      <Main />
    </div>
  );
};

export default App;
