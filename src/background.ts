import {Configuration} from "./types";
import register = chrome.gcm.register;

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
                    .filter(tab => (items.regexPatterns as Configuration["regexPatterns"])
                        .some((regex) => new RegExp(regex.regex).test(tab.url as string) && new Date().getTime() - inactiveTabTimes[tab.id as number] > regex.timeToKeepAlive))
                    .forEach(tab => chrome.tabs.remove(tab.id as number))
            })
            setTimeout(polling, 5_000);
        })
}

polling();
