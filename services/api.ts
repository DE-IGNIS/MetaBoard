// Main working of wikipedia api

type WikiPerson = {
  image: string;
  description: string;
  displayTitle: string;
  extract: string;
};

async function wikipediaApi(name: string): Promise<WikiPerson | null> {
  try {
    const formattedName = encodeURIComponent(name.replace(/\s+/g, "_"));

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedName}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "FindVIPApp/1.0 (chauhansudarsh@gmail.com)",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.log(res.status);
      throw new Error("Request Failed!");
    }

    const data = await res.json();

    const result: WikiPerson = {
      image: data.originalimage?.source ?? data.thumbnail?.source ?? "",
      description: data.description ?? "",
      displayTitle: data.title ?? "",
      extract: data.extract ?? "",
    };

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default wikipediaApi;
