import Accordion from "@/components/Accordion";
import axios from "axios";
import Head from "next/head";

import { useState } from "react";

type SongType = {
  title: string;
  author: string;
  isCasual: boolean;
};

export default function Home() {
  const [option, setOption] = useState("");
  const [songList, setSongList] = useState<SongType[]>([])
  const generateList = async () => {
    const data = await axios.get(`/api/generate?option=${option}`);
    console.log(data.data);
    console.log("type", typeof data.data);
    const object = JSON.parse(data.data);
    console.log("songList", object.songList);
    setSongList([...object.songList])
  };

  const songs = [
    {
      title: "G線上のアリア",
      author: "ヨハン・セバスチャン・バッハ",
      isCasual: false,
    },
    {
      title: "夜想曲第2番",
      author: "フレデリック・ショパン",
      isCasual: false,
    },
    {
      title: "交響曲第9番『合唱』",
      author: "ルートヴィヒ・ヴァン・ベートーヴェン",
      isCasual: false,
    },
    {
      title: "ピアノ協奏曲第2番",
      author: "セルゲイ・ラフマニノフ",
      isCasual: false,
    },
    {
      title: "ブルグミュラーによる25の練習曲",
      author: "ヨハン・フリードリヒ・ブルグミュラー",
      isCasual: false,
    },
    {
      title: "Stand by Me",
      author: "ベン・E・キング",
      isCasual: true,
    },
    {
      title: "Let it Be",
      author: "ビートルズ",
      isCasual: true,
    },
    {
      title: "Don't Stop Believin'",
      author: "ジャーニー",
      isCasual: true,
    },
    {
      title: "L-O-V-E",
      author: "ナット・キング・コール",
      isCasual: true,
    },
    {
      title: "What a Wonderful World",
      author: "ルイ・アームストロング",
      isCasual: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-lg font-bold">Smartphone Layout</h1>
      </header>
      <main className="py-6 px-4">
        <h2 className="text-xl font-semibold mb-4">
          Welcome to the Smartphone Layout!
        </h2>
        <p className="mb-4">
          This layout is built with Next.js and Tailwind CSS.
        </p>
        <div className="w-full max-w-md mx-auto flex justify-center gap-4">
          <button
            onClick={async () => await generateList()}
            className="border-2 border-blue-300 text-gray-500 font-bold py-2 px-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md hover:shadow-lg transition duration-200 ease-in-out"
          >
            flute
          </button>
          <button className="border-2 border-blue-300 text-gray-500 font-bold py-2 px-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md hover:shadow-lg transition duration-200 ease-in-out">
            sax
          </button>
          <button className="border-2 border-blue-300 text-gray-500 font-bold py-2 px-4 rounded-full w-16 h-16 flex items-center justify-center shadow-md hover:shadow-lg transition duration-200 ease-in-out">
            piano
          </button>
        </div>
        <div>
          <input
            type="text"
            onChange={(event) => setOption(event.target.value)}
          />
        </div>
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

      <footer className="bg-blue-500 text-white py-4 px-6 mt-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </>
  );
}
