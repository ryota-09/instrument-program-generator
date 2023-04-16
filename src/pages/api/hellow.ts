import type { NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextApiRequest) {
  // const apiUrl = `https://api-free.deepl.com/v2/translate`;
  // const params = new URLSearchParams({
  //   auth_key: process.env.NEXT_PUBLIC_DEEPL_KEY ?? "",
  //   text: "りんご",
  //   target_lang: "en",
  // });
  // const deepLresponse = await fetch(`${apiUrl}?${params.toString()}`, {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   method: "POST",
  //   mode: "cors",
  //   body: JSON.stringify({ text: "りんご", target_lang: "en" }),
  // });
  // const deepLdata = await deepLresponse.json();

  // return new Response(JSON.stringify(deepLdata.translations[0].text), {
  //   status: 200,
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // });
  const apiUrl = `https://jsonplaceholder.typicode.com/posts`;
  const response = await fetch(apiUrl, {
    method: "GET",
    mode: "cors",
  });
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
