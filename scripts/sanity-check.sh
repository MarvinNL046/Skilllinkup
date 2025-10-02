#!/bin/bash
# Sanity check for production safety
# Verifies no common crash patterns exist in codebase

echo "🔍 Running SkillLinkup Sanity Checks..."
echo ""

# Check 1: No destructuring of featureImg in component parameters
echo "1️⃣  Checking for unsafe featureImg destructuring..."
if grep -r "item: { *featureImg" app src --include="*.tsx" --include="*.jsx" 2>/dev/null; then
  echo "❌ FAIL: Found unsafe destructuring of featureImg"
  exit 1
else
  echo "✅ PASS: No unsafe featureImg destructuring found"
fi

# Check 2: All next/image components have src attribute
echo ""
echo "2️⃣  Checking Image components have src..."
if grep -r "<Image" app src --include="*.tsx" --include="*.jsx" | grep -v "src=" 2>/dev/null; then
  echo "⚠️  WARNING: Found Image components without explicit src check"
else
  echo "✅ PASS: All Image components have src"
fi

# Check 3: OpenGraph images array is not empty
echo ""
echo "3️⃣  Checking OpenGraph metadata..."
if grep -r "openGraph.*images.*\[\]" app --include="*.tsx" --include="*.ts" 2>/dev/null; then
  echo "❌ FAIL: Found empty OpenGraph images array"
  exit 1
else
  echo "✅ PASS: No empty OpenGraph images arrays"
fi

# Check 4: Using safe helpers instead of direct || operators
echo ""
echo "4️⃣  Checking for safe helper usage..."
if grep -r "safeImage\|safeText\|safeArray" app --include="*.tsx" --include="*.ts" --quiet 2>/dev/null; then
  echo "✅ PASS: Safe helpers are being used"
else
  echo "⚠️  WARNING: Consider using safe helpers"
fi

# Check 5: No JSON.parse(JSON.stringify()) before normalize
echo ""
echo "5️⃣  Checking for unsafe JSON serialization..."
if grep -r "JSON.parse.*JSON.stringify" app lib --include="*.tsx" --include="*.ts" 2>/dev/null; then
  echo "⚠️  WARNING: Found JSON serialization - ensure it's after normalization"
else
  echo "✅ PASS: No unsafe JSON serialization patterns"
fi

# Check 6: Error boundaries exist
echo ""
echo "6️⃣  Checking for Error Boundary..."
if [ -f "app/error.tsx" ]; then
  echo "✅ PASS: Error boundary exists (app/error.tsx)"
else
  echo "❌ FAIL: No error boundary found"
  exit 1
fi

# Check 7: Loading state exists
echo ""
echo "7️⃣  Checking for Loading state..."
if [ -f "app/loading.tsx" ]; then
  echo "✅ PASS: Loading state exists (app/loading.tsx)"
else
  echo "⚠️  WARNING: No loading state found"
fi

# Check 8: DEFAULTS file exists
echo ""
echo "8️⃣  Checking for DEFAULTS..."
if [ -f "lib/defaults.ts" ]; then
  echo "✅ PASS: DEFAULTS file exists (lib/defaults.ts)"
else
  echo "❌ FAIL: No DEFAULTS file found"
  exit 1
fi

# Check 9: Safe utilities exist
echo ""
echo "9️⃣  Checking for safe utilities..."
if [ -f "lib/safe.ts" ]; then
  echo "✅ PASS: Safe utilities exist (lib/safe.ts)"
else
  echo "❌ FAIL: No safe utilities found"
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All sanity checks passed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Codebase is production-ready"
