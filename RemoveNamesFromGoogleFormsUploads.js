let ourSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
let roughSheet = ourSpreadsheet.getActiveSheet();
let dataSheet = ourSpreadsheet.getSheetByName("data");
let folderId = "GOOGLE_FOLDER_ID"; // Folder ID is found at the end of the url of the folder you are viewing
let GOOGLE_NAME_SEPARATOR = ' - '; // This is the separator google appends to the end of form uploads, the user's name is after this

// NOTE: WHETHER OR NOT IT WAS UPLOADED FROM GOOGLE FORMS, THIS WILL RENAME ANY FILES THAT HAVE THE SEPARATOR IN IT. 
//       KEEP THIS IN MIND AND MAKE SURE TO USE THE 'PREVIEW RENAME' FUNCTIONS BEFORE RUNNING 'RENAME' FUNCTIONS

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Rename Files Menu')
  .addItem('Preview Rename File Names', 'previewRenameFileNames')
  .addItem('Preview Rename File Names Recursively', 'previewRenameFileNamesRecursively')
  .addSeparator()
  .addItem('Rename File Names', 'renameFileNames') // THESE ACTUALLY RENAME THE FILE
  .addItem('Rename File Names Recursively', 'renameFileNamesRecursively') // THESE ACTUALLY RENAME THE FILE
  .addToUi();
}

function previewRenameFileNames() {
  var folder = DriveApp.getFolderById(folderId);
  folderParser(folder, false, false);
}

function previewRenameFileNamesRecursively() {
  
  var folder = DriveApp.getFolderById(folderId);
  folderParser(folder, false, true);
}

function renameFileNames() {
  var folder = DriveApp.getFolderById(folderId);
  folderParser(folder, true, false);
}

function renameFileNamesRecursively() {
  var folder = DriveApp.getFolderById(folderId);
  folderParser(folder, true, true);
}

/**
 * @param folder - DriveApp.Folder
 * @param renameFiles - Boolean, whether to actually rename the files or preview the name change
 * @param recursion - Boolean, whether to recursively perform the function on all subsequent folders inside the given folder

 */
function folderParser(folder, renameFiles, recursion) {
  // var folder = DriveApp.getFolderById(folderId);
  var myFileIterator = folder.getFiles();
  var fileNumber = 1;
  
  while(myFileIterator.hasNext()){
    var currentFile = myFileIterator.next();
    var currentFileName = currentFile.getName();
    let indexOfNameSeparator = currentFileName.lastIndexOf(GOOGLE_NAME_SEPARATOR);
    let indexOfFileExtension = currentFileName.lastIndexOf('.');

    // Check if the name separator is there, and come up with new file name if so
    let finalFileName = currentFileName;
    if (indexOfNameSeparator !== -1) {
      let extension = ""; 
      if (indexOfFileExtension !== -1) {
         currentFileName.substring(indexOfFileExtension); // Preserve the file extension at the end of the file if it's there
      }
      let newFileName = currentFileName.substring(0, indexOfNameSeparator);
      finalFileName = `${newFileName}${extension}`;
    }

    // Info to put into the sheet
    let resultRow = [
      (new Date()).toString(),
      folder.getUrl(),
      currentFile.getUrl(),
      fileNumber,
      currentFileName,
      finalFileName
    ];
    
    // Rename the file!
    if (renameFiles) {
      if (currentFileName !== finalFileName) {
        currentFile.setName(finalFileName);
        resultRow.push("File renamed!");
      }
    } else {
      if (currentFileName !== finalFileName) {
        resultRow.push("Will be renamed on run");
      }
    }

    roughSheet.appendRow(resultRow);
    fileNumber++
  }

  // Do this Recursively!
  if (recursion) {
    var folderIterator = folder.getFolders();
    if (folderIterator) {
        while(folderIterator.hasNext()){
          folderParser(folderIterator.next(), renameFiles, recursion);
        }
    }
  }
}
