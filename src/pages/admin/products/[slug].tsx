import { ProductApi } from "@/services/api/product";
import { IProductModel, TAlerts, TOption } from "@/services/interfaces/common";
import { add, concat, includes, remove, startCase, without } from "lodash";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { CategorySelector } from "@/components/selectors/CategorySelector";
import ProductTagSelector from "@/components/selectors/ProductTagsSelector";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useState } from "react";
import { USER_TOKEN } from "@/utils/constants/cookiesName";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ slug: string }>
) {
  try {
    const slug = context.params?.slug;
    if (slug) {
      const productPageData = await ProductApi.getProduct(
        slug,
        context.req.cookies[USER_TOKEN]
      );
      return {
        props: { ...productPageData.data },
      };
    } else {
      throw "slug is not specified";
    }
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { Location: "/" });
    context.res.end();

    return {
      props: {},
    };
  }
}

export interface IProductFrom {
  category: TOption;
  tags: string[];
}

type Props = {
  product: IProductModel;
  nextProduct: string;
};
const ProductPage = ({ product, nextProduct }: Props) => {
  const router = useRouter();

  const [alerts, setAlerts] = useState<TAlerts[]>([]);

  const onCategoryChange = (item: TOption | null) => {
    if (item) {
      formik.setFieldValue("category", item);
    }
  };

  const onTagToggle = (slug: string) => {
    let updated: string[];
    if (includes(formik.values.tags, slug)) {
      updated = without(formik.values.tags, slug);
    } else {
      updated = concat(formik.values.tags, slug);
    }
    formik.setFieldValue("tags", updated);
  };

  console.log(product);

  const initialState: IProductFrom = {
    category: {
      label: product.category.name,
      value: product.category.slug,
    },
    tags: product.tags.map((x) => x.slug),
  };

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      ProductApi.update(product.slug, {
        category: values.category.value,
        tags: values.tags,
      })
        .then(() => {
          setAlerts([
            {
              title: "Success!",
              description: "product updated successfully.",
              type: "success",
            },
          ]);
          setTimeout(() => {
            window.location.href = `/admin/products/${nextProduct}`;
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setAlerts([
            {
              title: "failed!",
              description: err.message,
              type: "error",
            },
          ]);
        });
    },
  });

  return (
    <>
      <div className="w-11/12 mx-auto flex my-10 gap-5">
        <div className="w-2/5">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {product.images.map((image) => (
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={image.url}
                  alt={image.slug}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/5 flex flex-col gap-5">
          <div className="font-semibold text-xl">{startCase(product.name)}</div>
          <div>
            <div className="font-medium mb-2">Description:</div>
            {product.description ? (
              <p className="text-gray-600">{product.description}</p>
            ) : (
              <span className="text-gray-500 italic font-light">
                no description
              </span>
            )}
          </div>

          <div className="flex gap-14">
            <div>
              <div className="font-medium mb-2">Relevance:</div>
              <p className="text-gray-600">{product.relevance}</p>
            </div>
            <div>
              <div className="font-medium mb-2">Price:</div>
              <p className="text-gray-600">
                {product.price.toLocaleString("en-In")}
              </p>
            </div>
            <div>
              <div className="font-medium mb-2">Brand:</div>
              <p className="text-gray-600">{product.brand.name}</p>
            </div>
          </div>

          <div>
            <CategorySelector
              value={formik.values.category}
              onchange={(item) => onCategoryChange(item)}
            />
          </div>

          <div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-400" />
            <div className="text-xl text-gray-500 font-semibold mb-5">
              Tags:
            </div>

            <ProductTagSelector
              tags={formik.values.tags}
              onToggle={onTagToggle}
            />
          </div>

          {/* SECTION: action buttons */}
          <div className="flex justify-between gap-10 mt-10">
            <div
              className="px-3 flex justify-center text-lg cursor-pointer items-center flex-1 gap-1 py-2 border border-brand rounded-lg text-brand font-medium"
              onClick={() => {
                window.location.href = `/admin/products/${nextProduct}`;
                // router.push(`/admin/products/${nextProduct}`, {});
              }}
            >
              Next <ArrowForward />
            </div>
            <div
              className="bg-brand text-white text-lg text-center cursor-pointer font-medium px-5 py-2 rounded-lg flex-1"
              onClick={() => formik.handleSubmit()}
            >
              Save
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: page Alerts */}

      {alerts.map((_alert) => (
        <Snackbar
          open
          onClose={() => {
            setAlerts([]);
          }}
        >
          <Alert severity={_alert.type} className="min-w-[300px]">
            <AlertTitle className="font-bold uppercase">
              {_alert.title}
            </AlertTitle>
            {_alert.description}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default ProductPage;
