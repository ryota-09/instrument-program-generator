import type { NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextApiRequest) {
  return new Response("ハロー ワールド",{
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
