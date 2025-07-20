#!/usr/bin/env python3
"""
Portfolio Website Main Launcher
===============================

This is the main entry point for the portfolio website project.
Run this script to access all project functionality.

Usage:
    python3 run_server.py [command] [options]

Commands:
    server          - Start the Django development server (default)
    manage          - Access database management interface
    setup           - Quick project setup
    collectstatic   - Collect static files
    migrate         - Run database migrations
    shell           - Open Django shell
    help            - Show this help message

Examples:
    python3 run_server.py                    # Start server
    python3 run_server.py server --port 8080 # Start on custom port
    python3 run_server.py manage             # Open database manager
    python3 run_server.py setup              # Quick setup
    python3 run_server.py migrate            # Run migrations
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path

# Add the current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')

def print_header(text):
    """Print a colored header"""
    print(f"\n{'='*60}")
    print(f"{text.center(60)}")
    print(f"{'='*60}\n")

def run_server(port=8000):
    """Start the Django development server"""
    print_header("🚀 Starting Portfolio Website Server")
    print(f"🌐 Server will be available at: http://localhost:{port}")
    print(f"📝 Admin panel: http://localhost:{port}/admin")
    print("⏹️  Press Ctrl+C to stop the server\n")
    
    try:
        subprocess.run([sys.executable, "manage.py", "runserver", f"0.0.0.0:{port}"])
    except KeyboardInterrupt:
        print("\n✅ Server stopped successfully!")

def run_database_manager():
    """Launch the interactive database manager"""
    print_header("🗄️ Database Manager")
    script_path = current_dir / "scripts" / "populate_db.py"
    subprocess.run([sys.executable, str(script_path)])

def quick_setup():
    """Quick project setup"""
    print_header("⚡ Quick Project Setup")
    
    print("1️⃣ Running migrations...")
    subprocess.run([sys.executable, "manage.py", "migrate"])
    
    print("\n2️⃣ Collecting static files...")
    subprocess.run([sys.executable, "manage.py", "collectstatic", "--noinput"])
    
    print("\n3️⃣ Setting up database...")
    script_path = current_dir / "scripts" / "populate_db.py"
    subprocess.run([sys.executable, str(script_path), "add"])
    
    print("\n✅ Setup complete! You can now run the server.")

def run_migrations():
    """Run database migrations"""
    print_header("📊 Database Migrations")
    subprocess.run([sys.executable, "manage.py", "migrate"])

def collect_static():
    """Collect static files"""
    print_header("📁 Collecting Static Files")
    subprocess.run([sys.executable, "manage.py", "collectstatic", "--noinput"])

def open_shell():
    """Open Django shell"""
    print_header("🐍 Django Shell")
    subprocess.run([sys.executable, "manage.py", "shell"])

def show_help():
    """Show help information"""
    print(__doc__)

def show_project_status():
    """Show current project status"""
    print_header("📊 Project Status")
    
    # Check if database exists
    db_path = current_dir / "db.sqlite3"
    if db_path.exists():
        print("✅ Database: Found")
    else:
        print("❌ Database: Not found - run migrations")
    
    # Check if static files are collected
    static_path = current_dir / "staticfiles"
    if static_path.exists() and any(static_path.iterdir()):
        print("✅ Static files: Collected")
    else:
        print("❌ Static files: Not collected")
    
    # Check if virtual environment is active
    if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("✅ Virtual environment: Active")
    else:
        print("⚠️  Virtual environment: Not detected")
    
    print(f"\n📁 Project directory: {current_dir}")
    print(f"🐍 Python executable: {sys.executable}")

def main():
    """Main function"""
    parser = argparse.ArgumentParser(
        description='Portfolio Website Main Launcher',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 run_server.py                    Start server on default port
  python3 run_server.py server --port 8080 Start server on port 8080  
  python3 run_server.py manage             Open database manager
  python3 run_server.py setup              Quick project setup
        """
    )
    
    parser.add_argument('command', nargs='?', default='server',
                       choices=['server', 'manage', 'setup', 'migrate', 'collectstatic', 'shell', 'status', 'help'],
                       help='Command to execute (default: server)')
    
    parser.add_argument('--port', type=int, default=8000,
                       help='Port for the development server (default: 8000)')
    
    args = parser.parse_args()
    
    # Handle commands
    if args.command == 'server':
        run_server(args.port)
    elif args.command == 'manage':
        run_database_manager()
    elif args.command == 'setup':
        quick_setup()
    elif args.command == 'migrate':
        run_migrations()
    elif args.command == 'collectstatic':
        collect_static()
    elif args.command == 'shell':
        open_shell()
    elif args.command == 'status':
        show_project_status()
    elif args.command == 'help':
        show_help()

if __name__ == "__main__":
    main()
