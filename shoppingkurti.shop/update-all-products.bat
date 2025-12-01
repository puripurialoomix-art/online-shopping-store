@echo off
echo ========================================
echo   Updating All Product Pages
echo ========================================
echo.

powershell -ExecutionPolicy Bypass -Command "& { Get-ChildItem -Filter '*@pid=*.html' | ForEach-Object { $content = Get-Content $_.FullName -Raw -Encoding UTF8; if ($content -notmatch 'js/cart.js') { $content = $content -replace '(?s)<script>\s*document\.addEventListener\(''DOMContentLoaded''.*?</script>\s*</body>', '<script src=\"js/cart.js\"></script>`n<script src=\"js/product-actions.js\"></script>`n</body>'; Set-Content $_.FullName -Value $content -Encoding UTF8 -NoNewline; Write-Host \"Updated: $($_.Name)\" -ForegroundColor Green } else { Write-Host \"Skipped: $($_.Name) (already updated)\" -ForegroundColor Yellow } } }"

echo.
echo ========================================
echo   Update Complete!
echo ========================================
echo.
echo Press any key to exit...
pause >nul
