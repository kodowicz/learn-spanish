import React from 'react';
import { Link } from 'react-router-dom';

const sets = [
  {
    name: 'verbs',
    amount: 100
  },
  {
    name: 'adjective',
    amount: 60
  }
];

const setsList = (sets) => {
  return sets.map((set, index) =>
    <li key={ index }>
      <Link to={`/sets/${set.name}`}>
        <h2>{ set.name }</h2>
        <p>{ set.amount } terms</p>
      </Link>
    </li>
  )
}

const ViewProfile = () => {
  return (
    <div>
      <p>user sets</p>
      <ul>
        { setsList(sets) }
      </ul>
    </div>
  )
};

export default ViewProfile;
