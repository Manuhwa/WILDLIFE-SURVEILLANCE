@echo off
cd /d "%~dp0"
echo Starting Mashonaland Central wildlife camera dashboard...
echo Keep this window open while you use the cameras.
echo Open http://localhost:8765/wildlife-dashboard/
echo.
start "" "http://localhost:8765/wildlife-dashboard/"
py -3 -m http.server 8765
pause
