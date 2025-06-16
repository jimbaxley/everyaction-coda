// Add this function to create the custom menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Coda Sync')
    .addItem('▶️ Enable Auto-Sync', 'enableAutoSync')
    .addItem('⏸️ Pause Auto-Sync', 'pauseAutoSync')
    .addSeparator()
    .addItem('🔄 Run Sync Now', 'manualSync')
    .addItem('📊 Check Sync Status', 'checkSyncStatus')
    .addToUi();
}

// Function to enable auto-sync
function enableAutoSync() {
  PropertiesService.getScriptProperties().setProperty('SYNC_PAUSED', 'false');
  SpreadsheetApp.getUi().alert('✅ Auto-sync enabled! Changes will now trigger Coda updates.');
}

// Function to pause auto-sync
function pauseAutoSync() {
  PropertiesService.getScriptProperties().setProperty('SYNC_PAUSED', 'true');
  SpreadsheetApp.getUi().alert('⏸️ Auto-sync paused! Make your changes safely. Use "Enable Auto-Sync" when ready.');
}

// Function to manually run sync
function manualSync() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('Manual Sync', 'Choose sync type:\n\nYES = Quick sync (active sheet only)\nNO = Full sync (all sheets)', ui.ButtonSet.YES_NO_CANCEL);
  
  if (response == ui.Button.YES) {
    try {
      combineSheetsAndPushToCoda(); // Quick sync - active sheet only
      ui.alert('✅ Quick sync completed successfully!');
    } catch (error) {
      ui.alert('❌ Quick sync failed: ' + error.toString());
    }
  } else if (response == ui.Button.NO) {
    try {
      fullSyncAllSheetsToCoda(); // Full sync - all sheets
      ui.alert('✅ Full sync completed successfully!');
    } catch (error) {
      ui.alert('❌ Full sync failed: ' + error.toString());
    }
  }
}

// Function to check sync status
function checkSyncStatus() {
  var isPaused = PropertiesService.getScriptProperties().getProperty('SYNC_PAUSED') === 'true';
  var status = isPaused ? '⏸️ PAUSED' : '▶️ ENABLED';
  var message = `Coda Auto-Sync Status: ${status}\n\n`;
  
  if (isPaused) {
    message += 'Auto-sync is currently paused. Changes to sheets will not trigger Coda updates.';
  } else {
    message += 'Auto-sync is enabled. Changes to sheets will automatically update Coda.';
  }
  
  SpreadsheetApp.getUi().alert('Sync Status', message, SpreadsheetApp.getUi().ButtonSet.OK);
}

// Modified main function to only update the last edited sheet
function combineSheetsAndPushToCoda() {
  // Check if sync is paused
  var isPaused = PropertiesService.getScriptProperties().getProperty('SYNC_PAUSED') === 'true';
  if (isPaused) {
    console.log('Sync is paused. Skipping execution.');
    return;
  }
  
  // Add a small delay at the start to let rapid changes settle
  Utilities.sleep(1000);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var combined = [];
  
  // Get secure configuration
  const CODA_API_TOKEN = PropertiesService.getScriptProperties().getProperty('CODA_API_TOKEN');
  const DOC_ID = 'OySK5JOQh-';
  const TABLE_ID = 'grid-XYHf_RcubV';
  
  if (!CODA_API_TOKEN) {
    console.error('CODA_API_TOKEN not found. Run storeApiToken() first.');
    return;
  }
  
  // Detect which sheet was last edited
  var activeSheet = ss.getActiveSheet();
  var lastEditedSheetName = activeSheet ? activeSheet.getName() : null;
  
  console.log(`Last edited sheet detected: ${lastEditedSheetName}`);
  
  // Always add header row first for combined sheet
  combined.push(["EventID", "Canvasser", "Total Attempts", "Canvassed"]);
  
  // Process all sheets for the combined view, but only update Coda for the edited sheet
  var editedSheetResults = [];
  
  sheets.forEach(function(sheet) {
    if (sheet.getName() === "Combined") return;
    
    var sheetName = sheet.getName();
    var data = sheet.getRange(7, 1, sheet.getLastRow(), 3).getValues();
    var sheetResults = [];
    
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        if (data[i][0] && data[i][0].toString().trim() !== "") {
          // Format the canvasser name to "Last, First" format
          var formattedCanvasser = formatNameToLastFirst(data[i][0]);
          
          // For Google Sheets Combined tab (always update this)
          combined.push([sheetName, formattedCanvasser, data[i][1], data[i][2]]);
          
          // For Coda - only collect data for the edited sheet
          if (sheetName === lastEditedSheetName) {
            sheetResults.push({
              eventId: sheetName,
              canvasser: formattedCanvasser,
              totalAttempts: data[i][1] || 0,
              canvassed: data[i][2] || 0
            });
          }
        }
      }
    }
    
    // Store results for the edited sheet
    if (sheetName === lastEditedSheetName) {
      editedSheetResults = sheetResults;
    }
  });
  
  // Update Google Sheets Combined tab (always do this)
  updateCombinedSheet(combined);
  
  // Only update Coda for the last edited sheet
  if (lastEditedSheetName && lastEditedSheetName !== "Combined") {
    if (editedSheetResults.length > 0) {
      console.log(`Updating Coda for edited event: ${lastEditedSheetName} with ${editedSheetResults.length} results`);
      updateCodaForEvent(lastEditedSheetName, editedSheetResults);
    } else {
      console.log(`Clearing Coda data for edited event: ${lastEditedSheetName} (no data found)`);
      clearCodaForEvent(lastEditedSheetName);
    }
  } else {
    console.log('No specific sheet to update in Coda (either Combined sheet or no active sheet detected)');
  }
}

