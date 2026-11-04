@echo off
title Naani Pickles™ - Traditional Indian Heirloom Pickles & Chutneys Launcher
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"

echo ======================================================================
echo    🥒 NAANI PICKLES™ • ESTD. 1964 • Dadi-Naani Ke Haath Ka Swaad
echo ======================================================================
echo    Sun-Cured in Clay Barnis • 100%% Cold-Pressed Kachi Ghani Oils
echo ======================================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in PATH or C:\Program Files\nodejs.
    echo Please install Node.js from https://nodejs.org or restart your terminal.
    timeout /t 5 >nul
    exit /b 1
)

echo [1/3] Node.js environment detected successfully.
echo [2/3] Opening Naani Pickles Store in your browser: http://localhost:5000 ...
start "" http://localhost:5000

echo [3/3] Launching Node.js backend & static web server on http://localhost:5000 ...
node server/index.js
