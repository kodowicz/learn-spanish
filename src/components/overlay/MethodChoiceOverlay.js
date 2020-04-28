import React from 'react';
import { Link } from 'react-router-dom';

const MethodChoiceOverlay = (props) => {
  const handleLearnChoice = () => {
    if (props.signedUser) {
      props.chooseMethod(false);
      props.createLearnSet(props.setid)
    }
  }

  const handlePlayChoice = () => {
    if (props.signedUser) {
      props.chooseMethod(false);
      props.createPlaySet(props.setid)
    }
  }

  return (
    <div role="alertdialog" aria-describedby="info">
      <p id="info">Do you want to learn words by flashcards or by game?</p>
      <Link onClick={handleLearnChoice} to={`/learn/${props.setid}`}>flashcards</Link>
      <Link onClick={handlePlayChoice} to={`/play/${props.setid}`}>game</Link>
    </div>
  )
};

export default MethodChoiceOverlay
