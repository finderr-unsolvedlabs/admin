import Link from "next/link";
import { startCase } from "lodash";
import Image from "next/legacy/image";

interface IProp {
  cards: { title: string; link: string; image: string }[];
}

function FullImageSubTitleCard({ cards }: IProp) {
  return (
    <main className="w-full overflow-hidden">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {cards.map(({ title, link, image }) => (
          <Link href={link} className="block" key={title}>
            <div className="relative  h-0 pb-[100%] rounded overflow-hidden border border-gray-500">
              <Image
                src={image}
                alt={title}
                placeholder="blur"
                blurDataURL={image}
                layout="fill"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 w-full h-full p-2 flex items-start justify-end text-white">
                <div className="text-sm font-semibold bg-black bg-opacity-60 p-1 md:p-2 rounded">
                  <h3>{startCase(title.toLocaleLowerCase())}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export { FullImageSubTitleCard };
