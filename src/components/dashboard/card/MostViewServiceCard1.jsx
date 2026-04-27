import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function MostViewServiceCard1({ data }) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center gap-3 mb-3">
      <div className="flex-shrink-0 rounded-md overflow-hidden">
        <Image
          height={91}
          width={122}
          src={data.img}
          alt="thumb"
          className="object-cover"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h6 className="text-sm font-semibold mb-2">
          <Link href="/services" className="hover:text-primary">
            {data.title}
          </Link>
        </h6>
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="inline-flex items-center gap-1.5 text-sm">
            <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
            <span className="font-medium text-foreground">{data.rating}</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-0">
            Starting at{" "}
            <span className="text-base font-medium text-foreground ml-1">
              ${data.price}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
