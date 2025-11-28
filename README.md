# exportUsersWithAlias
This Google Apps Script uses the **Admin SDK Directory API** to pull a comprehensive report of all users in your Google Workspace domain who have one or more email aliases. The final report is exported as a new Google Sheet in your Drive.

## Prerequisites
**Google Workspace Domain:** Must be executed by an administrator within a Google Workspace domain.

**Google APIs Used:** The Admin SDK Directory service and DriveApp service must be enabled in the Apps Script project's Services panel.

**OAuth Scopes:** The script will require authorization to access **Google Sheets** `SpreadsheetApp` and the **Admin Directory Service** `AdminDirectory`.

# Project Setup

## With CLASP
[CLASP](https://github.com/google/clasp) is a Node.js tool for working with Google Apps locally.

1. **File Structure:** This repo uses ./src as the project root. From the repo parent folder, run `clasp create` to set the root and project name.
   ``` shell
   clasp create --rootDir ./src --title "exportUsersWithAlias"
   ```
2. **Configuration:** Ensure `appscript.json` in `./src` reflects your project needs; e.g, `timeZone`.
3. **Push Code:** run `clasp push` to push your code/changes to the Google Apps Script environment.
   ``` shell
   clasp push
   ```
4. **Enable Admin SDK:** You must perform this step via the web editor as `clasp push` only uploads the manifest, not the auth.
   - Run `clasp open` to launch the web editor in a browser.
   - Follow **Step 1** from the **In the Script Editor** section below, and enable the **Admin SDK Advanced Service** via the web editor.


## In the Script Editor
If you are not comfortable in the command line, or don't have `clasp` configured, you can copy/paste the code in the web editor.

1. **Create Project and Enable Services**
   - Go to https://script.google.com/create to start a new project.
   - In the left-hand menu, click **+ Add a service**.
   - Select the following services from the list and click **Add**.
     - **Admin SDK API**
     - **Drive API**
2. **Paste Code and Save**
   - Replace the contents of `Code.gs` with the code in `./src/Code.gs`.
   - Add the `Utils.gs` file and contents.
   - Click the **Save icon**
3. **Run and Authorize**
   - In the toolbar, ensure the dropdown menu next to the "Run" button is set to `exportUsersWithAliases`.
   - Click the **Run** button.
   - The first run you will be prompted to _Review permissions_. Select your admin account.
   - You will see a warning screen; click "Go to [Project Name] (unsafe)" (this is normal for self-written scripts).
   - Review the permissions (it will ask for permission to view and manage users, groups, and files, which is required for the **Admin SDK** and creating the Sheet). Click **Allow**.


## Reports
By default, reports will be output to the root folder of your own Google Drive. Alternatively, you may pass a `folderId` to move the file to a specific directory in your Google Drive.

The sheet will include the following columns:
- Primary Email
- Full Name
- Aliases (Comma Separated)

----

# Resources
[Google Documentation | Google Apps Script](https://developers.google.com/apps-script)
[Google Documentation | CLASP](https://developers.google.com/apps-script/guides/clasp)
[Google Documentation | Admin SDK Directory API](https://developers.google.com/workspace/admin/directory/reference/rest)
[Google Documentation | Drive Service](https://developers.google.com/apps-script/reference/drive/)