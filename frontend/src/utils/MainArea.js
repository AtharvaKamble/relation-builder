import { React, useState, useEffect } from 'react';
import CheckTable from './CheckTable.js';
import AddTable from './AddTable.js';
// import Button from '@material-ui/core/Button';
import '../App.css';
import '../Animation.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Button, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Text } = Typography;

function MainArea(props) {
  const [arr, setArr] = useState([]);
  const [addArr, setAddArr] = useState([]);
  const [beforeLength, setBeforeLength] = useState(0);
  const [afterLength, setAfterLength] = useState(0);
  const [beforeLengthALL, setBeforeLengthALL] = useState(0);
  const [afterLengthALL, setAfterLengthALL] = useState(0);

  // Relation area post request
  // PROXY http://localhost:8080
  function addPeoplePOSTRequest() {
    if (!personRA || !relativeRA) {
      return;
    }

    if (arr.connectedPeopleList) {
      setBeforeLength(arr.connectedPeopleList.length);
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: personRA, relative: relativeRA }), // NOT DEBUG
      // body: JSON.stringify({ name: 'Jane', relative: 'Sameer' })
    };
    fetch('/add/relation', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log('DAJSDLKDHAJKDH ', data.connectedPeopleList)
        if (data.connectedPeopleList) {
          if (data.connectedPeopleList.length > beforeLength) {
            // setArr([])
            setArr(data);
          }
        }
      });
    // HAVE TO THINK ABOUT THIS FEATURE
    setPersonRA('');
    setRelativeRA('');
  }

  // Main area post request
  // PROXY http://localhost:8080
  function addAllPeoplePOSTRequest() {
    if (!person || !relative || !relation) {
      return;
    }

    if (addArr.relationsDataNames) {
      setBeforeLengthALL(addArr.relationsDataNames.length);
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: person, relative, relation }), // NOT DEBUG
      // body: JSON.stringify({ name: 'Aayushi', relative: 'Jane', relation: 'friend' })
    };
    fetch('/add/relation', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // If data has updated in the database, then only update visible table
        if (data.relationsDataNames.length > beforeLengthALL) {
          setAddArr(data);
        }
      });
    setPerson('');
    setRelative('');
    setRelation('');
  }
  // console.log('ADDEEDE ', addArr)
  const [person, setPerson] = useState('');
  const [relation, setRelation] = useState('');
  const [relative, setRelative] = useState('');
  const [personRA, setPersonRA] = useState('');
  const [relativeRA, setRelativeRA] = useState('');
  const [len, setLen] = useState(0);
  // console.log("DEUBUGBUGBGUB ", arr.connectedPeopleList)
  const data = {
    person,
    relation,
    relative,
  };

  useEffect(() => {
    if (addArr.relationsDataNames) {
      setLen(addArr.relationsDataNames.length);
    }

    if (arr.connectedPeopleList) {
      setLen(arr.connectedPeopleList);
    }

    // fetch()
  }, [addArr]);

  const globalStyles = {
    button: {
      borderRadius: '5px',
      background: '#2e1d1d',
      border: '#2e1d1d',
      className: 'font-button',
    },
  };

  return (
    <div className="w-full">
      <div className="m-20 p-20 shadow-lg rounded-lg" hidden={props.isAdd}>
        <div className="people-display">
          {/*len ? <AddTable userData={addArr}/> : null*/}
          <AddTable userData={addArr} />
        </div>
        <div className="input-container">
          <input
            className="person-input"
            value={person}
            autoFocus
            onChange={(e) => setPerson(e.target.value.trim())}
            placeholder="Person"
          />
          <input
            className="relation-input"
            value={relation}
            onChange={(e) => setRelation(e.target.value.trim())}
            placeholder="Relation"
          />
          <input
            className="relative-input"
            value={relative}
            onChange={(e) => setRelative(e.target.value.trim())}
            placeholder="Relative"
          />
        </div>
        <Button
          style={globalStyles.button}
          className={globalStyles.button.className}
          onClick={addAllPeoplePOSTRequest}
          type="primary"
          size="large"
        >
          Add relation
        </Button>
      </div>
      <div
        className="m-10 p-40 shadow-lg rounded-lg fade-in"
        hidden={props.isCheck}
      >
        <p className="text-3xl text-gray-800 font-title">
          Check how two people are connected
        </p>
        <div className="input-container">
          <input
            className="person-input"
            value={personRA}
            autoFocus
            onChange={(e) => setPersonRA(e.target.value)}
            placeholder="Person"
          />
          <input
            className="relative-input"
            value={relativeRA}
            onChange={(e) => setRelativeRA(e.target.value)}
            placeholder="Relative"
          />
        </div>
        <Button
          style={globalStyles.button}
          className={globalStyles.button.className}
          onClick={addPeoplePOSTRequest}
          type="primary"
          size="large"
        >
          Find relation
        </Button>
        <CheckTable userData={arr} />
      </div>
    </div>
  );
}

export default MainArea;
