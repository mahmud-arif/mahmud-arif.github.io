#!/bin/sh
# Prints resume.html to the PDF the site links to.
set -e
cd "$(dirname "$0")"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="../public/Arif_Mahmud_Resume_DevOps.pdf" \
  "file://$PWD/resume.html"
