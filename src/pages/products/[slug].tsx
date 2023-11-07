import { useEffect, useState } from "react";
import Qs from "qs";
import Navbar from "@components/Navbar";
import ImageModal from "@components/Product/ImageModal";
import Album from "@components/Utils/Album";
import Footer from "@components/Footer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShareIcon from "@mui/icons-material/Share";
import Divider from "@mui/material/Divider";
import { fetchData } from "@services/api";
import React from "react";
import StorePopUp from "@components/Store/StorePopUp";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { IProductPageData } from "@services/interfaces/pages/product";
import Head from "next/head";
import { useRouter } from "next/router";
import { BuyOnlinePopUp } from "@/components/BuyOnlinePopUp";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@/services/interfaces/redux";
import {
  setUserLoggedIn,
  setUserLoggingIn,
  updateProductLeadRequest,
} from "@/store/userSlice";
import { USER_TOKEN } from "@/utils/constants/cookiesName";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ slug: string }>
) {
  const slug = context.params?.slug;

  const productPageData = await fetchData(`website/pages/products/${slug}`);

  return {
    props: { data: productPageData.data.data },
  };
}

export default function SingleProduct({
  data: { product, more_from_brand, similar_products },
}: IProductPageData) {
  const router = useRouter();
  const slug = router.query.slug;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  // const [isBuyOnlineOpen, setIsBuyOnlineOpen] = useState(false);

  const user = useSelector((store: IStore) => store.user);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: any) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      <div>
        <Head>
          <title>{`Finderr - ${product.name}`}</title>
          <meta name="description" content={product.description} />
          <meta name="keywords" content={product.name} />
        </Head>
        <Navbar />

        <div className="sp mx-auto max-w-full px-4 lg:px-0">
          <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
            <div className="items-start justify-around lg:flex lg:space-x-8">
              <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
                <div className="w-full xl:flex xl:flex-row-reverse">
                  <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[650px]">
                    <div
                      className="relative flex items-center justify-center"
                      onClick={() => setIsOpen(true)}
                    >
                      <img
                        alt={product.name}
                        src={
                          product.images[0]?.url ||
                          `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80`
                        }
                        loading="lazy"
                        width={650}
                        height={590}
                        className="rounded-lg object-cover md:h-[300px] md:w-full lg:h-full"
                      />
                    </div>
                    <div className="absolute top-2/4 z-10 flex w-full items-center justify-between"></div>
                  </div>
                  <div
                    className="flex gap-2 xl:flex-col"
                    onClick={() => setIsOpen(true)}
                  >
                    {/* FIXME: 0 TO 5 slicing operation */}
                    {product.images.slice(0, 5).map((image, index) => (
                      <div
                        key={image.url}
                        className="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 "
                      >
                        <img
                          alt={`Product ${index}`}
                          src={image.url}
                          decoding="async"
                          loading="lazy"
                          className="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
                <div className="pb-2">
                  <p
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {product.brand.name}
                  </p>

                  <p
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "medium",
                      fontSize: "16px",
                    }}
                  >
                    {product.name}
                  </p>

                  <p
                    style={{
                      marginTop: "10px",
                      fontFamily: "Open Sans",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    ₹ {product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="pb-2" />
                <div className="flex gap-2">
                  <div
                    className="flex-1 cursor-pointer text-center bg-brand border-brand border text-white rounded-md py-2 px-3 font-semibold"
                    onClick={() => setStoreOpen(true)}
                  >
                    Try at Store
                  </div>
                  <div
                    className="flex-1 cursor-pointer text-center border-brand border bg-white text-brand rounded-md py-2 px-3 font-semibold"
                    onClick={() => {
                      if (!user.userLoggedIn) {
                        dispatch(setUserLoggingIn(true));
                      }
                      dispatch(
                        updateProductLeadRequest({ productSlug: product.slug })
                      );
                    }}
                  >
                    Buy Online
                  </div>
                  <div className="border border-[#666] rounded-md">
                    <CopyToClipboard
                      text={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${router.asPath}`}
                    >
                      <IconButton
                        onClick={handleClick({
                          vertical: "bottom",
                          horizontal: "center",
                        })}
                      >
                        <ShareIcon
                          style={{
                            color: "#666666",
                            fontSize: "28px",
                          }}
                        />
                      </IconButton>
                    </CopyToClipboard>
                  </div>
                </div>

                <div className="pt-6 xl:pt-8">
                  <p
                    className=" mb-3"
                    style={{ fontFamily: "Open Sans", fontWeight: "500" }}
                  >
                    Product Specification
                  </p>
                  <p
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "300",
                      marginBottom: "10px",
                      // @ts-ignore
                      text: "ellipsis",
                    }}
                  >
                    {product.description}
                  </p>
                </div>
                <Divider />
                <Link href={`/brands/${product.brand.slug}`}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: "10px",
                      alignItems: "center",
                    }}
                  >
                    <p
                      className="mb-3"
                      style={{
                        fontFamily: "Open Sans",
                        fontWeight: "500",
                        fontSize: "16px",
                      }}
                    >
                      About Brand
                    </p>

                    <ChevronRightIcon
                      style={{
                        color: "#666666",
                        fontSize: "28px",
                        marginBottom: "17px",
                      }}
                    />
                  </div>
                </Link>
                <Divider />
              </div>
            </div>
          </div>
        </div>
        <ImageModal
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          images={product.images.map((x) => x.url)}
          productName={product.name}
        />
        <div>
          <div className="mx-auto px-4">
            <div className="mt-6 flex justify-between">
              <div className="space-y-6 md:w-3/4">
                <p className="font-bold text-lg md:text-2xl">
                  Similar Products
                </p>
              </div>
              <Link
                href={{
                  pathname: "/search",
                  query: Qs.stringify(
                    {
                      filters: {
                        categories: [product.category.slug],
                      },
                    },
                    { arrayFormat: "brackets" }
                  ),
                }}
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "end",
                    color: "#4169E1",
                    fontWeight: "500",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  View More
                  <ChevronRightIcon />
                </p>
              </Link>
            </div>
          </div>
          <Album products={similar_products} />
        </div>
        <div>
          <div className="mx-auto px-4">
            <div className="mt-6 flex justify-between">
              <div className="space-y-6 md:w-3/4">
                <p className="font-bold text-lg md:text-2xl">
                  More From {product.brand.name}
                </p>
              </div>
              <Link
                href={{
                  pathname: "/search",
                  query: Qs.stringify(
                    {
                      filters: {
                        categories: [product.category.slug],
                      },
                    },
                    { arrayFormat: "brackets" }
                  ),
                }}
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "end",
                    color: "#4169E1",
                    fontWeight: "500",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  View More
                  <ChevronRightIcon />
                </p>
              </Link>
            </div>
          </div>
          <Album products={more_from_brand} />
        </div>

        <Footer />
      </div>

      <StorePopUp
        open={storeOpen}
        handleClose={() => setStoreOpen(false)}
        stores={product.stores}
        brandName={product.brand.name}
      />
      {/* {slug && (
        <BuyOnlinePopUp
          productSlug={slug as string}
          isVisible={isBuyOnlineOpen}
          handleClose={() => setIsBuyOnlineOpen(false)}
        />
      )} */}

      <Snackbar
        anchorOrigin={{ vertical, horizontal } as any}
        open={open}
        onClose={handleClose}
        message="Link copied to clipboard"
        key={vertical + horizontal}
      />
    </>
  );
}
