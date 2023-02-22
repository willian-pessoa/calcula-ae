"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";

import "./Basal.scss";

const Basal = () => {
  const [active, setActive] = useState({
    inputL1: false,
    inputL2: false,
    inputL3: false,
    inputL4: false,
    inputL5: false,
    calcular: false,
    result: false,
  });

  const handleShowInput = useCallback((inputLabel) => {
    setActive((prev) => ({
      ...prev,
      [inputLabel]: true,
    }));
  }, []);

  const resetShowInput = () => {
    setActive({
      inputL1: false,
      inputL2: false,
      inputL3: false,
      inputL4: false,
      inputL5: false,
      calcular: false,
    });
  };

  useEffect(() => {
    handleShowInput("inputL1");
  }, [handleShowInput]);

  console.log(active);

  return (
    <section className="basal">
      <h1>Calcule a sua Taxa de Metabolismo Basal</h1>
      <div className="basal__calc">
        <InputBasalLeft
          onClick={() => handleShowInput("inputL2")}
          active={active.inputL1}
        />
        <InputBasalLeft
          onClick={() => handleShowInput("inputL3")}
          active={active.inputL2}
        />
        <InputBasalRight
          onClick={() => handleShowInput("inputL4")}
          active={active.inputL3}
        />
        <InputBasalRight
          onClick={() => handleShowInput("inputL5")}
          active={active.inputL4}
        />
        <InputActivity
          onClick={() => handleShowInput("calcular")}
          active={active.inputL5}
        />
        <Calcular
          onClick={() => {
            resetShowInput();
            handleShowInput("result");
          }}
          active={active.calcular}
        >
          Calcular
        </Calcular>
        <Result active={active.result} />
      </div>
      <div className="basal__footer">b</div>
    </section>
  );
};

const InputBasalLeft = ({ active, ...props }) => {
  return (
    <input
      {...props}
      className={`input-left ${active ? "active" : "inactive"}-left`}
    ></input>
  );
};

const InputBasalRight = ({ active, ...props }) => {
  return (
    <input
      {...props}
      className={`input-right ${active ? "active" : "inactive"}-right`}
    ></input>
  );
};

const InputActivity = ({ active, ...props }) => {
  return (
    <input
      {...props}
      className={`input-activity activity-${active ? "active" : "inactive"}`}
    ></input>
  );
};

const Calcular = ({ active, children, ...props }) => {
  return (
    <button
      {...props}
      className={`btn-calcular btn-${active ? "active" : "inactive"}`}
    >
      {children}
    </button>
  );
};

const Result = ({ active }) => {
  return (
    <div className={`result result-${active ? "active" : "inactive"}`}>
      <h3>A sua Taxa Metabolica Basal é:</h3>
    </div>
  );
};

export default Basal;
