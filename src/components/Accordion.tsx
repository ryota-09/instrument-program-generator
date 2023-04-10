import axios from "axios";
import { FC, useState } from "react";

type Props = {
  title: string;
  author: string;
  isCasual: boolean;
};

const Accordion: FC<Props> = ({ title, author, isCasual }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetVideoId, setTargetVideoId] = useState("");

  const fetchVideo = async (keyWord: string) => {
    const data = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyWord}&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`
    );
    return data.data.items[0].id.videoId;
  };

  const handleAccordionClick = async (keyWord: string) => {
    setIsOpen(!isOpen);
    try {
      const targetId = await fetchVideo(keyWord);
      setTargetVideoId(targetId);
    } catch {
      setTargetVideoId("vWfTe5MHOIk");
    }
  };

  return (
    <div className="bg-white border-t border-b shadow-lg">
      <button
        className={
          "w-full px-6 py-4 font-bold text-left text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-between"
        }
        onClick={() => handleAccordionClick(`${author} ${title}`)}
      >
        {title}
        <svg
          className={`w-6 h-6 text-blue-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      <div
        className={`px-6 overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <h3 className="mt-6 text-lg font-semibold mb-4">{title}</h3>
        <p className="my-3">author: {author}</p>
        <div className="my-4">
          {isCasual ? (
            <span className="p-2 bg-blue-300 rounded-md text-gray-600">
              casual
            </span>
          ) : (
            <span className="p-2 bg-gray-300 rounded-md text-gray-600">
              clacis
            </span>
          )}
        </div>
        <div className="mb-6 bg-white shadow-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${targetVideoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default Accordion;
