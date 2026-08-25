Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\ELFARES\Documents\Default Project\healthcalc-ai"
WshShell.Run "cmd /c ""C:\Users\ELFARES\Documents\Default Project\healthcalc-ai\run-frontend.cmd""", 0, False
