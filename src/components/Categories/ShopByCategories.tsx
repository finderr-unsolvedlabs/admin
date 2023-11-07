import React from "react";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/legacy/image";
import Grid from "@mui/material/Grid";
import { startCase } from "lodash";
import { getFirstWord } from "@/utils/helper_functions/getFirstWord";
import { IHomeCat } from "@/services/interfaces/pages/home";
import QueryString from "qs";
import SectionWithLoadMore from "../PageSections/SectionWithLoadMore";

interface IProps {
  categoryList: IHomeCat[];
}

export default function ShopByCategories({ categoryList }: IProps) {
  return (
    <>
      <SectionWithLoadMore title="Shop by Categories">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryList?.map((category, index) => (
            <li key={index}>
              <div>
                <Link
                  href={{
                    pathname: `/search`,
                    query: category.children
                      ? QueryString.stringify({
                          filters: {
                            categories: [...category.children, category.slug],
                          },
                        })
                      : QueryString.stringify({
                          filters: { categories: [category.slug] },
                        }),
                  }}
                >
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full overflow-hidden">
                    <Image
                      alt={category.name}
                      src={category.image}
                      height={200}
                      width={200}
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={category.image}
                      className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full"
                    />
                  </div>
                </Link>
                <h2>{startCase(getFirstWord(category.name))}</h2>
              </div>
            </li>
          ))}
        </ul>
      </SectionWithLoadMore>
    </>
  );
}
