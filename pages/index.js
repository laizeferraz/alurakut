import { useState } from "react";
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
    <Box>
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
                  id: new Date().toISOString,
                  title: formData.get("title"),
                  image: formData.get("image"),
                };
                setCommunities([...communities, community]);
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              My Communities ({communities.length})
            </h2>

            <ul>
              {communities.map((community, index) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community.title}`}>
                      <img src={community.image} />
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
