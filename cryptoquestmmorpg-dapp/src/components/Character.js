import React from 'react';
import PropTypes from 'prop-types';

const Character = ({ id }) => {
  return (
    <div>
      <h1>Character Component</h1>
      <p>ID: {id}</p>
    </div>
  );
};

Character.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Character;
