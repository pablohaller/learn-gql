import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_GAMES = gql`
  query GetGames {
    games {
      title
      platform
    }
  }
`;

const Games = () => {
  const { loading, error, data } = useQuery(GET_GAMES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ul>
        {data.games.map(
          (game: { id: string; title: string }, index: number) => (
            <li key={index}>{game?.title}</li>
          )
        )}
      </ul>
    </div>
  );
};

export default Games;
