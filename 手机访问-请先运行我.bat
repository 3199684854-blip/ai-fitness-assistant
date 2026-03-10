@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   AI健身助手 - 本地启动（手机可访问）
echo ========================================
echo.
echo 正在启动开发服务器...
echo 启动成功后，请看下面一行的 Network 地址
echo 例如: Network: http://192.168.1.9:3000
echo.
echo 用手机浏览器打开该地址即可（手机和电脑需连同一WiFi）
echo.
echo 按 Ctrl+C 可停止服务器
echo ========================================
echo.

D:
cd \Develop\projects\lattern-riddles\lattern-riddles-next
call npm run dev

pause
