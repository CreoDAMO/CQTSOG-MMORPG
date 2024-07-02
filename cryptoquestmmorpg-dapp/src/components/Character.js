// src/components/Character.js
import React, { useState, useEffect } from 'react';
import useCryptoQuest from '../hooks/useCryptoQuest';

const Character = ({ id }) => {
  const { getCharacter } = useCryptoQuest();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const char = await getCharacter(id);
      setCharacter(char);
    };

    fetchCharacter();
  }, [id, getCharacter]);

  return (
    <div>
      {character ? (
        <div>
          <h2>{character.name}</h2>
          <p>{character.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Character;
