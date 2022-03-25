/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import Login from "./loginForm";
import Logo from "./logo-act-no-text.svg";
import "./loggedIn.css";

const IsLogged = ({ LoginInfo, Logout }) => {
  return (
    <header>
      <img class="logo" src={Logo} alt="logo" />
      <nav>
        <ul class="nav__links">
          <li>
            <a class="fields" href="#">
              Matrice
            </a>
          </li>
          <li>
            <a class="fields" href="#">
              Évaluation
            </a>
          </li>
          <li>
            <a class="fields" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="fields" href="#">
              Documentation
            </a>
          </li>
        </ul>
      </nav>
      <a class="cta">
        <button>Contact</button>
      </a>
    </header>
  );
};

export default IsLogged;
