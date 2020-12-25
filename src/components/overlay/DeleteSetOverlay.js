import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import {
  Background,
  Dialog,
  Alert,
  Buttons,
  Button,
  colors
} from "../../assets/styles/GlobalStyles";

const DeleteSetOverlay = ({
  isEdited,
  askForDeleting,
  deleteSet,
  deleteSetChanges
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const backgroundRef = useRef();

  function handleDecline(event) {
    askForDeleting(false);
  }

  function handleDelete(event) {
    setIsDeleted(true);
    askForDeleting(false);
    deleteSet();

    if (isEdited) {
      deleteSetChanges();
    }
  }

  function handleCancel(event) {
    if (event.target === backgroundRef.current) {
      askForDeleting(false);
    }
  }

  if (isDeleted) return <Redirect to="/" />;

  return (
    <Background ref={backgroundRef} onClick={handleCancel}>
      <Dialog height="28" role="alertdialog" aria-describedby="info">
        <Alert id="info">Are you sure you want to delete this set?</Alert>
        <Buttons height="10">
          <Button color={colors.navy} center="true" onClick={handleDecline}>
            go back
          </Button>
          <Button color={colors.warning} center="true" onClick={handleDelete}>
            delete
          </Button>
        </Buttons>
      </Dialog>
    </Background>
  );
};

export default DeleteSetOverlay;
