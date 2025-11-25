/**
 * Fetches all users in the domain, filters for those with aliases,
 * and exports the data to a new Google Sheet.
 */
function exportUsersWithAliases() {
  // 1. Setup & Initialization
  const spreadsheetName = "Users with Aliases Report";
  const sheet = SpreadsheetApp.create(spreadsheetName).getActiveSheet();
  const data = [];
  const headers = ["Primary Email", "Full Name", "Aliases (Comma Separated)"];

  let pageToken;

  // Add the headers to the sheet
  data.push(headers);

  Logger.log("Starting user fetch from Admin Directory...");

  // 2. Paginated Fetch Loop
  // The Directory API returns results in pages, so a do/while loop is necessary.
  do {
    // List up to 500 users per API call
    const response = AdminDirectory.Users.list({
      customer: 'my_customer', // Use 'my_customer' for your own domain
      maxResults: 500,
      fields: 'nextPageToken,users(primaryEmail,name,aliases)', // Only retrieve necessary fields
      pageToken: pageToken
    });

    const users = response.users;

    if (users && users.length > 0) {
      // 3. Filter and Process Users
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
    }

    // Prepare for the next page
    pageToken = response.nextPageToken;

  } while (pageToken);

  // 4. Write Data to Sheet
  if (data.length > 1) {
    sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
    Logger.log("Export complete! Found %s users with aliases.", data.length - 1);
  } else {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    Logger.log("Export complete! No users with aliases were found.");
  }
}