// src/components/Character.js
import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../context/Web3Context';

const Character = ({ id }) => {
  const { getCharacter } = useContext(Web3Context);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const char = await getCharacter(id);
      setCharacter(char);
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

export default Character;
