$content = Get-Content src/css/style.css -Raw
$content = $content -replace "html \{\s*scroll-behavior: smooth\s*\}\s*body \{", "html {`r`n  scroll-behavior: smooth;`r`n  overflow-x: hidden;`r`n  max-width: 100vw;`r`n}`r`n`r`nbody {"
$content = $content -replace "color: var\(--text\);\s*overflow-x: hidden;\s*transition: background \.4s, color \.4s;", "color: var(--text);`r`n  overflow-x: hidden;`r`n  max-width: 100vw;`r`n  transition: background .4s, color .4s;"
Set-Content src/css/style.css $content
