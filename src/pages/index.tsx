import Accordion from "@/components/Accordion";
import LoadingOverlay from "@/components/LoadingOverlay";
import axios from "axios";
import Head from "next/head";

import { useState } from "react";

type SongType = {
  title: string;
  author: string;
  isCasual: boolean;
};

type RequestData = {
  instrument: "flute" | "sax" | "piano";
  option: string;
};

const normalize = (content: string) => {
  return content
    .trim()
    .replaceAll(/ /g, "")
    .replaceAll(/\s/g, "")
    .replaceAll("`", "")
    .replaceAll("\n\n", "")
    .replaceAll("\n", "");
};

const fetchDeepLData = async (targetText: string) => {
  const apiUrl = `https://api-free.deepl.com/v2/translate`;
  const params = new URLSearchParams({
    auth_key: process.env.NEXT_PUBLIC_DEEPL_KEY ?? "",
    text: targetText,
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
  return deepLdata.translations[0].text;
};

export default function Home() {
  const [requestData, setRequestData] = useState<RequestData>({
    instrument: "piano",
    option: "",
  });
  const [songList, setSongList] = useState<SongType[]>([]);

  const [loading, setLoading] = useState(false);
  const [isRegenerate, setIsRegenerate] = useState(false);
  const [error, setError] = useState(false);

  const generateList = async () => {
    setSongList([]);
    setLoading(true);
    setError(false);
    const targetText = await fetchDeepLData(requestData.option);
    try {
      const data = await axios.get(
        `/api/generate?option=${targetText}&instrument=${requestData.instrument}`
      );
      setSongList([...data.data.songList]);
    } catch {
      try {
        const data = await axios.get(
          `/api/generate?option=${targetText}&instrument=${requestData.instrument}`
        );
        setSongList([...data.data.songList]);
      } catch {
        setError(true);
      }
    } finally {
      setLoading(false);
      if (!isRegenerate) {
        setIsRegenerate(true);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Program Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/program_generator.jpeg" />
        <meta property="og:site_name" content="Program Generator" />
        <meta
          property="og:description"
          content="AIがプログラムのテンプレートを作成します。"
        />
      </Head>
      <header className="mx-auto max-w-[400px] bg-blue-500 text-white py-4 px-6">
        <h1 className="text-lg font-bold">Program Generator ♪</h1>
      </header>
      <main className="py-6 px-4 mx-auto max-w-[400px] min-h-screen">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Instrument
        </label>
        <div className="w-full max-w-md mx-auto flex justify-center gap-4">
          <button
            onClick={() =>
              setRequestData({ ...requestData, instrument: "piano" })
            }
            className={`border-2 border-blue-300 text-gray-500 font-bold py-2 px-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md hover:shadow-lg transition duration-200 ease-in-out ${
              requestData.instrument === "piano"
                ? "bg-blue-100 text-black"
                : "bg-white"
            }`}
          >
            piano
          </button>
          <button
            onClick={() =>
              setRequestData({ ...requestData, instrument: "sax" })
            }
            className={`border-2 border-blue-300 text-gray-500 font-bold py-2 px-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md hover:shadow-lg transition duration-200 ease-in-out ${
              requestData.instrument === "sax"
                ? "bg-blue-100 text-black"
                : "bg-white"
            }`}
          >
            sax
          </button>
          <button
            onClick={() =>
              setRequestData({ ...requestData, instrument: "flute" })
            }
            className={`border-2 border-blue-300 text-gray-500 font-bold py-2 px-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md hover:shadow-lg transition duration-200 ease-in-out ${
              requestData.instrument === "flute"
                ? "bg-blue-100 text-black"
                : "bg-white"
            }`}
          >
            flute
          </button>
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="option"
          >
            Option
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="option"
            type="text"
            placeholder="例: みんなが楽しめる曲を選んで欲しい。"
            onChange={(event) =>
              setRequestData({ ...requestData, option: event.target.value })
            }
          />
        </div>
        <div className="flex justify-center my-4">
          {isRegenerate ? (
            <button
              onClick={async () => await generateList()}
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              もう一度作成する！
            </button>
          ) : (
            <button
              onClick={async () => await generateList()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate Program !
            </button>
          )}
        </div>
        <div>
          <LoadingOverlay loading={loading} src="/study_night_girl.png" />
        </div>
        {error && <p className="w-full mx-auto">エラーが発生しました</p>}
        {songList &&
          songList.map((song, index) => (
            <div key={index} className="w-full max-w-md mx-auto">
              <Accordion
                title={song.title}
                author={song.author}
                isCasual={song.isCasual}
              />
            </div>
          ))}
      </main>

      <footer className="mx-auto max-w-[400px] bg-blue-500 text-white py-4 px-6 mt-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Created by Ryota.
        </p>
      </footer>
    </>
  );
}
