on run argv
  tell application "Messages"
    set targetService to 1st service whose service type = iMessage
    set targetBuddy to buddy "number" of targetService
    send argv to targetBuddy
  end tell
end run


