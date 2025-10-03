#!/bin/bash
set -a
source .env.local
set +a

echo "🚀 Running Stack Auth Integration Migration..."
echo ""

# Use psql if available, otherwise show instructions
if command -v psql &> /dev/null; then
    psql "$DATABASE_URL" -f migrations/002_stack_auth_integration.sql
else
    echo "⚠️  psql not found. Please run this migration manually in Neon SQL Editor:"
    echo ""
    echo "1. Go to: https://console.neon.tech"
    echo "2. Select your project: neondb"
    echo "3. Open SQL Editor"
    echo "4. Copy contents from: migrations/002_stack_auth_integration.sql"
    echo "5. Run the SQL"
    echo ""
    echo "Or install psql: sudo apt-get install postgresql-client"
fi
