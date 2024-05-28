async function updateRules() {
    const allowAllRequestsRule = {
        id: 100,  // Unique ID for the allowAllRequests rule
        priority: 3,
        action: { type: "allowAllRequests" },
        condition: {
            initiatorDomains: ["iana.org"],
            isUrlFilterCaseSensitive: false,
            resourceTypes: ["main_frame", "sub_frame"]
        }
    };

    const allowAllRequestsRuleUrlFilter = {
        id: 101,
        priority: 3,
        action: { type: "allowAllRequests" },
        condition: {
            urlFilter: "iana.org",
            isUrlFilterCaseSensitive: false,
            resourceTypes: ["main_frame", "sub_frame"]
        }
    };

    const allowRule = {
        id: 102,
        priority: 2,
        action: { type: "allow" },
        condition: {
            initiatorDomains: ["iana.org"],
            isUrlFilterCaseSensitive: false,
            resourceTypes: ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "xmlhttprequest", "media", "other"]
        }
    };

    const blockRule = {
        id: 103,
        priority: 2,
        action: { type: "block" },
        condition: {
            urlFilter: "iana_website.css",
            isUrlFilterCaseSensitive: false,
            resourceTypes: ["stylesheet"]
        }
    };

    // Remove existing rules
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds,
        addRules: [
            allowAllRequestsRule,
            // allowAllRequestsRuleUrlFilter,
            // allowRule,
            blockRule
        ]
    });

    console.log("Rules updated successfully");
}

chrome.runtime.onInstalled.addListener(() => {
    updateRules()
        .then(() => console.log("Rules applied successfully"))
        .catch(error => console.error("Error updating rules:", error));
});
