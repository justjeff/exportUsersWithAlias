# exportUsersWithAlias
Google Apps Script to pull a report of all users in primary domain with aliases.

# Project Setup
## With CLASP
First, update the `appscript.json` to reflect your own location/configuration needs.

The google apps project root is at /src. set up your .clasp.json file as such.

From the parent folder, you can run `clasp create`.
```shell
$ clasp create --rootDir ./src --title "exportUsersWithAlias"
```
Should output this `.clasp.json`:
```json
{
  "scriptId": "<YOUR_SCRIPT_ID>",
  "rootDir": "src",
  "scriptExtensions": [
    ".js",
    ".gs"
  ],
  "htmlExtensions": [
    ".html"
  ],
  "jsonExtensions": [
    ".json"
  ],
  "filePushOrder": [],
  "skipSubdirectories": false
}
```
## In the Script Editor
Go to https://script.google.com/create to start a new project.

1. Enable Advanced Service:
   - In the left-hand menu, click + Add a service.
   - Select Admin SDK API from the list.
   - The service name should default to AdminDirectory. Click Add.
2. Paste the code from your local `Code.gs` into the editor's `Code.gs`, overwriting whatever was there.
3. Save the Script:
   - Click the Save icon (floppy disk).
   - Select Function: In the toolbar, ensure the dropdown menu next to the "Run" button is set to exportUsersWithAliases.
   - Run: Click the Run button.
4. Authorization (First Run Only):
   - The first time, you will be prompted to "Review permissions."
   - Select your admin account.
   - You will see a warning screen; click "Go to [Project Name] (unsafe)" (this is normal for self-written scripts).
   - Review the permissions (it will ask for permission to view and manage users, groups, and files, which is required for the Admin SDK and creating the Sheet). Click Allow.
   - Once the script finishes, a new Google Sheet named "Users with Aliases Report" will appear at the root of your Google Drive, containing the list of users and their aliases.
