// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextApiRequest) {
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
  const deepLdata = await deepLresponse.json();
  return new Response(deepLdata.translations[0].text, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
