import React, { useState, useEffect, RefObject } from "react";

interface IProp {
  video: RefObject<HTMLVideoElement>;
  totalCount: number;
  index: number;
}

const VideoProgressBar = ({ video, totalCount, index }: IProp) => {
  const [progress, setProgress] = useState(0);

  const componentsArray = Array(totalCount).fill(null);

  useEffect(() => {
    const updateProgress = () => {
      const currentTime = (video.current && video.current.currentTime) || 0;
      const duration = (video.current && video.current.duration) || 100;
      const progress = (currentTime / duration) * 100;

      requestAnimationFrame(() => {
        setProgress(progress);
      });
    };

    video.current &&
      video.current.addEventListener("timeupdate", updateProgress);

    return () => {
      video.current &&
        video.current.removeEventListener("timeupdate", updateProgress);
    };
  }, [video]);

  return (
    <>
      <div
        style={{
          gridTemplateColumns: `repeat(${totalCount}, minmax(0, 1fr))`,
        }}
        className={`absolute w-[98%] left-[1%] bg-transparent top-2 z-10 grid gap-1`}
      >
        {componentsArray.map((x, _index) => {
          if (_index === index) {
            return (
              <div key={_index} className="w-full h-1 bg-[#8e8e8e] rounded">
                <div
                  className="h-1 bg-white rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>
            );
          } else {
            return (
              <div
                key={_index}
                className={`${
                  _index > index ? "bg-[#8e8e8e]" : "bg-white"
                } w-full h-1 rounded`}
              ></div>
            );
          }
        })}
      </div>
    </>
  );
};

export { VideoProgressBar };
