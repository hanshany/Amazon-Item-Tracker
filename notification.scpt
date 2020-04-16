on run argv
  tell application "System Events"
    tell process "Notification Center"
      display notification argv with title "In Stock!!!" sound name "Frog"
    end tell
  end tell
end run