import { MainGrid } from "../src/components/MainGrid/index";
import { Box } from "../src/components/Box/index";

export default function Home() {
  return (
    <MainGrid>
      <div className="profileArea">
        <Box>
          <img src="https://github.com/laizeferraz.png" alt="profile" />
        </Box>
      </div>
      <div className="welcomeArea">
        <Box>Welcome</Box>
      </div>
      <div className="profileRelationshipsArea">
        <Box>Friends</Box>
        <Box>Communities</Box>
      </div>
    </MainGrid>
  );
}
