import Link from "next/link";
import Image from "next/legacy/image";
import { IProductModel } from "@/services/interfaces/common";
import { startCase } from "lodash";
import { useDispatch } from "react-redux";
// import { updateLoadedProductScrollPosition } from "@/store/loadedProductSlice";

interface IProp {
  products: IProductModel[];
  sign?: string;
}

export default function Album({ products, sign }: IProp) {
  const dispatch = useDispatch();

  return (
    <div className="m-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            href={`/products/${product.slug}`}
            key={product.slug}
            className="block"
            onClick={() => {
              // dispatch(updateLatestScrollPosition(window.scrollY));
            }}
          >
            <div className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg">
              <div className="relative w-full h-60 lg:h-80">
                <Image
                  className="object-cover group-hover:scale-105 transition duration-200 ease-linear"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={product.images[0].url}
                  src={
                    product.images[0]?.url ||
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                  }
                  alt={product.name}
                />
              </div>

              <div className="p-4">
                <p className="text-base font-semibold text-gray-900 truncate">
                  {startCase(product.brand.name)}
                </p>
                <p className="text-sm text-gray-500 font-light truncate">
                  {product.name}
                </p>
                <p className="font-semibold mt-2 text-gray-700 text-sm">
                  ₹ {product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
