import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from './components/Button';

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="App">
      <Button full kind="primary" text="oi" />
    </div>
  );
};

export default App;
