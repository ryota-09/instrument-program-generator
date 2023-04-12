import type { NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextApiRequest) {
  const dummy = {
    deepl: process.env.NEXT_PUBLIC_DEEPL_KEY,
    chatgpt: process.env.NEXT_PUBLIC_CHARGPT_KEY,
  };

  return new Response(`${dummy}`, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
