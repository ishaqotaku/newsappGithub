import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const countries = [
    {name:"USA", code:"us"},
    {name:"India", code:"in"},
    {name:"Australia", code:"au"},
    {name:"Russia", code:"ru"},
    {name:"France", code:"fr"},
    {name:"UK", code:"gb"}
  ];
  const countryHandler = (data) => props.setCountry(data);
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                  <img src={require("./../assets/images/newsMonkeyLogo.png")} alt="Logo" width="30" height="30" className="d-inline-block align-text-top"/>
                  NewsMonkey
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {props.channels.map((channel)=> <li key={`${channel}list`} className="nav-item"><Link key={`${channel}links`} to={channel === "general" ? "/" : `/${channel}`} className="nav-link active">{props.capitalizeFirst(channel)}</Link></li>)}
                </ul>
                <div className="dropdown text-end">
                    <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      {countries.filter(count => count.code === props.country).pop().name}
                    </button>
                    <ul className="nav-item dropdown-menu dropdown-menu-end">
                      {countries.map(country => <li key={`${country.name}listed`}><label key={`${country.code}labelss`} className="dropdown-item" onClick={()=>countryHandler(country.code)}>{country.name}</label></li>)}
                    </ul>
                </div>
                </div>
            </div>
      </nav>
  );
}

export default Navbar;
