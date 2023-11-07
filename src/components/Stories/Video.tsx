import React, { useEffect, useRef, useState } from "react";
import { VideoProgressBar } from "./VideoProgressBar";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CloseIcon from "@mui/icons-material/Close";
import { IAction } from "@/services/interfaces/common";
import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

export interface IStorySlide {
  url: string;
  title: string;
  action?: IAction;
}
interface IProps {
  stories: IStorySlide[];
  closeAction: () => void;
  onAllEnd: () => void;
  onBackOnFirst: () => void;
}

const Video = ({ stories, closeAction, onAllEnd, onBackOnFirst }: IProps) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    setCurrentStoryIndex(0);
  }, [stories[0].title]);

  const onVideoClick = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(!playing);
      } else {
        videoRef.current.play();
        setPlaying(!playing);
      }
    }
  };

  const onVideoEnd = () => {
    if (stories.length - 1 === currentStoryIndex) {
      onAllEnd();
    } else {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const onVideoPrev = () => {
    if (currentStoryIndex === 0) {
      onBackOnFirst();
    } else {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  }, [currentStoryIndex, stories[0].url]);

  if (!stories[currentStoryIndex]) {
    return <div></div>;
  }
  return (
    <div className="fixed top-0 left-0 w-screen z-[2] bg-black">
      <div className="w-screen md:w-[56vh] mx-auto h-screen overflow-hidden relative">
        <div className="z-[5] absolute w-screen h-32 bg-gradient-to-b from-black to-transparent bg-opacity-30" />
        <VideoProgressBar
          video={videoRef}
          totalCount={stories.length}
          index={currentStoryIndex}
        />
        <div className="absolute top-4 z-10 left-[1%] right-[1%] flex justify-between items-center">
          <div className="font-semibold text-lg text-white ml-2">
            {stories[currentStoryIndex].title}
          </div>
          <IconButton onClick={closeAction}>
            <CloseIcon className="cursor-pointer text-white" />
          </IconButton>
        </div>
        {/* SECTION: video play pause over */}
        <div className="w-screen h-5/6 grid grid-cols-3 bg-transparent absolute z-10 top-[42px]">
          <div onClick={onVideoPrev}></div>
          <div onClick={onVideoClick}></div>
          <div onClick={onVideoEnd}></div>
        </div>
        <video
          className="absolute
        object-cover w-full h-full"
          ref={videoRef}
          onClick={onVideoClick}
          src={stories[currentStoryIndex].url}
          onEnded={onVideoEnd}
          playsInline
        ></video>
        {/* SECTION: bottom action button */}
        {stories[currentStoryIndex].action?.label ? (
          <Link
            onClick={closeAction}
            href={stories[currentStoryIndex].action?.url || "#"}
            target="_blank"
          >
            <div className="flex justify-between items-center bg-white bg-opacity-25 px-4 min-w-[150px] py-2 rounded-md">
              <div className="text-white text-md font-semibold">
                {stories[currentStoryIndex].action?.label}
              </div>
              <NavigateNextIcon className="cursor-pointer text-white" />
            </div>
          </Link>
        ) : (
          <></>
        )}
        {/* <div className="absolute bottom-10 z-10 left-[1%] right-[1%] flex justify-center items-center"></div> */}

        <div className="z-[5] absolute bottom-0 w-screen h-32 bg-gradient-to-t from-black to-transparent bg-opacity-30" />
        {/* SECTION: overlay visible on video paused */}
        {!playing && <PauseOverlay onVideoClick={onVideoClick} />}
      </div>
    </div>
  );
};

interface IPOProps {
  onVideoClick: () => void;
}

const PauseOverlay = ({ onVideoClick }: IPOProps) => {
  return (
    <div className="absolute z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <IconButton onClick={onVideoClick}>
        <PlayCircleIcon className="text-white" sx={{ fontSize: 60 }} />
      </IconButton>
    </div>
  );
};

export default Video;
