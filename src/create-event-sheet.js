// Google Apps Script: Create a new event tab with headers in Google Sheets
// Usage: createEventTab('12345', 'My Event Name', '2025-06-13')

// ...existing code...

function createEventTab(eventId, eventName, startDate) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Clean the eventId to make it a valid sheet name
  var sheetName = cleanSheetName(eventId);
  
  // Check if a sheet with this name already exists
  if (ss.getSheetByName(sheetName)) {
    return {
      success: false,
      message: 'A sheet with this Event ID already exists: ' + sheetName
    };
  }
  
  try {
    // Create new sheet and rename it immediately
    var sheet = ss.insertSheet();
    sheet.setName(sheetName);

    // Fill out header info (rows 1-6)
    sheet.getRange('A1').setValue('EVENTID');
    sheet.getRange('B1').setValue(eventId);
    sheet.getRange('A2').setValue('NAME');
    sheet.getRange('B2').setValue(eventName);
    sheet.getRange('A3').setValue('START DATE');
    sheet.getRange('B3').setValue(startDate);
    sheet.getRange('A5').setValue('Fill in data below. Do not edit rows 1-6.');

    // Set up column headers (row 6)
    sheet.getRange('A6').setValue('Canvasser');
    sheet.getRange('B6').setValue('Total Attempts');
    sheet.getRange('C6').setValue('Canvassed');
    sheet.getRange('D6').setValue('Busy');
    sheet.getRange('E6').setValue('Call Back');
    sheet.getRange('F6').setValue('Deceased');
    
    return {
      success: true,
      message: 'Sheet created: ' + sheetName
    };
    
  } catch (error) {
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

// Helper function to clean sheet names
function cleanSheetName(name) {
  return name.toString()
    .replace(/[\/\\?*\[\]:]/g, '_')  // Replace invalid chars
    .trim()
    .substring(0, 100) || 'Event_' + Date.now();
}

function doPost(e) {
  try {
    var params = JSON.parse(e.postData.contents);
    var eventId = params.eventId;
    var eventName = params.eventName;
    var startDate = params.startDate;

    if (!eventId || !eventName || !startDate) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Missing required parameters'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var result = createEventTab(eventId, eventName, startDate);
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

