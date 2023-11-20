// import {  } from "@/services/api/";
import { BrandApi } from "@/services/api/brand";
import { TOption, TSelectorOptions } from "@/services/interfaces/common";
import React, { useEffect, useState } from "react";
import Select from "react-select";

type Props = {
  label?: string;
  isMulti?: boolean;
  value: TSelectorOptions;
  onchange: (items: TSelectorOptions) => void;
};

const BrandSelector = (props: Props) => {
  useEffect(() => {
    BrandApi.list().then(({ data }) => {
      setoptions(
        data.map((brand) => ({
          label: brand.name,
          value: brand.slug,
        }))
      );
    });
  }, []);

  const [options, setoptions] = useState<TOption[]>([]);

  return (
    <div>
      <p className="font-medium mb-2">{props.label || "Select Brand"}</p>
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

export { BrandSelector };
