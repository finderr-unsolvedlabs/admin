import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { fetchData } from "@services/api";
import CategoryList from "./CategoryList";

export default function CategoryDrawer({ handleClose }: any) {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const style = {
    color: "grey",
  };

  const selectedStyle = {
    color: "#4169E0",
  };

  React.useEffect(() => {
    if (tabSelected.currentTab === 1) {
      fetchData(`category/men`).then((res) => {
        console.log(res.data);
        setCategoryList(res.data.data);
      });
    } else if (tabSelected.currentTab === 2) {
      fetchData(`category/women`).then((res) => {
        console.log(res.data);
        setCategoryList(res.data.data);
      });
    } else if (tabSelected.currentTab === 3) {
      fetchData(`category/others`).then((res) => {
        console.log(res.data);
        setCategoryList(res.data.data);
      });
    }
  }, [tabSelected.currentTab]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="mx-auto px-4">
        <div className="mt-6 flex-row justify-between">
          <div className=" flex justify-between">
            <p className="font-bold text-lg md:text-2xl">Filters</p>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>
      {/*<!-- Component: Basic lg sized tab full width --> */}
      <section className="max-w-full" aria-multiselectable="false">
        <ul
          className="flex items-center"
          role="tablist"
          style={{
            margin: "0px",
            maxWidth: "100vw",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <li
            className="flex-1"
            role="presentation"
            style={{ padding: "5px", width: "3%" }}
          >
            <button
              className={`-mb-px inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t px-5 text-sm font-medium tracking-wide transition duration-300   disabled:cursor-not-allowed`}
              id="tab-label-1a"
              role="tab"
              aria-setsize="3"
              aria-posinset="1"
              // @ts-ignore
              tabIndex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
              aria-controls="tab-panel-1a"
              aria-selected={`${tabSelected.currentTab === 1 ? true : false}`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
              style={tabSelected.currentTab === 1 ? selectedStyle : style}
            >
              <span style={{ fontFamily: "Open Sans", fontWeight: "500" }}>
                MEN
              </span>
            </button>
          </li>
          <li
            className="flex-1"
            role="presentation"
            style={{ padding: "5px", width: "30%" }}
          >
            <button
              className={`-mb-px inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t px-5 text-sm font-medium tracking-wide transition duration-300   disabled:cursor-not-allowed`}
              id="tab-label-2a"
              role="tab"
              aria-setsize="3"
              aria-posinset="2"
              // @ts-ignore
              tabIndex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
              aria-controls="tab-panel-2a"
              aria-selected={`${tabSelected.currentTab === 2 ? true : false}`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
              style={tabSelected.currentTab === 2 ? selectedStyle : style}
            >
              <span style={{ fontFamily: "Open Sans", fontWeight: "500" }}>
                WOMEN
              </span>
            </button>
          </li>
          <li
            className="flex-1"
            role="presentation"
            style={{ padding: "5px", width: "30%" }}
          >
            <button
              className={`-mb-px inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t px-5 text-sm font-medium tracking-wide transition duration-300   disabled:cursor-not-allowed`}
              id="tab-label-3a"
              role="tab"
              aria-setsize="3"
              aria-posinset="3"
              // @ts-ignore
              tabIndex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
              aria-controls="tab-panel-3a"
              aria-selected={`${tabSelected.currentTab === 3 ? true : false}`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 3 })}
              style={tabSelected.currentTab === 3 ? selectedStyle : style}
            >
              <span style={{ fontFamily: "Open Sans", fontWeight: "500" }}>
                ACCESSORIES
              </span>
            </button>
          </li>
        </ul>
        <div className="">
          <div
            className={`${tabSelected.currentTab === 1 ? "" : "hidden"}`}
            id="tab-panel-1a"
            aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-1a"
            tabIndex={-1}
          >
            <CategoryList data={categoryList} closeDrawer={handleClose} />
          </div>
          <div
            className={` ${tabSelected.currentTab === 2 ? "" : "hidden"}`}
            id="tab-panel-2a"
            aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-2a"
            tabIndex={-1}
          >
            <CategoryList data={categoryList} closeDrawer={handleClose} />
          </div>
          <div
            className={` ${tabSelected.currentTab === 3 ? "" : "hidden"}`}
            id="tab-panel-3a"
            aria-hidden={`${tabSelected.currentTab === 3 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-3a"
            tabIndex={-1}
          >
            <CategoryList data={categoryList} closeDrawer={handleClose} />
          </div>
        </div>
      </section>
    </div>
  );
}
