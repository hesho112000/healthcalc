Set WshShell = CreateObject("WScript.Shell")

' Kill any existing node processes
WshShell.Run "cmd /c taskkill /F /IM node.exe /T 2>nul", 0, True

' Wait 2 seconds
WScript.Sleep 2000

' Start Backend
WshShell.CurrentDirectory = "C:\Users\ELFARES\Documents\Default Project\healthcalc-ai\server"
WshShell.Run "cmd /c set PATH=C:\Program Files\nodejs;%PATH% && node index.js", 0, False

' Wait 3 seconds for backend to start
WScript.Sleep 3000

' Start Frontend
WshShell.CurrentDirectory = "C:\Users\ELFARES\Documents\Default Project\healthcalc-ai"
WshShell.Run "cmd /c set PATH=C:\Program Files\nodejs;%PATH% && node node_modules\vite\bin\vite.js --host --port 3000", 0, False
