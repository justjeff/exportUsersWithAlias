// Entry point for the web app.
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Admin User Alias Report Tool');
}

// Main function to export users with aliases
function exportUsersWithAliases() {
  try {
    // Get date
    const formattedDate = getFormattedDate();

    // Create a new spreadsheet
    const spreadsheetName = "Users with Aliases Report " + formattedDate;

    const spreadsheet = createSpreadsheetInFolder(spreadsheetName, targetFolderId);
    const sheet = spreadsheet.getActiveSheet();

    const data = [];
    const headers = ["Primary Email", "Full Name", "Aliases (Comma Separated)"];

    let pageToken;

    // Add the headers to the sheet
    data.push(headers);

    Logger.log("Starting user fetch...");

    // Fetch users from the Directory API
    // The Directory API returns results in pages, so a do/while loop is necessary.
    do {
      // List up to 500 users per API call
      const response = AdminDirectory.Users.list({
        customer: 'my_customer',
        maxResults: 500,
        fields: 'nextPageToken,users(primaryEmail,name,aliases)', // Only retrieve necessary fields
        pageToken: pageToken
      });

      const users = response.users;

      if (users && users.length > 0) {
        // Filter and Process Users
        users.forEach(user => {
          // The aliases property will be an array only if aliases exist
          if (user.aliases && user.aliases.length > 0) {
            const aliasList = user.aliases.join(', '); // Join aliases into a single string

            data.push([
              user.primaryEmail,
              user.name.fullName,
              aliasList
            ]);
          }
        });
        Logger.log("Processed %s users in this page.", users.length);
      } else {
        Logger.log("No users found in this page.");
      }

      // Prepare for the next page
      pageToken = response.nextPageToken;

    } while (pageToken);

    // 4. Write Data to Sheet
    if (data.length > 1) {
      sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
      Logger.log("Export complete! Found %s users with aliases.", data.length - 1);
      Logger.log("Spreadsheet URL: " + spreadsheet.getUrl());
      Logger.log("Spreadsheet ID: " + spreadsheet.getId());
    } else {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      Logger.log("Export complete! No users with aliases were found.");
      Logger.log("Spreadsheet URL: " + spreadsheet.getUrl());
      Logger.log("Spreadsheet ID: " + spreadsheet.getId());
    }
  } catch (error) {
    Logger.log('Error exporting users with aliases: ' + error.message);
    Logger.log(error.stack);
    throw error;
  }
}