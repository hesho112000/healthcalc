@echo off
title HealthCalc.ai Server
cd /d "C:\Users\ELFARES\Documents\Default Project\healthcalc-ai"
echo Starting HealthCalc.ai on http://localhost:4173 ...
"C:\Program Files\nodejs\node.exe" node_modules\vite\bin\vite.js preview --host --port 4173
