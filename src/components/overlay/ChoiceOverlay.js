import React from 'react';
import { Link } from 'react-router-dom';

const ChoiceOverlay = (props) => (
  <div role="alertdialog" aria-describedby="info">
    <p id="info">Do you want to learn words by flashcards or by game?</p>
    <Link to={`/learn/`}>flashcards</Link>
    <Link to={`/play/`}>game</Link>
  </div>
);

export default ChoiceOverlay
