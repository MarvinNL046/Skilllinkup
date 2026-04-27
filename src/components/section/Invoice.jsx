"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Printer } from "lucide-react";

export default function Invoice() {
  const printHandler = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section className="py-12 bg-[var(--surface-2)]">
      <div className="container">
        <div className="flex justify-end mb-6">
          <Button onClick={printHandler}>
            <Printer className="mr-1 h-4 w-4" />
            Print this invoice
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <Image
                height={40}
                width={133}
                src="/images/header-logo-dark.svg"
                alt="logo"
              />
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-foreground">Invoice #</h3>
                <h5 className="text-2xl">0043128641</h5>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6 mt-12 mb-12">
              <div>
                <div className="mb-1 font-medium text-foreground">Invoice date:</div>
                <h6 className="text-base font-medium mb-0">03/10/2022</h6>
              </div>
              <div>
                <div className="mb-1 font-medium text-foreground">Due date:</div>
                <h6 className="text-base font-medium mb-0">03/10/2022</h6>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-5">Supplier</h4>
                <h6 className="text-base font-medium">Jobio LLC</h6>
                <p className="text-foreground">
                  2301 Ravenswood Rd Madison,
                  <br className="hidden lg:block" />
                  WI 53711
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-5">Customer</h4>
                <h6 className="text-base font-medium">John Doe</h6>
                <p className="text-foreground">
                  329 Queensberry Street, North Melbourne
                  <br className="hidden lg:block" />
                  VIC 3051, Australia.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-default)]">
                    <th className="text-left py-3 font-semibold">Description</th>
                    <th className="text-left py-3 font-semibold">Price</th>
                    <th className="text-left py-3 font-semibold">VAT (20%)</th>
                    <th className="text-left py-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th scope="row" className="text-left py-3 font-medium">
                      Standard Plan
                    </th>
                    <td className="py-3">$443.00</td>
                    <td className="py-3">$921.80</td>
                    <td className="py-3 font-medium">$9243</td>
                  </tr>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th scope="row" className="text-left py-3 font-medium">
                      Extra Plan
                    </th>
                    <td className="py-3">$443.00</td>
                    <td className="py-3">$921.80</td>
                    <td className="py-3 font-medium">$9243</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-left py-4 text-lg font-bold">
                      Total Due
                    </th>
                    <td />
                    <td />
                    <td className="py-4 text-lg font-bold">$9,750</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-[var(--border-subtle)] mt-10 pt-6">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-secondary)]">
                <span>www.skilllinkup.com</span>
                <span>info@skilllinkup.com</span>
                <span>(123) 123-456</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
