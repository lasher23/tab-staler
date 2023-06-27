import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";

const Options = () => {
    const [regexPatterns, setRegexPatterns] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<string>("");
    useEffect(() => {
        chrome.storage.sync.get(
            {
                regexPatterns: [],
            },
            (items) => {
                setRegexPatterns(items.regexPatterns);
            }
        );
    }, []);

    const saveOptions = () => {
        // Saves options to chrome.storage.sync.
        chrome.storage.sync.set(
            {
                regexPatterns: regexPatterns,
            },
            () => {
                // Update status to let user know options were saved.
                setStatus("Options saved.");
                const id = setTimeout(() => {
                    setStatus("");
                }, 1000);
                return () => clearTimeout(id);
            }
        );
    };

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleAddElement = () => {
        if (inputValue.trim() !== '') {
            setRegexPatterns([...regexPatterns, inputValue]);
            setInputValue('');
        }
    };

    const handleChangeElement = (index: number, newValue: string) => {
        const updatedList = [...regexPatterns];
        updatedList[index] = newValue;
        setRegexPatterns(updatedList);
    };

    const handleDeleteElement = (index: number) => {
        const updatedList = [...regexPatterns];
        updatedList.splice(index, 1);
        setRegexPatterns(updatedList);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddElement}>Add</button>

                <ul>
                    {regexPatterns.map((element, index) => (
                        <li key={index}>
                            <input
                                type="text"
                                value={element}
                                onChange={(e) => handleChangeElement(index, e.target.value)}
                            />
                            <button onClick={() => handleDeleteElement(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>{status}</div>
            <button onClick={saveOptions}>Save</button>
        </>
    );
};

const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Options/>
    </React.StrictMode>
);
