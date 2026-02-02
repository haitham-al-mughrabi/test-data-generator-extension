#!/bin/bash

# Test Data Generator - Production Build Script
# This script creates a production-ready package for Chrome Web Store submission

echo "🚀 Building Test Data Generator for Production..."

# Create build directory
BUILD_DIR="build"
PACKAGE_NAME="test-data-generator-v1.0.0"

# Clean previous build
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR/$PACKAGE_NAME

echo "📦 Copying production files..."

# Copy essential files
cp manifest.json $BUILD_DIR/$PACKAGE_NAME/
cp background.js $BUILD_DIR/$PACKAGE_NAME/
cp content.js $BUILD_DIR/$PACKAGE_NAME/
cp popup.html $BUILD_DIR/$PACKAGE_NAME/
cp popup.js $BUILD_DIR/$PACKAGE_NAME/
cp injected.js $BUILD_DIR/$PACKAGE_NAME/
cp shared.js $BUILD_DIR/$PACKAGE_NAME/
cp README.md $BUILD_DIR/$PACKAGE_NAME/
cp LICENSE $BUILD_DIR/$PACKAGE_NAME/
cp PRIVACY.md $BUILD_DIR/$PACKAGE_NAME/

# Copy directories
cp -r data/ $BUILD_DIR/$PACKAGE_NAME/
cp -r generators/ $BUILD_DIR/$PACKAGE_NAME/
cp -r ui/ $BUILD_DIR/$PACKAGE_NAME/
cp -r utils/ $BUILD_DIR/$PACKAGE_NAME/

# Create icons directory (placeholder)
mkdir -p $BUILD_DIR/$PACKAGE_NAME/icons
echo "⚠️  Remember to add icon files to the icons/ directory"

echo "🧹 Cleaning up development files..."

# Remove development/testing files from build
rm -f $BUILD_DIR/$PACKAGE_NAME/test.html
rm -f $BUILD_DIR/$PACKAGE_NAME/debug.html
rm -f $BUILD_DIR/$PACKAGE_NAME/context-menu-test.html
rm -f $BUILD_DIR/$PACKAGE_NAME/sub-tabs-demo.html
rm -f $BUILD_DIR/$PACKAGE_NAME/popup-simple.js

echo "📊 Build Statistics:"
echo "   Total files: $(find $BUILD_DIR/$PACKAGE_NAME -type f | wc -l)"
echo "   Total size: $(du -sh $BUILD_DIR/$PACKAGE_NAME | cut -f1)"

echo "📋 Creating ZIP package..."
cd $BUILD_DIR
zip -r $PACKAGE_NAME.zip $PACKAGE_NAME/
cd ..

echo "✅ Production build complete!"
echo "📁 Package location: $BUILD_DIR/$PACKAGE_NAME.zip"
echo ""
echo "📝 Next steps:"
echo "   1. Add icon files to $BUILD_DIR/$PACKAGE_NAME/icons/"
echo "   2. Test the extension by loading $BUILD_DIR/$PACKAGE_NAME/ in Chrome"
echo "   3. Create promotional images and screenshots"
echo "   4. Submit $BUILD_DIR/$PACKAGE_NAME.zip to Chrome Web Store"
echo ""
echo "🔗 Useful links:"
echo "   Chrome Web Store Developer Dashboard: https://chrome.google.com/webstore/devconsole"
echo "   Extension documentation: https://developer.chrome.com/docs/extensions/"
