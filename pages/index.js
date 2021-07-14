import { MainGrid } from "../src/components/MainGrid/index";
import { Box } from "../src/components/Box/index";
import {
  AlurakutMenu,
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
    </Box>
  );
}

export default function Home() {
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
        </div>
        <div className="profileRelationshipsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Friends ({friends.length})</h2>

            <ul>
              {friends.map((friend) => {
                return (
                  <li>
                    <a href={`/users/${friend}`} key={friend}>
                      <img src={`https://github.com/${friend}.png`} />
                      <span>{friend}</span>
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
