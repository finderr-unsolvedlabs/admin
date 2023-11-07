import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";

export default function CategoryList({ data }: any) {
  return (
    <div>
      {data?.map((category: any, index: number) => (
        <Link key={index} href={`/categories/${category.cid}`}>
          <ListItem component="div" disablePadding>
            <ListItemButton>
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontFamily: "Open Sans",
                  color: "grey",
                }}
              >
                {category.Subcategory}
              </p>
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </div>
  );
}
