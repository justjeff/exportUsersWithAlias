# exportUsersWithAlias
Google Apps Script to pull a report of all users in primary domain with aliases.

Open the Script Editor: Go to script.google.com/create to start a new project, or open the editor from your target Google Sheet (Extensions > Apps Script).

Enable Advanced Service:

In the left-hand menu, click + Add a service.

Select Admin SDK API from the list.

The service name should default to AdminDirectory. Click Add.

Save the Script: Click the Save icon (floppy disk).

Select Function: In the toolbar, ensure the dropdown menu next to the "Run" button is set to exportUsersWithAliases.

Run: Click the Run button.

Authorization (First Run Only):

The first time, you will be prompted to "Review permissions."

Select your admin account.

You will see a warning screen; click "Go to [Project Name] (unsafe)" (this is normal for self-written scripts).

Review the permissions (it will ask for permission to view and manage users, groups, and files, which is required for the Admin SDK and creating the Sheet). Click Allow.

Once the script finishes, a new Google Sheet named "Users with Aliases Report" will appear in your Google Drive, containing the list of users and their aliases.
