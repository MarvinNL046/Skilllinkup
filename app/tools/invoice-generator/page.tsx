'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  FileText,
  Plus,
  Trash2,
  Printer,
  Download,
  Save,
  X,
  Calendar,
  DollarSign,
  RefreshCw,
  Upload
} from 'lucide-react';

// Dynamic rendering
export const dynamic = 'force-dynamic';

// TypeScript Interfaces
interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface YourDetails {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
  taxNumber: string;
}

interface ClientDetails {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  currency: string;
  from: YourDetails;
  to: ClientDetails;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  paymentInstructions: string;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
}

// LocalStorage Keys
const STORAGE_KEYS = {
  invoices: 'invoice-generator-invoices',
  draft: 'invoice-generator-draft',
  yourDetails: 'invoice-generator-your-details'
};

// Helper Functions
const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

const generateInvoiceNumber = (): string => {
  const year = new Date().getFullYear();
  const invoices = loadFromStorage(STORAGE_KEYS.invoices, []);
  const count = invoices.length + 1;
  return `INV-${year}-${count.toString().padStart(4, '0')}`;
};

const calculateDueDate = (invoiceDate: string): string => {
  const date = new Date(invoiceDate);
  date.setDate(date.getDate() + 14);
  return date.toISOString().split('T')[0];
};

