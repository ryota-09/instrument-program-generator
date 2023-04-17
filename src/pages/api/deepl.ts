// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextApiRequest) {
  // const body = JSON.stringify({
  //   text: "りんご",
  //   target_lang: "en",
  // });

  // const res = await fetch("https://api-free.deepl.com/v2/translate", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     auth_key: `DeepL-Auth-Key ${process.env.NEXT_PUBLIC_DEEPL_KEY}`,
  //   },
  //   body,
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
    mode: "cors",
    body: JSON.stringify(params),
  });
  console.log("@@@@@", deepLresponse);
  const deepLdata = await deepLresponse.json();
  return new Response(deepLdata.translations[0].text, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