// New function to update Coda for a specific event only
function updateCodaForEvent(eventId, eventResults) {
  const CODA_API_TOKEN = PropertiesService.getScriptProperties().getProperty('CODA_API_TOKEN');
  const DOC_ID = 'OySK5JOQh-';
  const TABLE_ID = 'grid-XYHf_RcubV';
  
  try {
    // Step 1: Delete existing rows for this event
    clearCodaForEvent(eventId);
    
    // Step 2: Wait before adding new data
    Utilities.sleep(1500);
    
    // Step 3: Add new data for this event
    if (eventResults.length > 0) {
      addRowsToCoda(eventResults);
    }
    
  } catch (error) {
    console.error(`Error updating Coda for event ${eventId}:`, error);
    
    // Exponential backoff retry for 429 errors
    if (error.toString().includes('429')) {
      console.log('Rate limit hit, retrying with exponential backoff...');
      retryWithBackoff(() => updateCodaForEvent(eventId, eventResults));
    }
  }
}

// New function to clear Coda data for a specific event
function clearCodaForEvent(eventId) {
  const CODA_API_TOKEN = PropertiesService.getScriptProperties().getProperty('CODA_API_TOKEN');
  const DOC_ID = 'OySK5JOQh-';
  const TABLE_ID = 'grid-XYHf_RcubV';
  
  try {
    // Get rows filtered by eventId
    const getUrl = `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${TABLE_ID}/rows`;
    const getOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CODA_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };
    
    const getResponse = UrlFetchApp.fetch(getUrl, getOptions);
    const data = JSON.parse(getResponse.getContentText());
    const allRows = data.items || [];
    
    // Filter rows that match this eventId
    const rowsToDelete = allRows.filter(row => {
      const eventIdCell = row.values['c-9T4xx_5YoC']; // EventID column
      return eventIdCell && eventIdCell.toString() === eventId;
    });
    
    if (rowsToDelete.length === 0) {
      console.log(`No existing rows found for event: ${eventId}`);
      return;
    }
    
    console.log(`Deleting ${rowsToDelete.length} existing rows for event: ${eventId}`);
    
    // Delete in smaller batches to avoid rate limits
    const rowIds = rowsToDelete.map(row => row.id);
    const batchSize = 25; // Smaller batches for better rate limiting
    
    for (let i = 0; i < rowIds.length; i += batchSize) {
      const batch = rowIds.slice(i, i + batchSize);
      const deleteUrl = `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${TABLE_ID}/rows`;
      
      const deletePayload = { rowIds: batch };
      const deleteOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${CODA_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify(deletePayload)
      };
      
      UrlFetchApp.fetch(deleteUrl, deleteOptions);
      console.log(`Deleted batch of ${batch.length} rows for event ${eventId}`);
      
      // Rate limiting between batches
      if (i + batchSize < rowIds.length) {
        Utilities.sleep(1000);
      }
    }
    
  } catch (error) {
    console.error(`Error clearing Coda for event ${eventId}:`, error);
    throw error;
  }
}

