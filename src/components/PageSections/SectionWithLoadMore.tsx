import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

const SectionWithLoadMore = ({ children, title }: Props) => {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h3 className="font-semibold uppercase text-[15px]">{title}</h3>
      </div>
      {children}
      <div>Load More</div>
    </div>
  );
};

export default SectionWithLoadMore;
