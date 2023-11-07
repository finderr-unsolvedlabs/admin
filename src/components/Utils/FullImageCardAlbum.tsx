import Link from "next/link";
import { startCase } from "lodash";
import Image from "next/legacy/image";

interface IProp {
  cards: { title: string; link: string; image: string }[];
}

export default function FullImageCardAlbum({ cards }: IProp) {
  return (
    <main className="w-full overflow-hidden">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {cards.map(({ title, link, image }) => (
          <Link href={link} className="block" key={title}>
            <div className="relative h-40 md:h-60 xl:h-72 rounded overflow-hidden shadow-md">
              <Image
                src={image}
                alt={title}
                placeholder="blur"
                blurDataURL={image}
                layout="fill"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 w-full h-full bg-gray-900 bg-opacity-50 p-2 flex items-end text-white">
                <h2 className="text-sm font-semibold">
                  {startCase(title.toLocaleLowerCase())}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
