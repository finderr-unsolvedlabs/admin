import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Album from "@components/Utils/Album";
import { fetchData } from "@services/api";
import ReactGA from "react-ga4";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { ICategoryPage } from "@/services/interfaces/pages/category";
import { useInView } from "react-intersection-observer";
import { unionBy } from "lodash";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ slug: string }>
) {
  const slug = context.params?.slug;

  const pageData = await fetchData(
    `website/pages/categories/${slug}?page=1&limit=12`
  );

  ReactGA.event({
    category: "User",
    action: `Viewed Category Page (CID: ${slug})`,
  });

  return {
    props: { data: pageData.data },
  };
}

interface IProp {
  data: ICategoryPage;
}

export default function CategoryPage({ data: { category, products } }: IProp) {
  const router = useRouter();

  const [productsData, setProductsData] = useState(products);
  const [page, setPage] = useState(1);
  let limit = 12;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchData(
        `website/pages/categories/${router.query.slug}?page=${
          page + 1
        }&limit=12`
      )
        .then((response) => {
          setPage(page + 1);
          const allProducts = unionBy(
            [...productsData, ...response.data.products],
            "slug"
          );
          setProductsData(allProducts);
        })
        .catch((err) => {
          console.log(`\n\n apppa \n\n`);
        });
    }
  }, [inView]);

  const handleReset = () => {
    // sessionStorage.removeItem("scrollPositionCategory");
    router.back();
  };

  return (
    <div>
      <div
        className="z-10"
        style={{ position: "fixed", width: "100vw", backgroundColor: "white" }}
      >
        <div className="mx-auto px-4 bg-white">
          <div className="mt-6 flex-row justify-between">
            <div className="flex justify-between">
              <p className="font-bold text-lg md:text-2xl">{category.name}</p>
              <CloseIcon onClick={handleReset} style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12">
        <Album products={productsData} sign="category" />
      </div>
      <div id="intersection-observer" ref={ref} />
    </div>
  );
}
