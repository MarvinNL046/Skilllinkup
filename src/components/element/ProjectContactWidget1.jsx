import Image from "next/image";

export default function ProjectContactWidget1({ clientName, clientAvatar, location, categoryName }) {
  return (
    <>
      <div className="freelancer-style1 service-single mb-0 bdrs8">
        <h4>About Buyer</h4>
        <div className="wrapper d-flex align-items-center mt20">
          <div className="thumb position-relative mb25">
            <Image
              height={60}
              width={60}
              className="rounded-circle mx-auto"
              src={clientAvatar || "/images/team/default-avatar.svg"}
              alt={clientName || "Buyer"}
            />
          </div>
          <div className="ml20">
            <h5 className="title mb-1">{clientName || "Anonymous Buyer"}</h5>
            {categoryName && <p className="mb-0">{categoryName}</p>}
          </div>
        </div>
        <hr className="opacity-100" />
        {location && (
          <div className="details">
            <div className="fl-meta d-flex align-items-center">
              <span className="meta fw500 text-start">
                Location
                <br />
                <span className="fz14 fw400">{location}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
