"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";

import "./Basal.scss";

//Default user Infos
const NIVEL_ATIVIDADE = {
  sedentarismo: 1.2,
  pouco: 1.375,
  moderado: 1.55,
  muito: 1.725,
  extremo: 1.9,
};

const DEFAULT = {
  genero: "", // M -> Masculino F -> Feminino
  peso: 0, // kg
  altura: 0, // cm
  idade: 0, // anos
  atividade: 0 // de acordo com NIVEL_ATIVIDADE
};

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
  const [infos, setInfos] = useState(DEFAULT);

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
    <div
      {...props}
      className={`input input-left ${active ? "active" : "inactive"}-left`}
    ></div>
  );
};

const InputBasalRight = ({ active, ...props }) => {
  return (
    <div
      {...props}
      className={`input input-right ${active ? "active" : "inactive"}-right`}
    ></div>
  );
};

const InputActivity = ({ active, ...props }) => {
  return (
    <div
      {...props}
      className={`input input-activity activity-${active ? "active" : "inactive"}`}
    ></div>
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
