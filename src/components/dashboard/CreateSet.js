import React from 'react';
import addButton from '../../images/add.png';

const CreateSet = () => {
  return (
    <div>
      <h1>create set</h1>
      <p>Name:</p>

      <ul>
        <Term />
        <Term />
      </ul>

      <button>
        <img src={addButton} />
      </button>
    </div>
  )
};

const Term = () => (
  <div>
    <input />
    <input />
  </div>
)

export default CreateSet;
