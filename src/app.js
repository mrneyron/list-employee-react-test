import React from 'react';
import './styles.css';
import ListEmployee from './listEmployee'
import ReactDOM from "react-dom";

/**
 * Главный компонент
 */
const App = () => {
  return (
    <ListEmployee />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
