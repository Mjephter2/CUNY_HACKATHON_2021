import symptoms from "./data/symptoms.json";
import React, { useState, useEffect } from "react";
import record from "./data/record.json";

const save_data = (rec) => {
  //localStorage.setItem("record", JSON.stringify(rec));
  console.log(localStorage.getItem("record"));
};
const redSymptom = (symptom) => {
  for (let i = 0; i < symptoms.red.length; i++) {
    if (symptoms.red[i] === symptom) return true;
  }
  return false;
};

function App() {
  console.log(redSymptom("Cough"));
  const [rec, setRec] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(new Date().toISOString());
  // console.log(new Date("2021-01-24T00:35:00.436Z").toISOString());
  //console.log(symptoms);

  useEffect(() => {
    localStorage.setItem("record", JSON.stringify(rec));
    //console.log(localStorage.getItem("record"));
  }, [rec]);

  // useEffect(() => {
  //   setRec(record);
  //   setLoading(false);
  // }, []);

  const handle_save = (e) => {
    e.preventDefault();
    //console.log(e);
    setLoading(true);
    //console.log(document.getElementById("symptoms").value);
    const newRecord = {
      date: new Date().toISOString(),
      conditions: document.getElementById("symptoms").value,
    };
    setRec([...rec, newRecord]);
    setLoading(false);
    save_data(rec);
  };
  const checkSymptoms = () => {
    for (let i = 0; i < rec.length; i++) {
      if (redSymptom(rec[i].conditions)) return true;
    }
    return false;
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <section className="header">
        <h1>Covid-19 Symptoms Record</h1>
      </section>
      <section>
        <ul className="list">
          {rec.map((record_item, index) => {
            const { date, conditions } = record_item;
            //console.log(date, conditions);
            return (
              <li
                key={index}
                className={`${
                  redSymptom(conditions)
                    ? "symptom red-symptom"
                    : "symptom yellow-symptom"
                }`}
              >
                <h4>
                  {new Date(date).toDateString()}{" "}
                  {new Date(date).toTimeString().substring(0, 8)} -----
                  {conditions.toString()}
                </h4>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="add-item">
        <form action="submit" className="form">
          <label htmlFor="symptoms">
            <h3>Enter new Symptom Record</h3>
          </label>
          <select required id="symptoms" className="symptoms" name="symptoms">
            {symptoms.yellow.map((symptom, index) => {
              return (
                <option value={symptom} key={index}>
                  {symptom}
                </option>
              );
            })}
            {symptoms.red.map((symptom, index) => {
              return (
                <option value={symptom} key={index}>
                  {symptom}
                </option>
              );
            })}
          </select>
          <button type="submit" className="save-btn" onClick={handle_save}>
            Save
          </button>
        </form>
      </section>
      <section
        className={`${
          checkSymptoms()
            ? "emergency emergency-red"
            : "emergency emergency-green"
        }`}
      >
        <h1 className="call">
          {checkSymptoms() ? "Call 911" : "Mild Symptoms"}
        </h1>
      </section>
    </>
  );
}

export default App;
