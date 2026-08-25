Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\ELFARES\Documents\Default Project\healthcalc-ai"
WshShell.Run """C:\Program Files\nodejs\node.exe"" node_modules\vite\bin\vite.js preview --host --port 4173", 0, False
WScript.Sleep 3000
WshShell.Popup "Server started! Open http://localhost:4173 in your browser.", 5, "HealthCalc.ai", 64
