import { IProductModel } from "@/services/interfaces/common";
import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import randomColor from "randomcolor";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Link from "next/link";

type Props = {
  product: IProductModel;
  isSelected: boolean;
  onMediaClick: (slug: string) => void;
};

const BulkTaggingProductCard = ({
  product,
  isSelected,
  onMediaClick,
}: Props) => {
  return (
    <div key={product.slug} className={`relative`}>
      <div
        className={
          isSelected
            ? `absolute h-fit w-fit top-0 left-0 bg-black bg-opacity-75 flex justify-center items-center p-2`
            : "hidden"
        }
      >
        <TaskAltIcon sx={{ fontSize: 50, color: "#fff" }} />
      </div>
      <Card sx={{ maxWidth: 345 }} key={product.slug}>
        <div
          className="cursor-pointer"
          onClick={() => {
            onMediaClick(product.slug);
          }}
        >
          <CardMedia
            sx={{ height: 250 }}
            image={product.images[0].url}
            title={product.images[0].slug}
          />
        </div>
        <CardContent>
          <div className="flex text-sm font-medium cursor-pointer">
            <Link href={`/admin/products/${product.slug}`} target="_blank">
              <p className="flex-1">{product.name}</p>
            </Link>
            <div
              onClick={() => {
                navigator.clipboard.writeText(product.slug);
              }}
            >
              <ContentCopyIcon className="text-sm text-gray-500" />
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag) => {
              return (
                <p
                  key={tag.slug}
                  style={{
                    color: randomColor({
                      luminosity: "dark",
                    }),
                  }}
                  className={`text-sm leading-4 bg-slate-100`}
                >
                  {tag.name}
                </p>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { BulkTaggingProductCard };
