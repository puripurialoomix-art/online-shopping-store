# Script to add base tag to prevent external redirects
Write-Host "Adding base tag to all HTML files..." -ForegroundColor Cyan

$baseTag = '<base href="./">'
$updated = 0

Get-ChildItem -Filter "*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    
    # Check if base tag already exists
    if ($content -notmatch '<base') {
        # Add base tag after <head>
        $content = $content -replace '(<head[^>]*>)', "`$1`n    $baseTag"
        Set-Content $_.FullName -Value $content -Encoding UTF8 -NoNewline
        $updated++
        
        if ($updated % 100 -eq 0) {
            Write-Host "Updated $updated files..." -ForegroundColor Green
        }
    }
}

Write-Host "`n✅ Done! Updated $updated files" -ForegroundColor Green
