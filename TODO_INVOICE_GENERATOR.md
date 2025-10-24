# Invoice Generator - Implementation Todo

## Task: Create Professional Invoice Generator Tool

**Location:** `/app/tools/invoice-generator/page.tsx`

**Goal:** Build a complete, production-ready Invoice Generator tool for freelancers with real-time preview, localStorage persistence, and print/PDF functionality.

**Requirements:**

1. **File Structure:**
   - Create new page at: `/home/marvin/Documenten/skillLinkup/app/tools/invoice-generator/page.tsx`
   - Must be a Client Component with `'use client'` directive
   - Add `export const dynamic = 'force-dynamic';`

2. **Core Features:**
   - Real-time invoice preview (updates as you type)
   - Two-column layout (form left, preview right on desktop)
   - LocalStorage persistence (drafts + saved invoices + your details)
   - Print functionality (browser print dialog)
   - PDF download (via print → save as PDF)
   - Auto-generate invoice numbers (INV-2025-0001 format)
   - Auto-calculate due date (+14 days default)
   - Currency selector (€, $, £) with proper formatting
   - Dynamic line items (add/remove rows)
   - Real-time calculations (subtotal, tax, total)
   - Full dark mode support
   - Mobile responsive design

3. **Data Structure:**
   ```typescript
   interface InvoiceItem {
     id: string;
     description: string;
     quantity: number;
     rate: number;
     amount: number; // auto-calculated: qty × rate
   }

   interface Invoice {
     id: string;
     invoiceNumber: string;
     date: string; // ISO format
     dueDate: string; // ISO format
     currency: string; // €, $, £
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
     subtotal: number; // auto-calculated
     taxRate: number; // 0-25%
     taxAmount: number; // auto-calculated
     total: number; // auto-calculated
     notes?: string;
     paymentInstructions?: string;
     createdAt: Date;
     updatedAt: Date;
   }
   ```

4. **Layout Components:**
   - Breadcrumb navigation (Home → Tools → Invoice Generator)
   - Hero section with icon and description
   - Left column: Form with sections (Invoice Details, From, To, Items, Calculations, Notes, Actions)
   - Right column: Sticky invoice preview that updates in real-time
   - Actions: Save, Load, Print, Clear

5. **Form Sections:**
   
   **Invoice Details:**
   - Invoice Number (input with auto-generate button)
   - Invoice Date (date input)
   - Due Date (date input, auto +14 days)
   - Currency (€, $, £ selector buttons)

   **From (Your Details):**
   - Name/Company
   - Address, City, Postal Code, Country
   - Email, Phone
   - Tax/VAT Number (optional)
   - Save to localStorage for reuse

   **To (Client Details):**
   - Client Name/Company
   - Address, City, Postal Code, Country
   - Email

   **Line Items:**
   - Table with: Description, Quantity, Rate, Amount
   - Add Item button
   - Remove Item button per row
   - Amount auto-calculates (qty × rate)

   **Calculations:**
   - Subtotal (sum of all items)
   - Tax Rate slider (0-25%)
   - Tax Amount (auto-calculated)
   - Total Amount (bold, prominent)

   **Notes:**
   - Notes textarea
   - Payment Instructions textarea

6. **Invoice Preview:**
   - Professional invoice layout
   - Company/sender info (top left)
   - Invoice details (top right: number, date, due date)
   - Client info (below sender)
   - Line items table
   - Calculations (subtotal, tax, total)
   - Notes/payment instructions at bottom
   - Must update in real-time as form changes
   - Clean, printable design

7. **LocalStorage:**
   ```typescript
   const STORAGE_KEYS = {
     invoices: 'invoice-generator-invoices',       // Array of saved invoices
     draft: 'invoice-generator-draft',             // Auto-save current work
     yourDetails: 'invoice-generator-your-details' // Reusable sender info
   };
   ```
   - Auto-save draft every change
   - Save completed invoices with list
   - Load invoice from saved list
   - Persist "Your Details" for reuse

8. **Print Styling:**
   - Add `<style jsx global>` for print media queries
   - Hide header, footer, buttons on print
   - Show only invoice preview
   - White background, black text
   - A4 page size optimized

9. **Icons (lucide-react):**
   - FileText (main icon)
   - Plus (add item)
   - Trash2 (remove item)
   - Printer (print)
   - Download (PDF)
   - Save (save invoice)
   - Edit (edit)
   - X (close/clear)
   - Calendar (dates)
   - DollarSign (currency)

10. **Design Patterns to Follow:**
    - Time Tracker: localStorage helpers, form state, dark mode
    - Rate Calculator: form styling, input fields, currency
    - Header/Footer: Use existing `<Header />` and `<Footer />` components

11. **Dark Mode Classes:**
    - Background: `bg-white dark:bg-slate-800`
    - Text: `text-gray-900 dark:text-white`
    - Secondary text: `text-gray-600 dark:text-gray-300`
    - Borders: `border-gray-300 dark:border-gray-600`
    - Inputs: `bg-white dark:bg-slate-700`
    - Cards: `bg-white dark:bg-slate-800 rounded-lg shadow-md`

12. **SEO & Metadata:**
    ```typescript
    export const metadata = {
      title: 'Free Invoice Generator for Freelancers | SkillLinkup',
      description: 'Create professional invoices instantly. Perfect for freelancers - save, print, and download as PDF.',
    };
    ```

13. **Auto-Features:**
    - Invoice number: `INV-YYYY-NNNN` (e.g., INV-2025-0001)
    - Auto-increment based on saved invoices count
    - Due date: Auto-calculate +14 days from invoice date
    - Currency formatting: €1,234.56 / $1,234.56 / £1,234.56
    - Real-time calculations on ANY field change

14. **Validations:**
    - At least one line item required to save
    - Numeric validations (quantity > 0, rate >= 0)
    - Required fields: invoice number, date, due date, from name, to name
    - Clear error messages

15. **User Experience:**
    - Form updates preview instantly (no lag)
    - Smooth scrolling on mobile
    - Preview sticky on desktop
    - Confirmation before clearing form
    - Success messages on save
    - Loading states where appropriate

**Reference Files:**
- `/home/marvin/Documenten/skillLinkup/app/tools/time-tracker/page.tsx` (localStorage patterns)
- `/home/marvin/Documenten/skillLinkup/app/tools/rate-calculator/page.tsx` (form styling)
- `/home/marvin/Documenten/skillLinkup/components/header.tsx` (header component)
- `/home/marvin/Documenten/skillLinkup/components/footer.tsx` (footer component)

**Success Criteria:**
✅ File created at correct location
✅ All TypeScript interfaces defined
✅ Form has all required fields
✅ Preview updates in real-time
✅ LocalStorage saves/loads correctly
✅ Print functionality works
✅ Currency formatting correct
✅ Calculations accurate
✅ Dark mode fully supported
✅ Mobile responsive
✅ No console errors
✅ Professional appearance
✅ Follows project patterns

**Implementation Plan:**
See detailed plan at: `/home/marvin/Documenten/skillLinkup/.claude/INVOICE_GENERATOR_PLAN.md`

---

**Status:** Ready for implementation
**Assigned to:** coder subagent
**Priority:** High
**Estimated time:** 2-3 hours
