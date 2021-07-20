import styled from "styled-components";

export const MainGrid = styled.main`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 31.25em;
  grid-gap: 0.6em;
  padding: 1em;

  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }

  @media (min-width: 850px) {
    max-width: 69.4em;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationshipsArea";
    grid-template-columns: 10em 1fr 19.5em;
  }
`;
