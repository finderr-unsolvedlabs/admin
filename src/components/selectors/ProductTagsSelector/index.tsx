import { ProductTagApi } from "@/services/api/productTags";
import { IProductTagModel } from "@/services/interfaces/common";
import { Dictionary, groupBy, includes, random, startCase } from "lodash";
import React, { useEffect, useState } from "react";

type Props = { tags: string[]; onToggle: (slug: string) => void };

const index = ({ tags, onToggle }: Props) => {
  const [tagsList, setTagsList] = useState<Dictionary<IProductTagModel[]>>();
  const [tagGroups, setTagGroups] = useState<string[]>([]);

  useEffect(() => {
    ProductTagApi.list().then(({ data }) => {
      const tags = groupBy(data, "groupName");
      setTagGroups(Object.keys(tags));
      setTagsList(tags);
    });
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {tagGroups.map((groupName) => {
        return (
          <div>
            <div className="font-medium mb-2">{startCase(groupName)}</div>
            <div className="flex flex-wrap gap-3">
              {tagsList &&
                tagsList[groupName].map((tag) => (
                  <div
                    onClick={() => onToggle(tag.slug)}
                    className={`p-2 rounded min-w-[50px] text-center cursor-pointer
                     ${
                       includes(tags, tag.slug)
                         ? "bg-brand text-white"
                         : "text-gray-600 border border-brand"
                     }
                      `}
                  >
                    {tag.name}
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default index;