const formatCurrency = (amount: number, currency: string): string => {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${currency}${formatted}`;
};

export default function InvoiceGeneratorPage() {
  // Invoice State
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [currency, setCurrency] = useState<'$' | '€' | '£'>('$');

  // Your Details
  const [yourDetails, setYourDetails] = useState<YourDetails>({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    email: '',
    phone: '',
    taxNumber: ''
  });

  // Client Details
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    email: ''
  });

  // Line Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  // Calculations
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState('');
  const [paymentInstructions, setPaymentInstructions] = useState('');

  // Logo State
  const [logo, setLogo] = useState<string | null>(null);

  // UI State
  const [savedInvoices, setSavedInvoices] = useState<Invoice[]>([]);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load data on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setInvoiceDate(today);
    setDueDate(calculateDueDate(today));
    setInvoiceNumber(generateInvoiceNumber());

    // Load saved your details
    const savedYourDetails = loadFromStorage(STORAGE_KEYS.yourDetails, null);
    if (savedYourDetails) {
      setYourDetails(savedYourDetails);
    }

    // Load saved invoices
    setSavedInvoices(loadFromStorage(STORAGE_KEYS.invoices, []));

    // Load draft
    const draft = loadFromStorage(STORAGE_KEYS.draft, null);
    if (draft) {
      loadInvoiceData(draft);
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const invoice = buildInvoice();
    saveToStorage(STORAGE_KEYS.draft, invoice);
  }, [invoiceNumber, invoiceDate, dueDate, currency, yourDetails, clientDetails, items, taxRate, notes, paymentInstructions, logo]);

  // Calculate amounts
  const calculateSubtotal = (): number => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const subtotal = calculateSubtotal();
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  // Item Management
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  // Build invoice object
  const buildInvoice = (): Invoice => {
    return {
      id: Date.now().toString(),
      invoiceNumber,
      date: invoiceDate,
      dueDate,
      currency,
      from: yourDetails,
      to: clientDetails,
      items,
      subtotal,
      taxRate,
      taxAmount,
      total,
      notes,
      paymentInstructions,
      logo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  // Load invoice data
  const loadInvoiceData = (invoice: Invoice) => {
    setInvoiceNumber(invoice.invoiceNumber);
    setInvoiceDate(invoice.date);
    setDueDate(invoice.dueDate);
    setCurrency(invoice.currency as '$' | '€' | '£');
    setYourDetails(invoice.from);
    setClientDetails(invoice.to);
    setItems(invoice.items);
    setTaxRate(invoice.taxRate);
    setNotes(invoice.notes);
    setPaymentInstructions(invoice.paymentInstructions);
    setLogo(invoice.logo || null);
  };

  // Save Invoice
  const saveInvoice = () => {
    if (!invoiceNumber || !yourDetails.name || !clientDetails.name || items.length === 0) {
      setSaveMessage('Please fill in required fields');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    const invoice = buildInvoice();
    const updatedInvoices = [...savedInvoices, invoice];
    setSavedInvoices(updatedInvoices);
    saveToStorage(STORAGE_KEYS.invoices, updatedInvoices);
    saveToStorage(STORAGE_KEYS.yourDetails, yourDetails);

    setSaveMessage('Invoice saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Load Invoice
  const loadInvoice = (invoice: Invoice) => {
    loadInvoiceData(invoice);
    setShowLoadModal(false);
  };

  // Clear Form
  const clearForm = () => {
    if (confirm('Clear all fields? This will reset the invoice.')) {
      const today = new Date().toISOString().split('T')[0];
      setInvoiceDate(today);
      setDueDate(calculateDueDate(today));
      setInvoiceNumber(generateInvoiceNumber());
      setClientDetails({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        email: ''
      });
      setItems([{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }]);
      setTaxRate(0);
      setNotes('');
      setPaymentInstructions('');
    }
  };

  // Logo Upload Handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setSaveMessage('Image must be less than 2MB');
        setTimeout(() => setSaveMessage(''), 3000);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSaveMessage('Please select a valid image file');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Remove Logo Handler
  const handleRemoveLogo = () => {
    setLogo(null);
  };

  // Print Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          header, footer, .no-print {
            display: none !important;
          }
          .invoice-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
          }
          body {
            background: white !important;
          }
          @page {
            size: A4;
            margin: 2cm;
          }
        }
      `}</style>

      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 no-print">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>→</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>→</span>
              <span className="text-gray-900 dark:text-white font-semibold">Invoice Generator</span>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="bg-white dark:bg-slate-800 py-16 sm:py-20 no-print">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Invoice Generator
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Create professional invoices instantly. Save, print, and download as PDF.
                Perfect for freelancers and small businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT: Form */}
            <div className="space-y-6 no-print">
              {/* Invoice Details Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Invoice Details
                </h2>

                <div className="space-y-4">
                  {/* Invoice Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Invoice Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className="flex-1 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="INV-2025-0001"
                      />
                      <button
                        onClick={() => setInvoiceNumber(generateInvoiceNumber())}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        title="Generate"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Invoice Date
                      </label>
                      <input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => {
                          setInvoiceDate(e.target.value);
                          setDueDate(calculateDueDate(e.target.value));
                        }}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <div className="flex gap-2">
                      {(['$', '€', '£'] as const).map((curr) => (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            currency === curr
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* From Details Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  From (Your Details)
                </h2>

                {/* Logo Upload Section */}
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  {!logo ? (
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors">
                          <Upload className="w-4 h-4" />
                          Upload Logo
                        </div>
                      </label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Max 2MB
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={logo}
                          alt="Company Logo"
                          className="max-w-[150px] h-auto rounded border border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <button
                        onClick={handleRemoveLogo}
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Remove Logo
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={yourDetails.name}
                    onChange={(e) => setYourDetails({ ...yourDetails, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your Name / Company Name"
                  />

                  <input
                    type="text"
                    value={yourDetails.address}
                    onChange={(e) => setYourDetails({ ...yourDetails, address: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Address"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={yourDetails.city}
                      onChange={(e) => setYourDetails({ ...yourDetails, city: e.target.value })}
                      className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={yourDetails.postalCode}
                      onChange={(e) => setYourDetails({ ...yourDetails, postalCode: e.target.value })}
                      className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Postal Code"
                    />
                  </div>

                  <input
                    type="text"
                    value={yourDetails.country}
                    onChange={(e) => setYourDetails({ ...yourDetails, country: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Country"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={yourDetails.email}
                      onChange={(e) => setYourDetails({ ...yourDetails, email: e.target.value })}
                      className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Email"
                    />
                    <input
                      type="tel"
                      value={yourDetails.phone}
                      onChange={(e) => setYourDetails({ ...yourDetails, phone: e.target.value })}
                      className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Phone"
                    />
                  </div>

                  <input
                    type="text"
                    value={yourDetails.taxNumber}
                    onChange={(e) => setYourDetails({ ...yourDetails, taxNumber: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tax/VAT Number (optional)"
                  />
                </div>
              </div>

              {/* To Details Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  To (Client Details)
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={clientDetails.name}
                    onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Client Name / Company"
                  />

                  <input
                    type="text"
                    value={clientDetails.address}
                    onChange={(e) => setClientDetails({ ...clientDetails, address: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Address"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={clientDetails.city}
                      onChange={(e) => setClientDetails({ ...clientDetails, city: e.target.value })}
                      className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={clientDetails.postalCode}
                      onChange={(e) => setClientDetails({ ...clientDetails, postalCode: e.target.value })}
                      className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Postal Code"
                    />
                  </div>

                  <input
                    type="text"
                    value={clientDetails.country}
                    onChange={(e) => setClientDetails({ ...clientDetails, country: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Country"
                  />

                  <input
                    type="email"
                    value={clientDetails.email}
                    onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Line Items Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Line Items
                  </h2>
                  <button
                    onClick={addItem}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-start">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="col-span-5 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Description"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                        className="col-span-2 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Qty"
                        min="1"
                      />
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                        className="col-span-2 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Rate"
                        min="0"
                        step="0.01"
                      />
                      <div className="col-span-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm font-semibold">
                        {formatCurrency(item.amount, currency)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="col-span-1 p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculations Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Calculations
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(subtotal, currency)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Tax/VAT Rate
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="25"
                        step="0.5"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="w-16 text-right font-semibold text-gray-900 dark:text-white">
                        {taxRate}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-gray-300">Tax Amount</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(taxAmount, currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 bg-primary/10 dark:bg-primary/20 -mx-6 px-6">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(total, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Additional Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Additional notes or terms..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Payment Instructions
                    </label>
                    <textarea
                      value={paymentInstructions}
                      onChange={(e) => setPaymentInstructions(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Bank details, payment methods, etc..."
                    />
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Actions
                </h2>

                {saveMessage && (
                  <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 rounded-lg text-sm">
                    {saveMessage}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={saveInvoice}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Invoice
                  </button>

                  <button
                    onClick={() => setShowLoadModal(true)}
                    disabled={savedInvoices.length === 0}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Load Invoice
                  </button>

                  <button
                    onClick={printInvoice}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print / PDF
                  </button>

                  <button
                    onClick={clearForm}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear Form
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Invoice Preview */}
            <div className="lg:sticky lg:top-20 h-fit">
              <div className="invoice-preview bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">INVOICE</h1>
                  <div className="h-1 w-20 bg-primary"></div>
                </div>

                {/* Header Grid */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  {/* From */}
                  <div>
                    {/* Logo Display */}
                    {logo && (
                      <div className="mb-4">
                        <img
                          src={logo}
                          alt="Company Logo"
                          className="max-w-[150px] h-auto"
                        />
                      </div>
                    )}
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">From</h3>
                    <div className="text-sm text-gray-900 dark:text-white space-y-1">
                      <p className="font-semibold">{yourDetails.name || 'Your Name'}</p>
                      {yourDetails.address && <p>{yourDetails.address}</p>}
                      {(yourDetails.city || yourDetails.postalCode) && (
                        <p>{yourDetails.city} {yourDetails.postalCode}</p>
                      )}
                      {yourDetails.country && <p>{yourDetails.country}</p>}
                      {yourDetails.email && <p>{yourDetails.email}</p>}
                      {yourDetails.phone && <p>{yourDetails.phone}</p>}
                      {yourDetails.taxNumber && <p className="text-xs text-gray-600 dark:text-gray-400">VAT: {yourDetails.taxNumber}</p>}
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div className="text-right">
                    <div className="text-sm text-gray-900 dark:text-white space-y-1">
                      <p className="font-semibold">{invoiceNumber || 'INV-2025-0001'}</p>
                      {invoiceDate && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Date: {new Date(invoiceDate).toLocaleDateString()}
                        </p>
                      )}
                      {dueDate && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Due: {new Date(dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* To */}
                <div className="mb-8">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Bill To</h3>
                  <div className="text-sm text-gray-900 dark:text-white space-y-1">
                    <p className="font-semibold">{clientDetails.name || 'Client Name'}</p>
                    {clientDetails.address && <p>{clientDetails.address}</p>}
                    {(clientDetails.city || clientDetails.postalCode) && (
                      <p>{clientDetails.city} {clientDetails.postalCode}</p>
                    )}
                    {clientDetails.country && <p>{clientDetails.country}</p>}
                    {clientDetails.email && <p>{clientDetails.email}</p>}
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                        <th className="text-left py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Description</th>
                        <th className="text-center py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Qty</th>
                        <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Rate</th>
                        <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 text-sm text-gray-900 dark:text-white">
                            {item.description || 'Service description'}
                          </td>
                          <td className="py-3 text-sm text-gray-900 dark:text-white text-center">
                            {item.quantity}
                          </td>
                          <td className="py-3 text-sm text-gray-900 dark:text-white text-right">
                            {formatCurrency(item.rate, currency)}
                          </td>
                          <td className="py-3 text-sm text-gray-900 dark:text-white text-right font-semibold">
                            {formatCurrency(item.amount, currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="ml-auto max-w-xs space-y-2">
                  <div className="flex justify-between text-sm text-gray-900 dark:text-white">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal, currency)}</span>
                  </div>
                  {taxRate > 0 && (
                    <div className="flex justify-between text-sm text-gray-900 dark:text-white">
                      <span>Tax ({taxRate}%):</span>
                      <span>{formatCurrency(taxAmount, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t-2 border-gray-300 dark:border-gray-600">
                    <span>Total:</span>
                    <span className="text-primary">{formatCurrency(total, currency)}</span>
                  </div>
                </div>

                {/* Notes */}
                {(notes || paymentInstructions) && (
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    {notes && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Notes</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{notes}</p>
                      </div>
                    )}
                    {paymentInstructions && (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Payment Instructions</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{paymentInstructions}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Load Invoice Modal */}
        {showLoadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 no-print">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Load Saved Invoice
                </h3>
                <button
                  onClick={() => setShowLoadModal(false)}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {savedInvoices.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  No saved invoices yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {savedInvoices.map((invoice) => (
                    <button
                      key={invoice.id}
                      onClick={() => loadInvoice(invoice)}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-left transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {invoice.invoiceNumber}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(invoice.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>To: {invoice.to.name}</p>
                        <p className="font-semibold text-primary">
                          Total: {formatCurrency(invoice.total, invoice.currency)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
