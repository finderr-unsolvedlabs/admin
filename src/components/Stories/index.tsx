import { blockBodyScroll } from "@/store/appSlice";
import Image from "next/legacy/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IStoryModel } from "@/services/interfaces/common";
import { Dictionary } from "lodash";
import Video, { IStorySlide } from "./Video";

type Props = { stories: Dictionary<IStoryModel[]> };

function StoriesComponent({ stories }: Props) {
  const dispatch = useDispatch();
  const storyEntities = Object.keys(stories);
  const [activeStories, setActiveStories] = useState<IStorySlide[]>();
  const [currentEntityIndex, setCurrentEntityIndex] = useState<number>(-1);

  const convertToStoryProps = (items: IStoryModel[]): IStorySlide[] => {
    return items.map((x) => {
      return {
        url: x.media.url,
        title: x.title,
        action: x.action,
      };
    });
  };

  return (
    <div className="mb-5 flex gap-3 w-full overflow-x-auto no-sidebar-visibility">
      {storyEntities.map((storyKey, index) => {
        const meta = stories[storyKey][0];
        return (
          <div key={storyKey} className="w-[72px]">
            <div className="relative h-[72px] w-[72px] flex justify-center items-center rounded-full  bg-gradient-to-r from-brand to-[#0d4389]">
              <div className="bg-white h-[68px] w-[68px] flex justify-center items-center rounded-full">
                <div
                  className="h-16 w-16 relative overflow-hidden rounded-full"
                  onClick={() => {
                    dispatch(blockBodyScroll(true));
                    setActiveStories(convertToStoryProps(stories[storyKey]));
                    setCurrentEntityIndex(index);
                  }}
                >
                  <Image
                    src={meta.groupLogo.url}
                    alt={meta.title}
                    placeholder="blur"
                    blurDataURL={meta.groupLogo.url}
                    layout="fill"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* SECTION: BOTTOM TEXT */}
            <div className="text-xs text-center truncate mt-0.5 text-zinc-900">
              {meta.title}
            </div>
          </div>
        );
      })}
      {activeStories && (
        <Video
          stories={activeStories || []}
          closeAction={() => {
            setActiveStories(undefined);
            dispatch(blockBodyScroll(false));
          }}
          onAllEnd={() => {
            if (currentEntityIndex < storyEntities.length - 1) {
              setActiveStories(
                convertToStoryProps(
                  stories[storyEntities[currentEntityIndex + 1]]
                )
              );
              setCurrentEntityIndex(currentEntityIndex + 1);
            } else {
              // All stories ends here
              setActiveStories(undefined);
              dispatch(blockBodyScroll(false));
            }
          }}
          onBackOnFirst={() => {
            if (currentEntityIndex != 0) {
              setActiveStories(
                convertToStoryProps(
                  stories[storyEntities[currentEntityIndex - 1]]
                )
              );
              setCurrentEntityIndex(currentEntityIndex - 1);
            }
          }}
        />
      )}
    </div>
  );
}

export { StoriesComponent };
