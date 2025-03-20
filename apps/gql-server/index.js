import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
// import { authors, games, reviews } from "./_db.js";

let games = [
  { id: "1", title: "Zelda, Tears of the Kingdom", platform: ["Switch"] },
  { id: "2", title: "Final Fantasy 7 Remake", platform: ["PS5", "Xbox"] },
  { id: "3", title: "Elden Ring", platform: ["PS5", "Xbox", "PC"] },
  { id: "4", title: "Mario Kart", platform: ["Switch"] },
  { id: "5", title: "Pokemon Scarlet", platform: ["PS5", "Xbox", "PC"] },
];
let authors = [
  { id: "1", name: "mario", verified: true },
  { id: "2", name: "yoshi", verified: false },
  { id: "3", name: "peach", verified: true },
];
let reviews = [
  { id: "1", rating: 9, content: "lorem ipsum", author_id: "1", game_id: "2" },
  { id: "2", rating: 10, content: "lorem ipsum", author_id: "2", game_id: "1" },
  { id: "3", rating: 7, content: "lorem ipsum", author_id: "3", game_id: "3" },
  { id: "4", rating: 5, content: "lorem ipsum", author_id: "2", game_id: "4" },
  { id: "5", rating: 8, content: "lorem ipsum", author_id: "1", game_id: "5" },
  { id: "6", rating: 9, content: "lorem ipsum", author_id: "1", game_id: "2" },
  { id: "7", rating: 10, content: "lorem ipsum", author_id: "3", game_id: "3" },
];

const resolvers = {
  Query: {
    games() {
      return games;
    },
    reviews() {
      return reviews;
    },
    authors() {
      return authors;
    },
    review(_, { id, ...args }) {
      return reviews.find(({ id: reviewId }) => reviewId === id);
    },
    game(_, { id, ...args }) {
      return games.find(({ id: gameId }) => gameId === id);
    },
    author(_, { id, ...args }) {
      return authors.find(({ id: authorId }) => authorId === id);
    },
  },
  Game: {
    reviews({ id }) {
      return reviews.filter(({ game_id }) => game_id === id);
    },
  },
  Author: {
    reviews({ id }) {
      return reviews.filter(({ author_id }) => author_id === id);
    },
  },
  Review: {
    author({ author_id }) {
      return authors.find(({ id }) => id === author_id);
    },
    game({ game_id }) {
      return games.find(({ id }) => id === game_id);
    },
  },
  Mutation: {
    deleteGame(_, { id, ...args }) {
      games = games.filter(({ id: gameId }) => gameId !== id);
      return games;
    },
    addGame(_, { game }) {
      let _game = {
        ...game,
        id: Math.floor(Math.random() * 10000),
      };
      games.push(_game);
      return _game;
    },
    updateGame(_, args) {
      const { id, edits } = args;
      games = games.map((game) =>
        game.id === id ? { ...game, ...edits } : game
      );
      return games.find(({ id: gameId }) => gameId === id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port", 4000);
