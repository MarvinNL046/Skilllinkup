"use client";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrderButton({ gig, selectedPackage }) {
  const { convexUser } = useConvexUser();
  const createOrder = useMutation(api.marketplace.orders.create);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleOrder = async () => {
    if (!convexUser || !gig || !selectedPackage) return;

    setLoading(true);
    setError(null);
    try {
      const orderId = await createOrder({
        orderType: "gig",
        title: gig.title,
        amount: selectedPackage.price,
        currency: selectedPackage.currency || "EUR",
        deliveryDays: selectedPackage.deliveryDays,
        clientId: convexUser._id,
        freelancerId: gig.freelancerProfile._id,
        gigId: gig._id,
        gigPackageId: selectedPackage._id,
      });
      router.push(`/orders`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!convexUser) {
    return (
      <Link href="/login" className="ud-btn btn-thm">
        Sign in to Order <i className="fal fa-arrow-right-long" />
      </Link>
    );
  }

  return (
    <div>
      <button
        className="ud-btn btn-thm w-100"
        onClick={handleOrder}
        disabled={loading}
      >
        {loading ? "Creating Order..." : "Order Now"}
        {!loading && <i className="fal fa-arrow-right-long" />}
      </button>
      {error && <p className="text-danger mt-2 fz14">{error}</p>}
    </div>
  );
}
