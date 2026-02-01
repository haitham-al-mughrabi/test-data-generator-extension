// Background script for context menu
chrome.runtime.onInstalled.addListener(() => {
  // Create parent menu
  chrome.contextMenus.create({
    id: "testDataGenerator",
    title: "🎲 Fill with Test Data",
    contexts: ["editable"]
  });

  // Most commonly used generators
  const commonGenerators = [
    { id: "firstName", title: "First Name" },
    { id: "lastName", title: "Last Name" },
    { id: "fullName", title: "Full Name" },
    { id: "email", title: "Email" },
    { id: "mobileNumber", title: "Mobile Number" },
    { id: "address", title: "Address" },
    { id: "city", title: "City" },
    { id: "saudiId", title: "Saudi ID" },
    { id: "company", title: "Company" },
    { id: "jobTitle", title: "Job Title" },
    { id: "iban", title: "IBAN" },
    { id: "creditCard", title: "Credit Card" },
    { id: "date", title: "Date" },
    { id: "uuid", title: "UUID" },
    { id: "password", title: "Password" }
  ];

  commonGenerators.forEach(gen => {
    chrome.contextMenus.create({
      id: gen.id,
      parentId: "testDataGenerator",
      title: gen.title,
      contexts: ["editable"]
    });
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.parentMenuItemId === "testDataGenerator") {
    chrome.tabs.sendMessage(tab.id, {
      action: "fillField",
      dataType: info.menuItemId
    }).catch(error => {
      console.log('Test Data Generator: Message sending failed', error);
    });
  }
});
