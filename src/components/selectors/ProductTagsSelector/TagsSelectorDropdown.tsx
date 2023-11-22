import { ProductTagApi } from "@/services/api/productTags";
import { TOption, TSelectorOptions } from "@/services/interfaces/common";
import { startCase } from "lodash";
import React, { useEffect, useState } from "react";
import Select from "react-select";

type Props = {
  label?: string;
  isMulti?: boolean;
  value: TSelectorOptions;
  onchange: (items: TSelectorOptions) => void;
  withSelectAll?: boolean;
};

const TagsSelectorDropdown = (props: Props) => {
  useEffect(() => {
    ProductTagApi.list().then(({ data }) => {
      setoptions(
        data.map((item) => ({
          label: `${item.name} - ${startCase(item.groupName)}`,
          value: item.slug,
        }))
      );
    });
  }, []);

  const [options, setoptions] = useState<TOption[]>([]);

  return (
    <div className="flex items-end gap-4">
      <div className="flex-1">
        <p className="font-medium mb-2">{props.label || "Select Tags"}</p>
        <Select
          options={options}
          value={props.value}
          isMulti={props.isMulti}
          onChange={(options) => {
            const _options = options as TOption | TOption[] | null;
            props.onchange(_options || null);
          }}
        />
      </div>

      {props.withSelectAll && (
        <div
          className="border border-gray-400 text-gray-400 h-fit py-2 px-8 rounded leading-5 cursor-pointer hover:bg-gray-400 hover:text-white"
          onClick={() => {
            props.onchange(options);
          }}
        >
          Select all
        </div>
      )}
    </div>
  );
};

export { TagsSelectorDropdown };
