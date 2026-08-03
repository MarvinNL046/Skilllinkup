import Image from "next/image";

export const BRAND_LOGO_SRC = "/images/logo/skilllinkup-brand.png";

export default function BrandLogo({
  alt = "Skilllinkup",
  className,
  height = 168,
  priority = false,
  style,
  width = 736,
}) {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={style}
      unoptimized
    />
  );
}
