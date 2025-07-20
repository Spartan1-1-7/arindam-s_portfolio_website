#!/bin/bash

# Portfolio Database Management Script
echo "🗄️  Portfolio Database Manager"
echo "================================"

# Function to show usage
show_usage() {
    echo "Usage: ./manage_db.sh [action] [options]"
    echo ""
    echo "Actions:"
    echo "  add         - Add sample data to database"
    echo "  delete-all  - Delete ALL data from database"
    echo "  show        - Show current database contents"
    echo "  shell       - Open Django shell for manual operations"
    echo ""
    echo "Examples:"
    echo "  ./manage_db.sh show"
    echo "  ./manage_db.sh add"
    echo "  ./manage_db.sh delete-all"
}

# Check if Python environment has Django
check_django() {
    python3 -c "import django" 2>/dev/null
    if [ $? -ne 0 ]; then
        echo "❌ Django not found in Python environment"
        echo "💡 Please activate your virtual environment or install Django"
        echo "   Example: pip install django"
        exit 1
    fi
}

# Main script logic
case "$1" in
    "show")
        echo "📊 Showing current database contents..."
        check_django
        python3 populate_db.py show
        ;;
    "add")
        echo "➕ Adding sample data..."
        check_django
        python3 populate_db.py add
        ;;
    "delete-all")
        echo "⚠️  This will DELETE ALL data from the database!"
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            check_django
            python3 populate_db.py delete-all --force
        else
            echo "❌ Operation cancelled"
        fi
        ;;
    "shell")
        echo "🐍 Opening Django shell..."
        check_django
        python3 manage.py shell
        ;;
    "--help"|"-h"|"help"|"")
        show_usage
        ;;
    *)
        echo "❌ Unknown action: $1"
        show_usage
        exit 1
        ;;
esac
