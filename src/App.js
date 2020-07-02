import React, { useState } from "react";
import { render } from "react-dom" //react-dom has a specfic export and I want to import just that 
import { Router, Link } from "@reach/router"; //importing reach router
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from './ThemeContext';

const App = () => {
    //react.strictmode wont let you use any unstable api's and it'll give you a warning 
    const themeHook = useState("darkblue");
    return (
        <React.StrictMode>
            <ThemeContext.Provider value={themeHook}>
            <div>
                <header>
                    <Link to="/"> Adopt Me! </Link>
                </header> 
            <Router>
                    <SearchParams path="/" />
                    
                    <Details  path="/details/:id" />
            </Router>  

                </div>
            </ThemeContext.Provider>

        </React.StrictMode>
        );
};

render(<App />, document.getElementById("root")); //root tag is called from above