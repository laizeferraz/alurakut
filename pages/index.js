import { useState, useEffect } from "react";
import { MainGrid } from "../src/components/MainGrid/index";
import { Box } from "../src/components/Box/index";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelationships";

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        alt="profile"
        style={{ borderRadius: "0.5em" }}
      />
      <hr />

      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const githubUser = "laizeferraz";
  const friends = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  const [followers, setFollowers] = useState([]);

  useEffect(function () {
    fetch("https://api.github.com/users/peas/followers")
      .then(function (data) {
        return data.json();
      })
      .then(function (response) {
        setFollowers(response);
      });
    // Dato CMS API GraphQL
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "361eac896f4d8fd3d6e7f81d65a518",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {  allCommunities{
            title
            id
            imageUrl
            creatorSlug
          },
      }`,
      }),
    })
      .then((response) => response.json())
      .then((completeResponse) => {
        const communitiesData = completeResponse.data.allCommunities;
        console.log(communitiesData);
        setCommunities(communitiesData);
      });
  }, []);

  return (
    <div>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea">
          <Box>
            <h1 className="title">Welcome</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">What do you want to do?</h2>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const community = {
                  id: new Date().toISOString(),
                  title: formData.get("title"),
                  image: formData.get("image"),
                };
                setCommunities([...communities, community]);
                console.log(community);
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="What will be the name of your community?"
                  name="title"
                  aria-label="What will be the name of your community"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Give a URL to use as a cover"
                  name="image"
                  aria-label="Give a URL to use as a cover"
                />
              </div>

              <button>New community</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationshipsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Friends ({friends.length})</h2>

            <ul>
              {friends.map((friend, index) => {
                return (
                  <li key={index++}>
                    <a href={`/users/${friend}`}>
                      <img src={`https://github.com/${friend}.png`} />
                      <span>{friend}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBox title="Followers" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              My Communities ({communities.length})
            </h2>

            <ul>
              {communities.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/communities/${community.id}`}>
                      <img src={community.imageUrl} />
                      <span>{community.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Communities</Box>
        </div>
      </MainGrid>
    </div>
  );
}
