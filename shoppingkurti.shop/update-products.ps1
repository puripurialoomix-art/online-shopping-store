Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Updating All Product Pages" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$updated = 0
$skipped = 0
$total = 0

Get-ChildItem -Filter "*@pid=*.html" | ForEach-Object {
    $total++
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    
    if ($content -notmatch "js/cart.js") {
        # Remove old script and add new ones
        $content = $content -replace "(?s)<script>\s*document\.addEventListener\('DOMContentLoaded'.*?</script>\s*</body>", "<script src=`"js/cart.js`"></script>`n<script src=`"js/product-actions.js`"></script>`n</body>"
        
        Set-Content $_.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✅ Updated: $($_.Name)" -ForegroundColor Green
        $updated++
    } else {
        Write-Host "⏭️  Skipped: $($_.Name)" -ForegroundColor Yellow
        $skipped++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Green
Write-Host "  Total Files: $total" -ForegroundColor White
Write-Host "  Updated: $updated" -ForegroundColor Green
Write-Host "  Skipped: $skipped" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Done! All product pages updated." -ForegroundColor Green
Write-Host ""
