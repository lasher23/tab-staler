const inactiveTabTimes: Record<string, number> = {};

chrome.runtime.onMessage.addListener((message: any, sender) => {
    console.log(message)
    if (message.type === "tab-deactivated" && sender.tab?.id) {
        inactiveTabTimes[sender.tab.id] = new Date().getTime()
        console.log(`added tab with id: ${sender.tab.id}`)
    }
    if (message.type === "tab-activated" && sender.tab?.id) {
        delete inactiveTabTimes[sender.tab.id]
        console.log(`removed tab with id: ${sender.tab.id}`)
    }
})


chrome.tabs.onRemoved.addListener((tabId) => {
    delete inactiveTabTimes[tabId];
});

function polling() {
    chrome.storage.sync.get(
        {
            regexPatterns: [],
        },
        async (items) => {
            chrome.tabs.query({}, tabs => {
                tabs.filter(tab => tab.id && tab.url)
                    .filter(tab => items.regexPatterns.some((regex: string) => new RegExp(regex).test(tab.url as string)))
                    .filter(tab => {
                        const currentTime = new Date().getTime();
                        const startTime = inactiveTabTimes[tab.id as number];
                        const timeElapsed = currentTime - startTime;
                        return timeElapsed > 10_000
                    })
                    .forEach(tab => chrome.tabs.remove(tab.id as number))
            })
            setTimeout(polling, 30_000);
        })
}

polling();
