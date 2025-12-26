#!/bin/bash

echo "🚀 Starting Portfolio Website"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Start Django
echo "Starting Django backend..."
cd "$SCRIPT_DIR"
eval "$(conda shell.bash hook)"
conda activate arindam_website
python manage.py runserver &
DJANGO_PID=$!

sleep 3

# Start Next.js
echo "Starting Next.js frontend..."
cd frontend
npm run dev &
NEXTJS_PID=$!

echo ""
echo "✅ READY!"
echo ""
echo "🌐 Website: http://localhost:3000"
echo "⚙️  Django Admin: http://localhost:8000/admin"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

trap "kill $DJANGO_PID $NEXTJS_PID 2>/dev/null; exit" INT
wait
