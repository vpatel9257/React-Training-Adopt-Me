import { createContext } from "react";

const ThemeContext = createContext(["green", () => { }]); //hook attached with state and an updater

export default ThemeContext;