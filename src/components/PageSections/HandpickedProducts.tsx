import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Album from "@components/Utils/Album";
import Link from "next/link";
import { IAction, IProductModel } from "@/services/interfaces/common";

interface IProps {
  products: IProductModel[];
  title: string;
  action: IAction;
}

function HandpickedProducts({ products, title, action }: IProps) {
  return (
    <div>
      <div className="mx-auto px-4">
        <div className="mt-6 flex justify-between">
          <div className="space-y-6 md:w-3/4">
            <p className="font-bold text-lg md:text-2xl">{title}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href={action.url}>
              <p className="font-medium items-end text-brand">
                {action.label}
                <ChevronRightIcon />
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Album products={products} />
    </div>
  );
}

export { HandpickedProducts };
