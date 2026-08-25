Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\ELFARES\Documents\Default Project\healthcalc-ai\server"
WshShell.Run "C:\Program Files\nodejs\node.exe ""C:\Users\ELFARES\Documents\Default Project\healthcalc-ai\server\index.js""", 0, False