// New function to add rows with better rate limiting
function addRowsToCoda(results) {
  const CODA_API_TOKEN = PropertiesService.getScriptProperties().getProperty('CODA_API_TOKEN');
  const DOC_ID = 'OySK5JOQh-';
  const TABLE_ID = 'grid-XYHf_RcubV';
  const url = `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${TABLE_ID}/rows`;
  
  // Process in smaller batches
  const batchSize = 20; // Smaller batches to avoid rate limits
  
  for (let i = 0; i < results.length; i += batchSize) {
    const batch = results.slice(i, i + batchSize);
    
    const rows = batch.map(result => ({
      cells: [
        { column: 'c-9T4xx_5YoC', value: result.eventId },
        { column: 'c-Qic_RUhN7l', value: result.canvasser },
        { column: 'c-AFLm554kF0', value: result.totalAttempts },
        { column: 'c-x3S38feDcu', value: result.canvassed }
      ]
    }));
    
    const payload = {
      rows: rows,
      disableParsing: true
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CODA_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(payload)
    };
    
    try {
      const response = UrlFetchApp.fetch(url, options);
      const responseData = JSON.parse(response.getContentText());
      console.log(`Added batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(results.length/batchSize)} to Coda`);
      
      // Rate limiting between batches
      if (i + batchSize < results.length) {
        Utilities.sleep(1500);
      }
      
    } catch (error) {
      console.error(`Error adding batch to Coda:`, error);
      if (error.toString().includes('429')) {
        // Wait longer and retry this batch
        console.log('Rate limit hit, waiting before retry...');
        Utilities.sleep(5000);
        i -= batchSize; // Retry this batch
      } else {
        throw error;
      }
    }
  }
}

// Exponential backoff retry function
function retryWithBackoff(func, maxRetries = 3, baseDelay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return func();
    } catch (error) {
      if (attempt === maxRetries || !error.toString().includes('429')) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      Utilities.sleep(delay);
    }
  }
}

// Helper function to update the combined sheet
function updateCombinedSheet(combined) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var combinedSheet = ss.getSheetByName("Combined") || ss.insertSheet("Combined");
  
  combinedSheet.clearContents();
  if (combined.length > 0) {
    combinedSheet.getRange(1, 1, combined.length, combined[0].length).setValues(combined);
    
    // Format header row
    var headerRange = combinedSheet.getRange(1, 1, 1, combined[0].length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
  }
}

// New function for full sync (useful for manual syncs or initial setup)
function fullSyncAllSheetsToCoda() {
  var isPaused = PropertiesService.getScriptProperties().getProperty('SYNC_PAUSED') === 'true';
  if (isPaused) {
    console.log('Sync is paused. Skipping execution.');
    return;
  }
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var combined = [];
  
  const CODA_API_TOKEN = PropertiesService.getScriptProperties().getProperty('CODA_API_TOKEN');
  const DOC_ID = 'OySK5JOQh-';
  const TABLE_ID = 'grid-XYHf_RcubV';
  
  if (!CODA_API_TOKEN) {
    console.error('CODA_API_TOKEN not found. Run storeApiToken() first.');
    return;
  }
  
  console.log('Starting full sync of all sheets to Coda...');
  
  // Always add header row first for combined sheet
  combined.push(["EventID", "Canvasser", "Total Attempts", "Canvassed"]);
  
  // Process each sheet individually
  sheets.forEach(function(sheet) {
    if (sheet.getName() === "Combined") return;
    
    var sheetName = sheet.getName();
    var data = sheet.getRange(7, 1, sheet.getLastRow(), 3).getValues();
    var sheetResults = [];
    
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        if (data[i][0] && data[i][0].toString().trim() !== "") {
          // Format the canvasser name to "Last, First" format
          var formattedCanvasser = formatNameToLastFirst(data[i][0]);
          
          // For Google Sheets Combined tab
          combined.push([sheetName, formattedCanvasser, data[i][1], data[i][2]]);
          
          // For Coda (per-sheet results)
          sheetResults.push({
            eventId: sheetName,
            canvasser: formattedCanvasser,
            totalAttempts: data[i][1] || 0,
            canvassed: data[i][2] || 0
          });
        }
      }
    }
    
    // Update Coda for this specific event
    if (sheetResults.length > 0) {
      console.log(`Full sync: Updating Coda for event: ${sheetName} with ${sheetResults.length} results`);
      updateCodaForEvent(sheetName, sheetResults);
      
      // Rate limiting: wait between sheet updates
      Utilities.sleep(2000); // 2 second delay between events
    } else {
      // If sheet has no data, clear it from Coda
      console.log(`Full sync: Clearing Coda data for event: ${sheetName} (no data found)`);
      clearCodaForEvent(sheetName);
      Utilities.sleep(1000); // 1 second delay for clear operations
    }
  });
  
  // Update Google Sheets Combined tab
  updateCombinedSheet(combined);
  
  console.log('Full sync completed!');
}

