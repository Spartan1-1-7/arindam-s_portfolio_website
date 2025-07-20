#!/bin/bash

# Portfolio Database Manager Launcher
clear

echo "🚀 Starting Portfolio Database Manager..."
echo ""

# Check if we're in the right directory
if [ ! -f "manage.py" ]; then
    echo "❌ Error: Please run this script from your Django project directory"
    echo "   (The directory containing manage.py)"
    exit 1
fi

# Check Python environment
if ! python3 -c "import django" 2>/dev/null; then
    echo "❌ Error: Django not found"
    echo "💡 Please activate your virtual environment first"
    echo ""
    echo "If using conda:"
    echo "   conda activate your_env_name"
    echo ""
    echo "If using venv:"
    echo "   source venv/bin/activate"
    exit 1
fi

# Run the interactive database manager
python3 scripts/populate_db.py

echo ""
echo "✅ Database Manager closed"
