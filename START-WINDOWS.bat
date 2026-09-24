@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel% equ 0 (
  start "" "http://localhost:8000"
  py -m http.server 8000 --bind 127.0.0.1
  pause
  exit /b
)
where python >nul 2>nul
if %errorlevel% equ 0 (
  start "" "http://localhost:8000"
  python -m http.server 8000 --bind 127.0.0.1
  pause
  exit /b
)
echo Python is needed for this local server. You can preview index.html directly,
echo or upload the app files to your existing HTTPS website.
pause
