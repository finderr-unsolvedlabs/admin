import { CategoryApi } from "@/services/api/category";
import { TOption } from "@/services/interfaces/common";
import React, { useEffect, useState } from "react";
import Select from "react-select";

type Props = {
  label?: string;
  value: TOption;
  onchange: (item: TOption | null) => void;
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
      <Select options={options} value={props.value} onChange={props.onchange} />
    </div>
  );
};

export { CategorySelector };
