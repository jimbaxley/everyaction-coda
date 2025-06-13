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
  var response = ui.alert('Manual Sync', 'Run sync to Coda now?', ui.ButtonSet.YES_NO);
  
  if (response == ui.Button.YES) {
    try {
      combineSheetsAndPushToCoda();
      ui.alert('✅ Manual sync completed successfully!');
    } catch (error) {
      ui.alert('❌ Sync failed: ' + error.toString());
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

// Modified main function to check pause status
function combineSheetsAndPushToCoda() {
  // Check if sync is paused
  var isPaused = PropertiesService.getScriptProperties().getProperty('SYNC_PAUSED') === 'true';
  if (isPaused) {
    console.log('Sync is paused. Skipping execution.');
    return;
  }
  
  // Add a small delay at the start to let rapid changes settle
  Utilities.sleep(1000); // 1 second delay
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var combined = [];
  var headerAdded = false;
  
  // Get secure configuration
  const CODA_API_TOKEN = PropertiesService.getScriptProperties().getProperty('CODA_API_TOKEN');
  const DOC_ID = 'OySK5JOQh-';
  const TABLE_ID = 'grid-XYHf_RcubV';
  
  if (!CODA_API_TOKEN) {
    console.error('CODA_API_TOKEN not found. Run storeApiToken() first.');
    return;
  }
  
  // Collect all data for both Google Sheets and Coda
  var allResultsForCoda = [];
  
  sheets.forEach(function(sheet) {
    if (sheet.getName() === "Combined") return;
    
    var sheetName = sheet.getName();
    var data = sheet.getRange(7, 1, sheet.getLastRow(), 3).getValues(); // Only columns A-C
    
    if (data.length > 1) {
      // For Google Sheets Combined tab
      if (!headerAdded) {
        combined.push(["EventID"].concat(data[0])); // Add header row
        headerAdded = true;
      }
      
      // Process each row
      for (var i = 1; i < data.length; i++) {
        // For Google Sheets
        combined.push([sheetName].concat(data[i]));
        
        // For Coda (convert to proper format)
        if (data[i][0] && data[i][0] !== "") { // Only if canvasser name exists
          allResultsForCoda.push({
            eventId: sheetName,
            canvasser: data[i][0] || '',
            totalAttempts: data[i][1] || 0,
            canvassed: data[i][2] || 0
          });
        }
      }
    }
  });
  
  // Update Google Sheets Combined tab
  var combinedSheet = ss.getSheetByName("Combined") || ss.insertSheet("Combined");
  combinedSheet.clearContents();
  if (combined.length > 0) {
    combinedSheet.getRange(1, 1, combined.length, combined[0].length).setValues(combined);
  }
  
  // Push to Coda
  if (allResultsForCoda.length > 0) {
    console.log(`Pushing ${allResultsForCoda.length} results to Coda`);
    pushResultsToCoda(allResultsForCoda);
  } else {
    console.log('No results to push to Coda');
  }
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