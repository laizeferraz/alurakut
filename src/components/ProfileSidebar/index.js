import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
import { Box } from "../Box/styles";

export default function ProfileSidebar(props) {
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
