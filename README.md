# Time to Week-End

Are you tired of feeling like a weekday warrior? Take charge of your weekends with Time to Week-End, the VS Code extension that helps you count down the minutes until Friday night!

## Features

- Display the remaining time until the weekend in the status bar.


## Extension Settings

This extension contributes the following settings:

- `time-to-week-end.format`: The format to display the remaining time.
  - **hms**: Display time remaining as '00h 00m 00s'
  - **hh:mm:ss**: Display time remaining as '00:00:00'
  - **hours,minutes,seconds**: Display time remaining as '00 hours, 00 minutes, 00 seconds'
  - **dhms**: Display time remaining as '00d 00h 00m 00s'
  - **dd:hh:mm:ss**: Display time remaining as '00:00:00:00'
  - **days,hours,minutes,seconds**: Display time remaining as '00 days, 00 hours, 00 minutes, 00 seconds'

- `time-to-week-end.displayText`: Format the text displayed in the status bar.
  - **short**: Display a short text format.
  - **medium**: Display a medium text format.
  - **none**: Do not display any text.
  - **custom**: Use a custom text format.
  - **long**: Display a long text format.

- `time-to-week-end.customText`: Customize the text to display in the status bar with the remaining time. Use mustache syntax with `{{date}}` and `{{format}}` to format the date.
  - **text**: Custom text to display in the status bar with remaining time.
  - **format**: Custom date format to display in the status bar with remaining time.

- `time-to-week-end.week-end`: The date and time when the countdown ends.
  - **dayOfWeek**: The day of the week when the countdown ends (e.g., Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday).
  - **timeOfDay**: The time of day when the countdown ends, in format 'HH:mm' with quarter-hour intervals.

- `time-to-week-end.on-week-end`: This setting allows you to customize the message that appears when the time-to-weekend countdown reaches zero (i.e., when it's the weekend).
  - **color**: The background color for the week-end message. Default is #FF80BF.
  - **title**: The title for the week-end message. Default is "Week-end !".
  - **text**: The text content for the week-end message. Default is "It's time to relax, enjoy your week-end !".
  - **emojis**: An array of emojis to be used for the confetti effect. Default is ["🎉", "🎊", "🥳", "🎈", "🎁"].
  - **gif**: The URL of the GIF to be displayed. 
  - **url**: An url to open alternativly
## Installation

1. Open Visual Studio Code.
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac) to open the Quick Open dialog.
3. Type `ext install time-to-week-end` and press `Enter`.

## Acknowledgements

This extension was made possible thanks to the following dependencies:

- *date-fns* for date manipulation
- *js-confetti* for confetti animations
- *handlebars* for the beautiful week-end behavior
- *handlebars-helpers* for the beautiful week-end behavior


## Contributing

If you have any suggestions or find bugs, please [open an issue on GitHub](https://github.com/Moq77111113/time-to-week-end/issues).

## License

[MIT](LICENSE)