// Smart name formatting function to ensure "Last, First" format
function formatNameToLastFirst(nameString) {
  if (!nameString || typeof nameString !== 'string') {
    return nameString;
  }
  
  var name = nameString.toString().trim();
  
  // If already empty or very short, return as-is
  if (name.length <= 2) {
    return name;
  }
  
  // If it already contains a comma, assume it's already in "Last, First" format
  if (name.includes(',')) {
    // Clean up any extra spaces around the comma
    var parts = name.split(',');
    if (parts.length >= 2) {
      var lastName = parts[0].trim();
      var firstName = parts[1].trim();
      return `${lastName}, ${firstName}`;
    }
    return name; // Return as-is if comma format is weird
  }
  
  // Split by spaces to analyze the name
  var nameParts = name.split(/\s+/).filter(part => part.length > 0);
  
  // If only one word, return as-is (could be just first name or last name)
  if (nameParts.length === 1) {
    return name;
  }
  
  // If two parts, determine if it's "First Last" or already "Last First"
  if (nameParts.length === 2) {
    var firstPart = nameParts[0];
    var secondPart = nameParts[1];
    
    // Check for common indicators that it's in "First Last" format:
    // 1. First part has lowercase after first letter (likely first name)
    // 2. Second part is all caps or title case (likely last name)
    // 3. First part ends with common first name suffixes
    var firstNameIndicators = [
      firstPart.length > 1 && firstPart.slice(1).toLowerCase() === firstPart.slice(1), // Has lowercase
      /^[A-Z][a-z]+$/.test(firstPart), // Title case pattern typical of first names
      firstPart.toLowerCase().match(/(john|jane|mike|mary|david|sarah|chris|alex|sam|pat|kim)/) // Common first names
    ];
    
    var lastNameIndicators = [
      secondPart === secondPart.toUpperCase() && secondPart.length > 1, // All caps
      /^[A-Z][A-Z]+$/.test(secondPart), // Multiple capitals (like McDonald)
      secondPart.toLowerCase().match(/(smith|johnson|williams|jones|brown|davis|miller|wilson|moore|taylor)/) // Common last names
    ];
    
    // If we detect "First Last" pattern, convert to "Last, First"
    if (firstNameIndicators.some(indicator => indicator) || lastNameIndicators.some(indicator => indicator)) {
      return `${secondPart}, ${firstPart}`;
    }
    
    // If uncertain, but second part looks more like a last name (starts with capital, rest lowercase)
    if (/^[A-Z][a-z]+$/.test(secondPart) && /^[A-Z][a-z]+$/.test(firstPart)) {
      return `${secondPart}, ${firstPart}`;
    }
    
    // Default: assume it's already in "Last First" format, add comma
    return `${firstPart}, ${secondPart}`;
  }
  
  // For three or more parts, assume "First Middle Last" or "First Last Last"
  if (nameParts.length >= 3) {
    var firstName = nameParts[0];
    var lastName = nameParts.slice(-1)[0]; // Last part is surname
    var middleParts = nameParts.slice(1, -1); // Everything in between
    
    // Create "Last, First Middle" format
    var middleNames = middleParts.length > 0 ? ' ' + middleParts.join(' ') : '';
    return `${lastName}, ${firstName}${middleNames}`;
  }
  
  // Fallback: return original
  return name;
}

