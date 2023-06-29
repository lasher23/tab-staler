import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {Settings} from "./settings";

const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Settings/>
    </React.StrictMode>
);
