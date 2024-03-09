#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Changing directory
cd ../frontend/
npm i
CI=false npm run build

# cd ../backend
# Apply any outstanding database migrations
# python manage.py runserver