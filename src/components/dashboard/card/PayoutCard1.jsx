import { Badge } from "@/components/ui/badge";

const STATUS_VARIANTS = {
  1: "success",
  2: "info",
  3: "warning",
};

export default function PayoutCard1({ data }) {
  const variant = STATUS_VARIANTS[data.status] ?? "muted";

  return (
    <tr>
      <td data-label="Amount" className="font-medium align-middle">
        ${(data?.amount ?? 0).toFixed(2)}
      </td>
      <td data-label="Date" className="align-middle">
        {data.date}
      </td>
      <td data-label="Method" className="align-middle">
        {data.method}
      </td>
      <td data-label="Status" className="align-middle">
        <Badge variant={variant}>Pending</Badge>
      </td>
    </tr>
  );
}