// Helper function to test name formatting (for debugging)
function testNameFormatting() {
  var testNames = [
    "John Smith",        // Should become "Smith, John"
    "Smith, John",       // Should stay "Smith, John"
    "Mary Johnson",      // Should become "Johnson, Mary"
    "DAVIS, Mike",       // Should stay "DAVIS, Mike"
    "Sarah Jane Wilson", // Should become "Wilson, Sarah Jane"
    "John",              // Should stay "John"
    "O'Connor, Pat",     // Should stay "O'Connor, Pat"
    "Van Der Berg, Anna" // Should stay "Van Der Berg, Anna"
  ];
  
  testNames.forEach(name => {
    console.log(`"${name}" -> "${formatNameToLastFirst(name)}"`);
  });
}

// ...existing code for pushResultsToCoda, clearCodaTable, and storeApiToken functions...

function pushResultsToCoda(allResults) {
  const CODA_API_TOKEN = PropertiesService.getScriptProperties().getProperty('CODA_API_TOKEN');
  const DOC_ID = 'OySK5JOQh-';
  const TABLE_ID = 'grid-XYHf_RcubV';
  
  if (!CODA_API_TOKEN) {
    console.error('CODA_API_TOKEN not found. Run storeApiToken() first.');
    return;
  }
  
  console.log('Clearing Coda table and pushing fresh results:', allResults);
  
  if (!allResults || !Array.isArray(allResults) || allResults.length === 0) {
    console.log('No valid results to push, clearing table anyway');
    clearCodaTable(CODA_API_TOKEN, DOC_ID, TABLE_ID);
    return;
  }
  
  const url = `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${TABLE_ID}/rows`;
  
  const rows = allResults.map(result => ({
    cells: [
      { column: 'c-9T4xx_5YoC', value: result.eventId },
      { column: 'c-Qic_RUhN7l', value: result.canvasser },
      { column: 'c-AFLm554kF0', value: result.totalAttempts },
      { column: 'c-x3S38feDcu', value: result.canvassed }
    ]
  }));
  
  const payload = {
    rows: rows,
    disableParsing: true,        // Speeds up import
    keyColumns: []               // Empty = don't check for duplicates, replace all
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CODA_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload)
  };
  
  try {
    // First, clear the table
    clearCodaTable(CODA_API_TOKEN, DOC_ID, TABLE_ID);
    
    // Add a delay between clear and insert to ensure clearing is complete
    Utilities.sleep(1500); // 1.5 second delay
    
    // Then add fresh data
    const response = UrlFetchApp.fetch(url, options);
    const responseData = JSON.parse(response.getContentText());
    console.log('Success! Fresh data pushed to Coda:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error pushing to Coda:', error);
    return null;
  }
}

// Helper function to clear the Coda table
function clearCodaTable(apiToken, docId, tableId) {
  try {
    console.log('Starting to clear Coda table...');
    
    // Get all rows first
    const getUrl = `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/rows`;
    const getOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    };
    
    const getResponse = UrlFetchApp.fetch(getUrl, getOptions);
    const data = JSON.parse(getResponse.getContentText());
    const existingRows = data.items || [];
    
    if (existingRows.length === 0) {
      console.log('Table already empty');
      return;
    }
    
    console.log(`Found ${existingRows.length} rows to delete`);
    
    // Delete all existing rows
    const rowIds = existingRows.map(row => row.id);
    const deleteUrl = `https://coda.io/apis/v1/docs/${docId}/tables/${tableId}/rows`;
    
    // Batch delete (can delete up to 500 rows at once)
    const batchSize = 100; // Smaller batches for more reliability
    for (let i = 0; i < rowIds.length; i += batchSize) {
      const batch = rowIds.slice(i, i + batchSize);
      const deletePayload = {
        rowIds: batch
      };
      
      const deleteOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify(deletePayload)
      };
      
      UrlFetchApp.fetch(deleteUrl, deleteOptions);
      console.log(`Deleted batch of ${batch.length} rows (${i + batch.length}/${rowIds.length} total)`);
      
      // Small delay between batches if there are more batches
      if (i + batchSize < rowIds.length) {
        Utilities.sleep(500); // 0.5 second delay between batches
      }
    }
    
    console.log('Finished clearing Coda table');
    
  } catch (error) {
    console.error('Error clearing Coda table:', error);
  }
}

// Run this once to store your API token securely
function storeApiToken() {
  const token = '[YOUR_API_TOKEN_HERE]'; // Replace with your actual Coda API token
  PropertiesService.getScriptProperties().setProperty('CODA_API_TOKEN', token);
  console.log('Token stored securely');
}