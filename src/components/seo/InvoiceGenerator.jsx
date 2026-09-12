"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  calculateInvoice,
  formatInvoiceMoney,
  INVOICE_CURRENCIES,
} from "@/lib/invoice.mjs";
import { prepareInvoiceLogo } from "@/lib/invoiceLogo.mjs";
import { Button } from "@/components/ui/button";
import styles from "./InvoiceGenerator.module.css";

function InvoicePreview({ details, items, totals, logo }) {
  const money = (amount) => formatInvoiceMoney(amount, details.currency);
  return (
    <article className={styles.paper} aria-label="Invoice preview">
      {/* The selected logo is a local data URL, never sent to an image optimizer. */}
      {logo && (
        <Image
          unoptimized
          src={logo.dataUrl}
          width={logo.width}
          height={logo.height}
          className={styles.paperLogo}
          alt={details.from ? `${details.from} logo` : "Your business logo"}
        />
      )}
      <div className={styles.paperHeader}>
        <h2>Invoice</h2>
        <strong>{details.number || "Invoice number"}</strong>
      </div>
      <p>
        Issued: {details.date || "—"}
        <br />
        Due: {details.due || "—"}
        <br />
        Currency: {details.currency}
      </p>
      <div className={styles.parties}>
        <section>
          <h3>From</h3>
          <p>{details.from || "Your business name"}</p>
          <p className={styles.multiline}>{details.fromAddress}</p>
          {details.taxId && <p>Tax / registration ID: {details.taxId}</p>}
        </section>
        <section>
          <h3>Bill to</h3>
          <p>{details.to || "Client name"}</p>
          <p className={styles.multiline}>{details.toAddress}</p>
        </section>
      </div>
      {details.reference && (
        <p>Client / purchase order reference: {details.reference}</p>
      )}
      <div className={styles.tableWrap}>
        <table>
          <caption className={styles.srOnly}>Invoice line items</caption>
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Qty</th>
              <th scope="col">Rate</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>{item.description || "Work description"}</td>
                <td>{item.quantity}</td>
                <td>
                  {totals ? money(Math.round(Number(item.rate) * 100)) : "—"}
                </td>
                <td>{totals ? money(totals.lineCents[i]) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dl className={styles.totals}>
        <div>
          <dt>Subtotal</dt>
          <dd>{totals ? money(totals.subtotalCents) : "—"}</dd>
        </div>
        <div>
          <dt>Tax ({details.taxRate || "0"}%)</dt>
          <dd>{totals ? money(totals.taxCents) : "—"}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd data-testid="invoice-total">
            {totals ? money(totals.totalCents) : "—"}
          </dd>
        </div>
      </dl>
      {details.payment && (
        <section>
          <h3>Payment instructions</h3>
          <p className={styles.multiline}>{details.payment}</p>
        </section>
      )}
      {details.notes && (
        <section>
          <h3>Notes / service period</h3>
          <p className={styles.multiline}>{details.notes}</p>
        </section>
      )}
    </article>
  );
}

export default function InvoiceGenerator() {
  const [details, setDetails] = useState({
    number: "",
    date: "",
    due: "",
    currency: "USD",
    from: "",
    fromAddress: "",
    to: "",
    toAddress: "",
    taxId: "",
    reference: "",
    taxRate: "0",
    payment: "",
    notes: "",
  });
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: "1", rate: "0" },
  ]);
  const nextId = useRef(2);
  const [download, setDownload] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const exportBusy = useRef(false);
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState("");
  const [isLogoLoading, setIsLogoLoading] = useState(false);
  const logoInput = useRef(null);
  const logoButton = useRef(null);
  const logoRequest = useRef(0);
  const logoBusy = useRef(false);
  const [error, setError] = useState("");
  let totals = null;
  let calculationError = "";
  try {
    totals = calculateInvoice(items, details.taxRate);
  } catch (err) {
    calculationError = err.message;
  }

  useEffect(
    () => () => {
      if (download) URL.revokeObjectURL(download.url);
    },
    [download],
  );
  useEffect(
    () => () => {
      logoRequest.current += 1;
    },
    [],
  );

  async function chooseLogo(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const request = ++logoRequest.current;
    logoBusy.current = true;
    setIsLogoLoading(true);
    setLogoError("");
    try {
      const nextLogo = await prepareInvoiceLogo(file);
      if (request !== logoRequest.current) return;
      setLogo(nextLogo);
      setDownload(null);
      setError("");
    } catch (logoFailure) {
      if (request === logoRequest.current)
        setLogoError(
          logoFailure.message ||
            "Your logo could not be prepared. Please try again.",
        );
    } finally {
      if (request === logoRequest.current) {
        logoBusy.current = false;
        setIsLogoLoading(false);
      }
    }
  }

  function removeLogo() {
    logoRequest.current += 1;
    logoBusy.current = false;
    setIsLogoLoading(false);
    setLogo(null);
    setLogoError("");
    setDownload(null);
    logoButton.current?.focus();
  }

  const change = (key, value) => {
    setDetails((current) => ({ ...current, [key]: value }));
    setError("");
  };
  const updateItem = (id, key, value) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    );
    setError("");
  };
  async function exportPdf(event) {
    event.preventDefault();
    if (exportBusy.current || logoBusy.current) return;
    if (calculationError) {
      setError(calculationError);
      return;
    }
    if (details.due < details.date) {
      setError("The due date must be on or after the issue date.");
      return;
    }
    if (
      ![
        details.number,
        details.from,
        details.fromAddress,
        details.to,
        details.toAddress,
        ...items.map((item) => item.description),
      ].every((value) => value.trim())
    ) {
      setError("Fill in the required fields with more than spaces.");
      return;
    }
    setError("");
    exportBusy.current = true;
    setIsExporting(true);
    setDownload(null);
    try {
      const { createInvoicePdf } = await import("@/lib/invoicePdf.mjs");
      const result = await createInvoicePdf(details, items, undefined, logo);
      const url = URL.createObjectURL(result.blob);
      setDownload({ url, filename: result.filename });
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = result.filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch (exportError) {
      setError(
        exportError.message?.startsWith("Some characters")
          ? exportError.message
          : "Your PDF could not be created. Please try again. Your invoice entries are still here.",
      );
    } finally {
      exportBusy.current = false;
      setIsExporting(false);
    }
  }
  function field(key, label, options = {}) {
    const { multiline = false, ...attributes } = options;
    const shared = {
      id: `invoice-${key}`,
      value: details[key],
      onChange: (event) => change(key, event.target.value),
      maxLength: multiline ? 2000 : 200,
      ...attributes,
    };
    // Native date controls expose an empty value while a date is incomplete.
    // Leave their DOM value uncontrolled so editing a segment is not erased.
    if (attributes.type === "date") {
      delete shared.value;
      shared.defaultValue = "";
      shared.onInput = shared.onChange;
      shared.onBlur = shared.onChange;
    }
    return (
      <div className={styles.field}>
        <label htmlFor={shared.id}>
          {label}
          {attributes.required && " *"}
        </label>
        {multiline ? <textarea {...shared} rows={3} /> : <input {...shared} />}
      </div>
    );
  }
  return (
    <div className={styles.tool}>
      <p className={styles.notice}>
        No account needed. Your entries stay in this open page and are not saved
        to SkillLinkup. Save a PDF before leaving or reloading.
      </p>
      <div className={styles.workspace}>
        <form
          className={styles.editor}
          onSubmit={exportPdf}
          aria-busy={isExporting}
        >
          <h2>Invoice details</h2>
          <p>
            Fields marked * are required to download. Review the preview before
            exporting.
          </p>
          <fieldset className={styles.exportFields} disabled={isExporting}>
            <div className={styles.fields}>
              {field("number", "Invoice number", { required: true })}
              {field("date", "Issue date", { type: "date", required: true })}
              {field("due", "Due date", {
                type: "date",
                min: details.date || undefined,
                required: true,
              })}
              <div className={styles.field}>
                <label htmlFor="invoice-currency">Currency</label>
                <select
                  id="invoice-currency"
                  value={details.currency}
                  onChange={(event) => change("currency", event.target.value)}
                >
                  {INVOICE_CURRENCIES.map((currency) => (
                    <option key={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset>
              <legend>Your business</legend>
              <div className={styles.logoField}>
                <label htmlFor="invoice-logo" className={styles.logoLabel}>
                  Business logo (optional)
                </label>
                <input
                  ref={logoInput}
                  id="invoice-logo"
                  className={styles.srOnly}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                  tabIndex={-1}
                  onChange={chooseLogo}
                  aria-describedby={
                    logoError
                      ? "invoice-logo-hint invoice-logo-error"
                      : "invoice-logo-hint"
                  }
                  aria-invalid={Boolean(logoError)}
                />
                <p id="invoice-logo-hint" className={styles.hint}>
                  PNG, JPG or WebP, up to 5 MB. Appears in your preview and PDF.
                  Your logo stays on this device.
                </p>
                <div className={styles.logoActions}>
                  <Button
                    ref={logoButton}
                    type="button"
                    variant="outline"
                    onClick={() => logoInput.current?.click()}
                    aria-describedby="invoice-logo-hint"
                  >
                    {logo ? "Change logo" : "Choose logo"}
                  </Button>
                  {(logo || isLogoLoading) && (
                    <Button type="button" variant="ghost" onClick={removeLogo}>
                      {isLogoLoading && !logo ? "Cancel" : "Remove logo"}
                    </Button>
                  )}
                </div>
                <p className={styles.logoStatus} role="status">
                  {isLogoLoading
                    ? "Preparing your logo…"
                    : logo
                      ? `${logo.name} added to your invoice.`
                      : ""}
                </p>
                {logoError && (
                  <p
                    id="invoice-logo-error"
                    role="alert"
                    className={styles.error}
                  >
                    {logoError}
                  </p>
                )}
              </div>
              {field("from", "Business / legal name", { required: true })}
              {field("fromAddress", "Business address, country and contact", {
                multiline: true,
                required: true,
              })}
              {field("taxId", "Tax / registration ID (optional)")}
            </fieldset>
            <fieldset>
              <legend>Client</legend>
              {field("to", "Client / legal name", { required: true })}
              {field("toAddress", "Billing address and country", {
                multiline: true,
                required: true,
              })}
              {field(
                "reference",
                "Client / purchase order reference (optional)",
              )}
            </fieldset>
            <fieldset>
              <legend>Work and rates</legend>
              {items.map((item, index) => (
                <div className={styles.item} key={item.id}>
                  <div className={styles.field}>
                    <label htmlFor={`description-${item.id}`}>
                      Description {index + 1} *
                    </label>
                    <textarea
                      id={`description-${item.id}`}
                      required
                      maxLength={2000}
                      rows={2}
                      value={item.description}
                      onChange={(event) =>
                        updateItem(item.id, "description", event.target.value)
                      }
                    />
                  </div>
                  <div className={styles.fields}>
                    <div className={styles.field}>
                      <label htmlFor={`quantity-${item.id}`}>
                        Quantity {index + 1} *
                      </label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        required
                        min="0.01"
                        max="100000"
                        step="0.01"
                        value={item.quantity}
                        onChange={(event) =>
                          updateItem(item.id, "quantity", event.target.value)
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor={`rate-${item.id}`}>
                        Unit rate {index + 1} *
                      </label>
                      <input
                        id={`rate-${item.id}`}
                        type="number"
                        required
                        min="0"
                        max="1000000"
                        step="0.01"
                        value={item.rate}
                        onChange={(event) =>
                          updateItem(item.id, "rate", event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.textButton}
                    disabled={items.length === 1}
                    onClick={() =>
                      setItems((current) =>
                        current.filter((row) => row.id !== item.id),
                      )
                    }
                    aria-label={`Remove item ${index + 1}`}
                  >
                    Remove item
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={styles.secondary}
                disabled={items.length >= 50}
                onClick={() => {
                  const id = nextId.current++;
                  setItems((current) => [
                    ...current,
                    { id, description: "", quantity: "1", rate: "0" },
                  ]);
                }}
              >
                Add line item
              </button>
            </fieldset>
            {field("taxRate", "Tax rate (%) — applied to all items", {
              type: "number",
              min: "0",
              max: "100",
              step: "0.01",
              required: true,
            })}
            <p className={styles.hint}>
              Enter the rate appropriate to your invoice. This tool does not
              determine tax treatment or support multiple rates, discounts or
              structured e-invoices. Check your local requirements.
            </p>
            {field("payment", "Payment instructions (optional)", {
              multiline: true,
            })}
            {field("notes", "Notes / service period (optional)", {
              multiline: true,
            })}
            {(error || calculationError) && (
              <p role="alert" className={styles.error}>
                {error || calculationError}
              </p>
            )}
            <button
              type="submit"
              className={styles.primary}
              disabled={isExporting || isLogoLoading}
            >
              {isExporting
                ? "Creating PDF…"
                : isLogoLoading
                  ? "Preparing logo…"
                  : "Download PDF"}
            </button>
          </fieldset>
          <p className={styles.hint}>
            Download your invoice as a PDF, then open it to print. Your invoice
            is created on this device; it is not sent to SkillLinkup or your
            client.
          </p>
          {download && (
            <div role="status" className={styles.downloadReady}>
              Your PDF is ready. If the download did not start,{" "}
              <a href={download.url} download={download.filename}>
                save {download.filename}
              </a>
              .{" "}
              <a href={download.url} target="_blank" rel="noopener noreferrer">
                Open PDF
              </a>
              <p>
                If your in-app browser blocks downloads, use this tool in
                Chrome, Edge or Firefox.
              </p>
              <p>
                This file contains the details from your last export. Download
                again after making changes.
              </p>
            </div>
          )}
        </form>
        <div className={styles.preview}>
          <p className={styles.previewLabel}>Live preview</p>
          <InvoicePreview
            details={details}
            items={items}
            totals={totals}
            logo={logo}
          />
        </div>
      </div>
    </div>
  );
}
