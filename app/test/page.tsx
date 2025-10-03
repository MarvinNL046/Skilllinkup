export default function TestPage() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Hero Card */}
        <div className="bg-white p-12 rounded-lg shadow-xl mb-8">
          <h1 className="text-5xl font-heading font-bold text-text-primary mb-4">
            SEOGrove Design System Test
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            Testing Inter & Lexend fonts with the new color palette inspired by SEOGrove.ai
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-heading font-semibold transition-colors shadow-lg">
              Primary Button
            </button>
            <button className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-heading font-semibold transition-colors shadow-lg">
              Accent Button
            </button>
            <button className="bg-secondary hover:bg-secondary-medium text-white px-6 py-3 rounded-lg font-heading font-semibold transition-colors shadow-lg">
              Secondary Button
            </button>
          </div>

          {/* Color Palette */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <div className="bg-primary h-20 rounded-lg mb-2"></div>
              <p className="text-sm text-text-muted">Primary</p>
            </div>
            <div>
              <div className="bg-accent h-20 rounded-lg mb-2"></div>
              <p className="text-sm text-text-muted">Accent</p>
            </div>
            <div>
              <div className="bg-secondary h-20 rounded-lg mb-2"></div>
              <p className="text-sm text-text-muted">Secondary</p>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-bold text-text-primary">Heading 2 - Lexend Font</h2>
            <h3 className="text-2xl font-heading font-bold text-text-primary">Heading 3 - Lexend Font</h3>
            <p className="text-lg text-text-secondary font-sans">
              Body text using Inter font. This is a paragraph demonstrating the body font family.
            </p>
            <p className="text-sm text-text-muted font-sans">
              Muted text using Inter font for less important information.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-heading font-bold text-text-primary mb-2">Feature 1</h3>
            <p className="text-text-secondary">Clean shadow and rounded corners</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-heading font-bold text-text-primary mb-2">Feature 2</h3>
            <p className="text-text-secondary">Professional spacing</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-heading font-bold text-text-primary mb-2">Feature 3</h3>
            <p className="text-text-secondary">Smooth transitions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
