import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const normalize = (content: string) => {
  return content
    .trim()
    .replaceAll(/ /g, "")
    .replaceAll("`", "")
    .replaceAll("\\", "")
    .replaceAll("\n", "");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hasOption = req.query.option ? true : false;
  const data = await axios.post(
    "https://api-free.deepl.com/v2/translate",
    { text: req.query.option, target_lang: "en" },
    {
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.NEXT_PUBLIC_DEEPL_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "*/*",
      },
    }
  );
  console.log(data.data.translations[0].text);
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_CHARGPT_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "assistant",
        content: `Think of 10 ${
          req.query.instrument
        } programs, 5 classic and 5 casual Japanese. ${
          hasOption ? data.data.translations[0].text : ""
        } The title of the song is the tilt key, the author of the song is the author key, whether the song is casual or not is in boolean format with the key name of isCasual, top level key is songList and finally the 10 song objects are arranged in json format.`,
      },
    ],
  });
  if (!completion.data.choices[0].message) {
    res.status(500).json([]);
  } else {
    res.status(200).json(normalize(completion.data.choices[0].message?.content));
  }
}
