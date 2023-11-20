import React from "react";

type Props = {
  SidebarComponent: React.ReactNode;
  MainComponent: React.ReactNode;
};

function SidebarLayout({ SidebarComponent, MainComponent }: Props) {
  return (
    <div className="w-screen h-screen overflow-hidden flex gap-10 p-3 bg-gray-50">
      <div className="h-full w-96 ">{SidebarComponent}</div>
      <div className="h-full flex-1 overflow-y-auto bg-white rounded">
        {MainComponent}
      </div>
    </div>
  );
}

export { SidebarLayout };
