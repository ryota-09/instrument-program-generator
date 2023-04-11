import React, { FC } from "react";

type Props = {
  loading: boolean;
  src: string;
};

const LoadingOverlay: FC<Props> = ({ loading, src }) => {
  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="p-4 bg-white rounded shadow-xl">
        <p className="text-xs font-bold">AI が頑張って<br />プログラムを作成しています...</p>
        <img className="block w-48 h-48 animate-sway" src={src} alt="Loading" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
