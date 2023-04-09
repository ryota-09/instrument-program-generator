import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const normalize = (content: string) => {
  return content
    .trim()
    .replaceAll(/ /g, "")
    .replaceAll("`", "")
    .replaceAll("\n", "");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("スタート");
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_CHARGPT_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "assistant",
        content:
          "フルートの曲目の日本語でプログラムをクラシックと日本のカジュアルな曲目を5曲ずつ計10曲、考えてください。曲のタイトルをtilteキー、曲の作者をauthorキー、カジュアルな曲かどうかをisCasualのキー名でboolean形式で、最後に10曲のオブジェクトを配列のみにして、json形式にまとめる。",
      },
    ],
  });

  res.status(200).json(normalize(completion.data.choices[0].message.content));
}
