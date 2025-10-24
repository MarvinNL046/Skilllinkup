# Invoice Generator Implementation Plan

## Overview
Professional Invoice Generator tool at `/tools/invoice-generator` for freelancers with:
- Real-time invoice preview
- LocalStorage persistence
- Print/PDF export functionality
- Full dark mode support
- Responsive mobile-first design

## Technical Requirements

### TypeScript Interfaces
```typescript
interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number; // auto-calculated
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  currency: string;
  from: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
    taxNumber?: string;
  };
  to: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
  paymentInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Core Features

1. **Invoice Form Fields**
   - Invoice Number (auto-generated: INV-2025-0001 format or manual)
   - Invoice Date (date picker)
   - Due Date (date picker, auto +14 days default)
   - Currency selector (€, $, £)

2. **From (Your Details)**
   - Your Name/Company Name
   - Address, City, Postal Code, Country
   - Email, Phone
   - Tax/VAT Number (optional)
   - LocalStorage persistence for reuse

3. **To (Client Details)**
   - Client Name/Company
   - Address, City, Postal Code, Country
   - Email

4. **Line Items (Dynamic Add/Remove)**
   - Description
   - Quantity
   - Rate (per unit)
   - Amount (auto-calculated: qty × rate)
   - Add/Remove item buttons

5. **Calculations (Auto-Update)**
   - Subtotal (sum of all items)
   - Tax/VAT % (adjustable slider, 0-25%)
   - Tax Amount
   - Total Amount
   - Real-time updates on any change

6. **Actions**
   - Save Invoice (localStorage with list)
   - Load Saved Invoices (dropdown selector)
   - Print Invoice (browser print dialog)
   - Download PDF (print → save as PDF)
   - Clear Form (with confirmation)

### Layout Structure

```
<main>
  <Header />
  
  {/* Breadcrumb */}
  <section>Home → Tools → Invoice Generator</section>
  
  {/* Hero Section */}
  <section>
    <h1>Invoice Generator</h1>
    <p>Professional invoice creation tool</p>
  </section>
  
  {/* Two Column Layout */}
  <div className="grid lg:grid-cols-2 gap-8">
    
    {/* LEFT: Form */}
    <div className="space-y-6">
      {/* Invoice Details Card */}
      {/* From Details Card */}
      {/* To Details Card */}
      {/* Line Items Card */}
      {/* Calculations Card */}
      {/* Notes Card */}
      {/* Actions Card */}
    </div>
    
    {/* RIGHT: Live Preview (sticky) */}
    <div className="sticky top-4 h-fit">
      {/* Professional invoice preview */}
      {/* Updates as you type */}
      {/* Print-friendly styling */}
    </div>
  </div>
  
  <Footer />
</main>
```

### Design Patterns

**Follow existing patterns from:**
- Time Tracker: localStorage, form state, dark mode
- Rate Calculator: form styling, calculations, currency

**Dark Mode Classes:**
- Backgrounds: `bg-white dark:bg-slate-800`
- Text: `text-gray-900 dark:text-white`
- Borders: `border-gray-300 dark:border-gray-600`
- Inputs: `bg-white dark:bg-slate-700`

**Icons from lucide-react:**
- FileText, Plus, Trash2, Printer, Download, Save, Edit, X, Calendar, DollarSign

### LocalStorage Strategy

```typescript
STORAGE_KEYS = {
  invoices: 'invoice-generator-invoices',      // Array of saved invoices
  draft: 'invoice-generator-draft',            // Auto-save current draft
  yourDetails: 'invoice-generator-your-details' // Reusable sender info
}
```

### Print Styling

```css
@media print {
  /* Hide: header, footer, buttons, form */
  header, footer, .no-print { display: none !important; }
  
  /* Show only invoice preview */
  .invoice-preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: white !important;
    color: black !important;
  }
  
  /* A4 page size */
  @page { size: A4; margin: 2cm; }
}
```

### Auto-Features

1. **Invoice Number Generation**
   - Format: `INV-YYYY-NNNN` (e.g., INV-2025-0001)
   - Auto-increment based on saved invoices
   - Manual override option

2. **Due Date Calculation**
   - Auto-set to +14 days from invoice date
   - Manual override option

3. **Currency Formatting**
   - €1,234.56 (European format)
   - $1,234.56 (US format)
   - £1,234.56 (UK format)

4. **Real-Time Calculations**
   - Item amount = quantity × rate
   - Subtotal = sum of all items
   - Tax amount = subtotal × (taxRate / 100)
   - Total = subtotal + tax amount

### SEO & Metadata

```typescript
export const metadata = {
  title: 'Free Invoice Generator for Freelancers | SkillLinkup',
  description: 'Create professional invoices instantly with our free invoice generator. Perfect for freelancers - save, print, and download as PDF.',
  keywords: 'invoice generator, freelance invoice, invoice template, free invoice maker',
}
```

### Client Component Requirements

- `'use client'` directive at top
- `export const dynamic = 'force-dynamic';`
- Proper TypeScript types
- Error handling & validation
- Loading states where needed

## Implementation Checklist

- [ ] Create `/app/tools/invoice-generator/page.tsx`
- [ ] Define TypeScript interfaces
- [ ] Implement invoice form with all fields
- [ ] Build live preview component
- [ ] Add line item management (add/remove)
- [ ] Implement real-time calculations
- [ ] Add localStorage persistence
- [ ] Create save/load invoice functionality
- [ ] Implement print styling
- [ ] Add currency formatting
- [ ] Create auto-generate invoice number
- [ ] Add dark mode support
- [ ] Make responsive (mobile-first)
- [ ] Add SEO metadata
- [ ] Test all functionality

## Success Criteria

✅ Professional invoice preview updates in real-time
✅ All calculations work correctly
✅ LocalStorage saves drafts and invoices
✅ Print/PDF export works perfectly
✅ Full dark mode support
✅ Mobile responsive
✅ Clean, user-friendly interface
✅ No console errors
✅ Follows project patterns and conventions
