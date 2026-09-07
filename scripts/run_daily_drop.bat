@echo off
title US Career Solutions Daily Drop Dispatcher
cd /d "E:\US_Career_Solutions"
python "E:\US_Career_Solutions\scripts\daily_drop_publisher.py" --now
echo.
echo [Done] Daily Drop has been dispatched to @uscareersolutions!
pause
