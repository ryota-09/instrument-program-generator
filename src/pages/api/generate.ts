import { OpenAIStream } from "../../openai";
import type { NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextApiRequest) {
  const { searchParams } = new URL(req.url as string);
  const optionText = searchParams.get("option");
  const hasOption = optionText ? true : false;

  // const data = await axios.post(
  //   "https://api-free.deepl.com/v2/translate",
  //   { text: optionText, target_lang: "en" },
  //   {
  //     headers: {
  //       Authorization: `DeepL-Auth-Key ${process.env.NEXT_PUBLIC_DEEPL_KEY}`,
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Accept: "*/*",
  //     },
  //   }
  // );
  const apiUrl = `https://api-free.deepl.com/v2/translate`;
  const params = new URLSearchParams({
    auth_key: process.env.NEXT_PUBLIC_DEEPL_KEY ?? "",
    text: optionText ?? "",
    target_lang: "en",
  });

  const deepLresponse = await fetch(`${apiUrl}?${params.toString()}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: JSON.stringify({ text: optionText, target_lang: "en" }),
  });
  const deepLdata = await deepLresponse.json();
  // console.log(data.data.translations[0].text);
  // const configuration = new Configuration({
  //   apiKey: process.env.NEXT_PUBLIC_CHARGPT_KEY,
  // });

  // const openai = new OpenAIApi(configuration);
  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "assistant",
  //       content: ,
  //     },
  //   ],
  // });
  const payload = {
    model: "text-davinci-003",
    prompt: `Think of 10 ${searchParams.get(
      "instrument"
    )} programs, 5 classic and 5 casual Japanese, total 10 songs. ${
      hasOption ? deepLdata.translations[0].text : ""
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
