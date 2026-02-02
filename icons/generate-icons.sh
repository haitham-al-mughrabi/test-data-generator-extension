#!/bin/bash

# Icon Generation Script for Test Data Generator
# This script creates PNG icons from SVG sources

echo "🎨 Generating PNG icons from SVG sources..."

# Check if we have any SVG to PNG conversion tools
if command -v rsvg-convert &> /dev/null; then
    echo "Using rsvg-convert..."
    rsvg-convert -w 16 -h 16 icon16.svg -o icon16.png
    rsvg-convert -w 32 -h 32 icon32.svg -o icon32.png
    rsvg-convert -w 48 -h 48 icon48.svg -o icon48.png
    rsvg-convert -w 128 -h 128 icon128.svg -o icon128.png
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick convert..."
    convert icon16.svg icon16.png
    convert icon32.svg icon32.png
    convert icon48.svg icon48.png
    convert icon128.svg icon128.png
elif command -v inkscape &> /dev/null; then
    echo "Using Inkscape..."
    inkscape --export-type=png --export-width=16 --export-filename=icon16.png icon16.svg
    inkscape --export-type=png --export-width=32 --export-filename=icon32.png icon32.svg
    inkscape --export-type=png --export-width=48 --export-filename=icon48.png icon48.svg
    inkscape --export-type=png --export-width=128 --export-filename=icon128.png icon128.svg
else
    echo "❌ No SVG to PNG converter found."
    echo "Please install one of the following:"
    echo "  - librsvg (rsvg-convert): brew install librsvg"
    echo "  - ImageMagick: brew install imagemagick"
    echo "  - Inkscape: brew install inkscape"
    echo ""
    echo "Or convert the SVG files manually using an online converter:"
    echo "  - https://convertio.co/svg-png/"
    echo "  - https://cloudconvert.com/svg-to-png"
    exit 1
fi

echo "✅ PNG icons generated successfully!"
echo "📁 Files created:"
ls -la *.png 2>/dev/null || echo "No PNG files found - conversion may have failed"
