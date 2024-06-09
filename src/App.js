import React, {useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const channels = ["general", "business", "entertainment", "health", "science", "technology", "sports"];
  const [country, setCountry] = useState("us");
  
  const pageSize = 12;
  const [progress, setProgress] = useState(0);

  const capitalizeFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  return (
    <BrowserRouter>
        <div>
          <Navbar setCountry = {setCountry} country = {country} channels = {channels} capitalizeFirst={capitalizeFirst}/>
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
            onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            {channels.map((channel)=>{
              let newsInfo = {
                category : channel,
                pageSize : pageSize,
                country : country,
                setProgress : setProgress
              }
              return (
                <Route
                  key={channel}
                  exact path={channel === "general" ? "/" : `/${channel}`}
                  element = {<News key={`${channel}Element`} newsInfo={newsInfo} capitalizeFirst={capitalizeFirst}/>}
                >
                </Route>
              );
            })}
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
