import React, { useState } from "react";
// Hook do NextJS
import { useRouter } from "next/router";
import nookies from "nookies";

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = useState("");

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Connect</strong> with your friends and family using scraps
            and quick messages
          </p>
          <p>
            <strong>Meet</strong> new people using your friends connections and
            communities
          </p>
          <p>
            <strong>Share</strong> videos, photos and passions in just one place
          </p>
        </section>

        <section className="formArea">
          <form
            className="box"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("User: ", githubUser);
              fetch("https://alurakut.vercel.app/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ githubUser: githubUser }),
              }).then(async (response) => {
                const responseData = await response.json();
                const token = responseData.token;
                nookies.set(null, "USER_TOKEN", token, {
                  path: "/",
                  maxAge: 86400 * 7, //expire date for cookies
                });
                router.push("/");
              });
            }}
          >
            <p>
              Access now with your <strong>GitHub</strong> account!
            </p>
            <input
              placeholder="User"
              value={githubUser}
              onChange={(event) => {
                setGithubUser(event.target.value);
              }}
            />
            {githubUser.length === 0 ? "Fill the field" : ""}
            <button type="submit">Login</button>
          </form>

          <footer className="box">
            <p>
              Do not have an account? <br />
              <a href="/login">
                <strong>SIGN UP NOW</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">About Orkut</a> -{" "}
            <a href="/">Security Center</a> - <a href="/">Privacy</a> -{" "}
            <a href="/">Terms</a> - <a href="/">Contact</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
