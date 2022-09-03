import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from "react-router-dom"
import { auth, db } from '../../config/firebaseConfig'
import Table from 'react-bootstrap/Table'
import Tableau from '../../Tableau'
import { push, ref, child, update, set, get } from "firebase/database"


const Home = () => {
  let navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const signOut = () => {
    auth.signOut();
    navigate('/login');
  }

  const [activeCell, setActiveCell] = useState(undefined);
  const [success, setSuccess] = useState(["Success 1"]);
  const [determinants, setDeterminants] = useState(["Determinant 1"]);
  const [tableau, setTableau] = useState([[new Tableau("Content", 0)]]);
  const [json, setJson] = useState({});
  const [tabName, setTabName] = useState("");
  const [currentTableUid, setCurrentTableUid] = useState(null);

  const addSuccess = () => {
    const last = success[success.length - 1];
    let new_success = 1;
    if (last) {
      new_success = Number(last[last.length - 1]) + 1;
    }
    setSuccess([...success, "Success " + new_success]);
    for (let i = 0; i < tableau.length; i++) {
      const tab = new Tableau("Content", 0);
      tableau[i].push(tab);
    }
    createNewTable(); // Temporaire (auto-refresh)
  }

  const addDeterminant = () => {
    const last = determinants[determinants.length - 1];
    let new_determinant = 1;
    if (last) {
      new_determinant = Number(last[last.length - 1]) + 1;
    }
    setDeterminants([...determinants, "Determinant " + new_determinant]);
    const new_line = [];
    for (let i = 0; i < success.length; i++) {
      const tab = new Tableau("Content", 0);
      new_line.push(tab);
    }
    tableau.push(new_line);
  }

  const removeColumn = (nbr) => {
    success.splice(nbr, 1);
    for (let i = 0; i < tableau.length; i++) {
      tableau[i].splice(nbr, 1);
    }
    setTableau([...tableau]);
  }
  const removeLine = (nbr) => {
    determinants.splice(nbr, 1);
    tableau.splice(nbr, 1);
    setTableau([...tableau]);
  }

  const createNewTable = () => {
    let cells = [];
    for (let i = 0; i < tableau.length; i++) {
      for (let j = 0; j < tableau[i].length; j++) {
        const item = tableau[i][j];
        cells.push({
          "note": item.score,
          "evaluation": item.evaluations,
          "actions":  item.actions,
          "name": item.name
        });
      }
    }
    setJson({});
    const finalName = tabName ? tabName : "Tableau " + (new Date()).toLocaleString();
    const new_json = {
      "name": finalName,
      "success_keys": success,
      "owner": currentUser.uid,
      "determinants": determinants,
      "cells": cells,
      "permissions": {
        [currentUser.uid]: {
          "read": true,
          "write": true
        }
      }
    }
    setJson(new_json);
  }
  const changeCell = (e, x, y) => {
    setActiveCell(tableau[y][x]);
  }

  const inviteUser = (e) => {
    e.preventDefault();
    //Get text from e
    const other_uid = e.target[0].value;
    set(ref(db, 'tabs/' + currentTableUid + '/permissions/' + other_uid), {
      "read": true,
      "write": false
    });
  }

  const saveTab = (e) => {
    e.preventDefault();
    createNewTable();
    if (currentTableUid == null) {
      const newPushedKey = push(child(ref(db), 'tabs')).key;
      update(ref(db, '/tabs/' + newPushedKey), json);
      setCurrentTableUid(newPushedKey);
    } else {
      update(ref(db, '/tabs/' + currentTableUid), json);
    }
  }

  const getTab = (e) => {
    e.preventDefault();
    get(child(ref(db), 'tabs/' + e.target[0].value)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fake_tab = [];
        for (let y = 0; y < data.determinants.length; y++) {
          const fake_line = [];
          for (let x = 0; x < data.success_keys.length; x++) {
            const cell_data = data.cells.shift();
            let cell = new Tableau(cell_data.name, cell_data.note);
            cell.evaluations = cell_data.evaluation;
            cell.actions = cell_data.actions;
            fake_line.push(cell);
          }
          fake_tab.push(fake_line);
        }
        setDeterminants(data.determinants);
        setSuccess(data.success_keys);
        setTableau(fake_tab);
        setTabName(data.name);
        setCurrentTableUid(e.target[0].value);
        console.log("Loaded")
      }
    }).catch((error) => {
      console.log("Error");
    });
  }

  const valueChanged = (e, x, y) => {
    if (e.target.className === "score") {
      let nbr = Number(e.target.value);
      if (nbr > 5) nbr = 5;
      if (nbr < 0) nbr = 0;
      tableau[y][x].score = nbr;
    } else {
      tableau[y][x].name = e.target.value;
    }
    setTableau([...tableau]);
  }

  return (
    <div style={{border: '1px solid red'}}>
      <div style={{ float: 'left', border: '1px solid green'}}>
        <h1>Home</h1>
        { currentUser ? <p>Welcome, {currentUser.email}</p> : <p>Please log in</p> }
        { currentUser ? <p>{auth.currentUser.uid}</p> : <p></p> }
        <input type="text" onChange={(e) => setTabName(e.target.value)}/>
        <button onClick={addSuccess}>Add success</button>
        <button onClick={addDeterminant}>Add determinant</button>
        <button onClick={signOut}>Sign Out</button>
        <Table>
          <thead>
            <tr>
              <th />
              {success.map((item, i) => {
                return (
                  <th key={i}>
                    {item}
                    <button onClick={() => removeColumn(i)}>X</button>
                  </th>
              )})}
            </tr>
          </thead>
          <tbody>
            {determinants.map((item, y) => {
                return (
                  <tr key={y}>
                    <td key={y}>
                      <button onClick={() => removeLine(y)}>X</button>
                      {item}
                    </td>
                    {success.map((item, i) => {
                      return (
                        <td key={i + y * success.length + 1} style={{"paddingBottom": "0.5rem", "paddingTop": "0.5rem"}}>
                          <button onClick={(e) => changeCell(e, i, y)}>{tableau[y][i].name}</button>
                          <input className='score' type="number" value={tableau[y][i].score} onChange={(e) => valueChanged(e, i, y)} style={{"width": '35px', "marginRight": "1rem"}}/>
                        </td>
                    )})}
                  </tr>
            )})}
          </tbody>
        </Table>
        <br />
        <br />
        <br />
        <h3>Loading from UID: </h3>
        <form onSubmit={(e) => getTab(e)}>
          <input type="text"/>
          <input type="submit" value="Load"/>
        </form>

        <br />
        <form onSubmit={(e) => saveTab(e)}>
          <input type="submit" value="Save"/>
        </form>
        <br />
        <form onSubmit={(e) => inviteUser(e)}>
          <input type="text" placeholder="uid" /> {/* SHOULD BE type='email' */}
          <input type="submit" value="Invite"/>
        </form>
        </div>
        <div style={{float: 'left', border: '1px solid green', paddingLeft: '1rem', paddingRight: '1rem'}}>
          {activeCell !== undefined ? <div>
            <h1>Evaluations</h1>
            <form onSubmit={(e) => activeCell.addEvaluation(e)}>
              <input type="text" placeholder="New evaluation" />
              <input type="submit" value="Add evaluation"/>
            </form>
            {activeCell.evaluations.map((item, i) => {
              return (
                <li key={i}>{item}</li>
              )
            })}
          </div> : <></>}
        </div>
        <div style={{float: 'left', border: '1px solid green', paddingLeft: '1rem', paddingRight: '1rem'}}>
          {activeCell !== undefined ? <div>
            <h1>Actions</h1>
            <form onSubmit={(e) => activeCell.addAction(e)}>
              <input type="text" placeholder="New Action" />
              <input type="submit" value="Add action"/>
            </form>
            {activeCell.actions.map((item, i) => {
              return (
                <li key={i}>{item.action}</li>
              )
            })}
          </div> : <></>}
        </div>
    </div>
  )
}

export default Home