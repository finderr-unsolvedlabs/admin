import { CategoryApi } from "@/services/api/category";
import { TOption, TSelectorOptions } from "@/services/interfaces/common";
import React, { useEffect, useState } from "react";
import Select from "react-select";

type Props = {
  label?: string;
  isMulti?: boolean;
  value: TSelectorOptions;
  onchange: (items: TSelectorOptions) => void;
};

const CategorySelector = (props: Props) => {
  useEffect(() => {
    CategoryApi.list().then(({ data }) => {
      setoptions(
        data.map((cat) => ({
          label: cat.name,
          value: cat.slug,
        }))
      );
    });
  }, []);

  const [options, setoptions] = useState<TOption[]>([]);

  return (
    <div>
      <p className="font-medium mb-2">{props.label || "Select Category"}</p>
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
  );
};

export { CategorySelector };
