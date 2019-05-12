import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
  <div>
    <Title />
    <Sets />
    <button>
      <Link to="/create">add new set</Link>
    </button>

  </div>
)

const Title = () => <h1>FLASHCARDS</h1>

class Sets extends React.Component {
  sets = [
    {
      name: 'verbs',
      amount: 100,
      author: 'Anna'
    },
    {
      name: 'adjective',
      amount: 60,
      author: 'Alina'
    }
  ];

  setsList = () => {
    return this.sets.map((set, index) =>
      <li key={ index }>
        <Link to={`/sets/${set.name}`}>
          <h2>{ set.name }</h2>
          <p>{ set.amount } terms</p>
          <p>created by { set.author }</p>
        </Link>
      </li>
    )
  };

  render() {
    return (
      <ul>
        { this.setsList() }
      </ul>
    )
  }
};

export default Home;
