import { SiteClient } from "datocms-client";

export default async function requesteReceiver(request, response) {
  if (request.method === "POST") {
    const TOKEN = "4e04f23b97604d092e6fb356fbf187";

    const client = new SiteClient(TOKEN);

    //IMPORTANT! Validate data before registering it in the database.
    const registerCreated = await client.items.create({
      itemType: "978582", //it's the id created by dato cms
      ...request.body,
      // title: "Test community",
      // imageUrl: "https://github.com/laizeferraz.png",
      // creatorSlug: "laizeferraz",
    });

    response.json({
      registerCreated: registerCreated,
    });

    return;
  }
}
