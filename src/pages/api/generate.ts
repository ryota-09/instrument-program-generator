import { OpenAIStream } from "../../openai";
import type { NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextApiRequest) {
  const { searchParams } = new URL(req.url as string);
  const optionText = searchParams.get("option");
  const hasOption = optionText ? true : false;
  const payload = {
    model: "text-davinci-003",
    prompt: `You are ${searchParams.get(
      "instrument"
    )} player. Think of 5 classical songs and 5 japanese songs, total 10 ${searchParams.get(
      "instrument"
    )}  songs for your concert. You can suggest a mix of classical, contemporary, and popular pieces that would be enjoyable for a ${searchParams.get(
      "instrument"
    )} concert, not an orchestra or symphony. ${
      hasOption ? decodeURI(optionText ?? "") : ""
    } The title of the song is the tilt key, the author of the song is the author key, whether the song is casual or not is in boolean format with the key name of isCasual, top level key is songList and finally the 10 song objects are arranged in json format.you do not include text contents.only one object.`,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    max_tokens: 500,
  };
  const stream = await OpenAIStream(payload);
  if (!stream) {
    return new Response(
      JSON.stringify({
        message: "Error",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } else {
    return new Response(stream, {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
