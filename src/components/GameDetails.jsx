import React from "react";

const GameDetails = ({ game }) => {
  return (
    <div className="game-details-row" data-testid="game-details">
      <img
        src={game.imageUrl}
        alt={game.title}
        className="game-details-image"
        loading="lazy"
      />
    </div>
  );
};

export default GameDetails;
