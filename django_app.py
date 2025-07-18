#!/usr/bin/env python
"""
Django WSGI application for Gunicorn
"""
import os
import sys
from django.core.wsgi import get_wsgi_application

# Add the project directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')

# Get the WSGI application
application = get_wsgi_application()

# For backwards compatibility with the existing setup
app = application