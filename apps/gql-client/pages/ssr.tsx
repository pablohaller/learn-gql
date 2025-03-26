import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import createApolloClient from "@/apollo-client";

type Game = { title: string; platform: string[] };

export const getServerSideProps = (async () => {
  console.log("The this happens on the server?");
  const client = createApolloClient();
  const { data } = await client.query({
    query: gql`
      query GetGames {
        games {
          title
          platform
        }
      }
    `,
  });
  return { props: { games: data } };
}) satisfies GetServerSideProps<{ games: Game[] }>;

const Page = ({
  games,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log("this happens on the server", games);
  return <div>{JSON.stringify(games)}</div>;
};

export default Page;
