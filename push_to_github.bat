@echo off
title Push US Career Solutions to GitHub
echo ==============================================
echo Pushing US Career Solutions to GitHub...
echo ==============================================
cd /d e:\US_Career_Solutions
"%LOCALAPPDATA%\MinGit\cmd\git.exe" push -u origin main
echo.
echo ==============================================
echo Push process completed!
echo ==============================================
pause
