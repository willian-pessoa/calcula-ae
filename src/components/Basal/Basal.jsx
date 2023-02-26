"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { render } from "react-dom";

import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

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
  atividade: 0, // de acordo com NIVEL_ATIVIDADE
};

const Basal = () => {
  const [active, setActive] = useState({
    inputL1: false,
    inputL2: !false,
    inputL3: !false,
    inputL4: !false,
    inputL5: !false,
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

  console.log(infos);

  return (
    <section className="basal">
      <h1>Calcule a sua Taxa de Metabolismo Basal</h1>
      <div className="basal__calc">
        <InputBasalLeft
          onClick={() => handleShowInput("inputL2")}
          active={active.inputL1}
          label="Gênero"
        >
          <Genero setInfos={setInfos} genero={infos.genero} />
        </InputBasalLeft>
        <InputBasalLeft
          onClick={() => handleShowInput("inputL3")}
          active={active.inputL2}
          label="Peso em Kg"
        >
          <Peso setInfos={setInfos} peso={infos.peso} />
        </InputBasalLeft>
        <InputBasalRight
          onClick={() => handleShowInput("inputL4")}
          active={active.inputL3}
          label="Altura em cm"
        >
          <Altura setInfos={setInfos} altura={infos.altura} />
        </InputBasalRight>
        <InputBasalRight
          onClick={() => handleShowInput("inputL5")}
          active={active.inputL4}
          label="Idade"
        >
          <Idade setInfos={setInfos} idade={infos.idade} />
        </InputBasalRight>
        <InputActivity
          onClick={() => handleShowInput("calcular")}
          active={active.inputL5}
          label="Nível de Atividade Fisica"
        >
          <IntensidadeFisica setInfos={setInfos} />
        </InputActivity>
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

// COMPONENTES MENORES, DIVS DE INPUT
const InputBasalLeft = ({ label, active, children, ...props }) => {
  return (
    <div
      {...props}
      className={`input input-left ${active ? "active" : "inactive"}-left`}
    >
      {children}
      <span className="input__label-left">{label}</span>
    </div>
  );
};

const InputBasalRight = ({ label, active, children, ...props }) => {
  return (
    <div
      {...props}
      className={`input input-right ${active ? "active" : "inactive"}-right`}
    >
      {children}
      <span className="input__label-right">{label}</span>
    </div>
  );
};

const InputActivity = ({ label, active, children, ...props }) => {
  return (
    <div
      {...props}
      className={`input input-activity activity-${
        active ? "active" : "inactive"
      }`}
    >
      {children}
      <span className="input__label-activity">{label}</span>
    </div>
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

//COMPONENTES DE INPUT
const Genero = ({ setInfos, genero }) => {
  const handleInputGender = (gender) => {
    setInfos((prev) => ({
      ...prev,
      genero: gender,
    }));
  };
  return (
    <div className="input__gender">
      <div
        className={`input__gender-option ${
          genero === "M" ? "gender-active" : "gender-inactive"
        }`}
        onClick={() => handleInputGender("M")}
      >
        <BsGenderMale className="icon" />
        Masculino
      </div>
      <div
        className={`input__gender-option ${
          genero === "F" ? "gender-active" : "gender-inactive"
        }`}
        onClick={() => handleInputGender("F")}
      >
        <BsGenderFemale className="icon" />
        Feminino
      </div>
    </div>
  );
};

const Peso = ({ setInfos, peso }) => {
  const handleInputPeso = (e) => {
    e.preventDefault();
    let tempPeso = Number(e.target.value.replace(".", ""));
    if (tempPeso < 1 || tempPeso > 500) return

    setInfos((prev) => ({
      ...prev,
      peso: tempPeso,
    }));
  };

  return (
    <div className="input__peso">
      <input
        type="number"
        min={0}
        max={500}
        value={peso}
        onChange={(e) => handleInputPeso(e)}
      />
    </div>
  );
};

const Altura = ({ setInfos, altura }) => {
  const handleInputAltura = (e) => {
    e.preventDefault();
    let tempAltura = Number(e.target.value.replace(".", ""));
    if (tempAltura < 1 || tempAltura > 300) return 

    setInfos((prev) => ({
      ...prev,
      altura: tempAltura,
    }));
  };

  return (
    <div className="input__altura">
      <input
        type="number"
        min={0}
        max={300}
        value={altura}
        onChange={(e) => handleInputAltura(e)}
      />
    </div>
  );
};

const Idade = ({ setInfos }) => {
  return <div className="input__idade"></div>;
};

const IntensidadeFisica = ({ setInfos }) => {
  return <div className="input__intesidade"></div>;
};

export default Basal;
