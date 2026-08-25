@echo off
title HealthCalc.ai - Starting...
echo.
echo   ============================================
echo     HealthCalc.ai - Starting Both Servers
echo   ============================================
echo.

echo   [1/2] Starting Backend API on port 3001...
start "HealthCalc API" cmd /c "title HealthCalc API && set PATH=C:\Program Files\nodejs;%PATH% && cd /d "C:\Users\ELFARES\Documents\Default Project\healthcalc-ai\server" && node index.js && echo. && echo Server stopped. Press any key to close... && pause >nul"

echo   [2/2] Starting Frontend on port 3000...
timeout /t 3 /nobreak >nul
start "HealthCalc Frontend" cmd /c "title HealthCalc Frontend && set PATH=C:\Program Files\nodejs;%PATH% && cd /d "C:\Users\ELFARES\Documents\Default Project\healthcalc-ai" && npx vite --host && echo. && echo Server stopped. Press any key to close... && pause >nul"

echo.
echo   ============================================
echo     Both servers are starting!
echo     Frontend: http://localhost:3000
echo     Backend:  http://localhost:3001
echo   ============================================
echo.
echo   Close this window. The servers run in their own windows.
echo.
timeout /t 5 /nobreak >nul
