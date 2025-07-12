#!/bin/bash
set -e

echo "Starting cleanup..."

# Remove all dist directories
echo "Removing dist directories..."
find . -type d -name "dist" -exec rm -rf {} +
echo "✅ dist directories removed."

# Clean PWA icons from packages/app/public, keeping specified files
echo "Cleaning PWA icons from packages/app/public..."
rm -f packages/app/public/apple-icon-180.png
rm -f packages/app/public/apple-splash-*.jpg
rm -f packages/app/public/manifest-icon-*.maskable.png
echo "✅ PWA icons removed."

echo "Cleanup complete!"
