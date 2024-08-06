import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from './Web3Context';
import PropTypes from 'prop-types';

const Character = ({ id }) => {
  const { getCharacter } = useContext(Web3Context);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const char = await getCharacter(id);
        setCharacter(char);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };
    fetchCharacter();
  }, [id, getCharacter]);

  if (!character) {
    return <div>Loading character...</div>;
  }

  return (
    <div>
      <h2>Character Details</h2>
      <p>ID: {character.id}</p>
      <p>Name: {character.name}</p>
      <p>Level: {character.level}</p>
    </div>
  );
};

Character.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Character;
