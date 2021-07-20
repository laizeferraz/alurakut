import { useState, useEffect } from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import { MainGrid } from "../components/MainGrid/styles";
import { Box } from "../components/Box/styles";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../components/ProfileRelationships/styles";
import ProfileRelationsBox from "../components/ProfileRelationships";
import ProfileSidebar from "../components/ProfileSidebar";

export default function Home(props) {
  const user = props.githubUser;
  const [communities, setCommunities] = useState([]);

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
          <ProfileSidebar githubUser={user} />
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
                  title: formData.get("title"),
                  imageUrl: formData.get("image"),
                  creatorSlug: user,
                };

                fetch("/api/communities", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(community),
                }).then(async (response) => {
                  const data = await response.json();
                  console.log(data);
                });
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
          <ProfileRelationsBox
            title="Followers"
            items={followers}
            githubUser={props.githubUser}
          />
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

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch("http://localhost:3000/api/auth", {
    headers: {
      Authorization: token,
    },
  }).then((response) => response.json());

  // const isAuthenticated = false;

  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    },
  };
}
