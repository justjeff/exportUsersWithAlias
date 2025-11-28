// Function to get the formatted date string
function getFormattedDate() {

  const formattedDate = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      'yyyy-MM-dd_HH-mm-ss',
  );

  Logger.log("date: " + formattedDate);
  return formattedDate;
}

function createSpreadsheetInFolder(spreadsheetName, folderId) {
  let spreadsheet;

  if (folderId) {
    try {
      // Get folder object by ID
      const folder = DriveApp.getFolderById(folderId);

      // Create the file
      spreadsheet = SpreadsheetApp.create(spreadsheetName);

      // Move the file to the specified folder
      const file = DriveApp.getFileById(spreadsheet.getId());
      folder.addFile(file);

      // Remove the file from the root folder
      DriveApp.getRootFolder().removeFile(file);

      Logger.log("Spreadsheet created: " + spreadsheet.getUrl() + " in folder: " + folder.getName());
    }
    catch (error) {
      Logger.log("Error creating spreadsheet in folder: " + error.message);
      // Fallback to creating in root folder
      spreadsheet = SpreadsheetApp.create(spreadsheetName);
      Logger.log("Spreadsheet created in root folder: " + spreadsheet.getUrl());
    }
  }
  else {
    // Create the file in the root folder
    spreadsheet = SpreadsheetApp.create(spreadsheetName);
    Logger.log("Spreadsheet created in root Drive: " + spreadsheet.getUrl());
  }