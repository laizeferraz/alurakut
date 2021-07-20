import jwt from "jsonwebtoken";

export default async function githubAuth(req, res) {
  const { authorization } = req.headers;

  const tokenDecoded = jwt.decode(authorization);
  console.log(tokenDecoded);

  if (!tokenDecoded) {
    return res.send({
      isAuthenticated: false,
    });
  }

  const response = await fetch(
    `https://api.github.com/users/${tokenDecoded.githubUser}`
  );
  console.log(response);
  const data = await response.json();

  if (data.message === "Not Found" || !data) {
    res.send({
      isAuthenticated: false,
    });
  } else {
    res.send({
      isAuthenticated: true,
    });
  }
}
