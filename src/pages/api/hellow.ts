import type { NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextApiRequest
) {
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

  // const response = await fetch("https://api-free.deepl.com/v2/translate", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: JSON.stringify(
  //     new URLSearchParams({
  //       auth_key: process.env.DEEPL_API_KEY ?? "",
  //       text: "りんご",
  //       target_lang: "en",
  //     })
  //   ),
  // });
  const apiUrl = `https://api-free.deepl.com/v2/translate`;
  const params = new URLSearchParams({
    auth_key: process.env.NEXT_PUBLIC_DEEPL_KEY ?? "",
    text: "りんご",
    target_lang: "en",
  });
  const deepLresponse = await fetch(`${apiUrl}?${params.toString()}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: JSON.stringify(params),
  });
  const deepLdata = await deepLresponse.json();
  console.log(deepLdata)
  return new Response("発火", {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
