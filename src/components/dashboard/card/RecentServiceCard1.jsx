import Image from "next/image";

export default function RecentServiceCard1({ data }) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-start gap-3 mb-3">
      <div className="flex-shrink-0 rounded-md overflow-hidden">
        <Image
          height={60}
          width={60}
          src={data.img}
          alt="thumb"
          className="object-cover h-[60px] w-[60px]"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h6 className="text-sm font-semibold mb-2">
          Medium. <span className="text-primary">has purchased</span> I will deal with
          your item Description and assets
        </h6>
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <p className="text-xs text-[var(--text-secondary)] mb-0">February 26, 2021</p>
          <p className="text-sm font-medium text-foreground mb-0">$983</p>
        </div>
      </div>
    </div>
  );
}
