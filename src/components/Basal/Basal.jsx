"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";

import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";

import "./Basal.scss";

//Default user Infos
const NIVEL_ATIVIDADE = {
  sedentarismo: 1.2,
  pouco: 1.375,
  moderado: 1.55,
  muito: 1.725,
  intenso: 1.9,
};

const DEFAULT = {
  genero: "", // M -> Masculino F -> Feminino
  peso: 0, // kg
  altura: 0, // cm
  idade: 0, // anos
  intensidade: 0, // de acordo com NIVEL_ATIVIDADE
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
  const [TMB, setTMB] = useState(0);

  const computeTMB = () => {
    const { genero, peso, altura, idade, intensidade } = infos;
    let tempTMB = 0;
    if (genero === "M") {
      tempTMB = 66.5 + 13.75 * peso + 5.003 * altura - 6.75 * idade;
    } else {
      tempTMB = 655.1 + 9.563 * peso + 1.85 * altura - 4.676 * idade;
    }
    tempTMB = Math.floor(tempTMB * intensidade);
    setTMB(tempTMB);
  };

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

  const handleResetState = () => {
    setActive({
      inputL1: !false,
      inputL2: false,
      inputL3: false,
      inputL4: false,
      inputL5: false,
      calcular: false,
    });
    setInfos(DEFAULT)
  }

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
            computeTMB();
            resetShowInput();
            handleShowInput("result");
          }}
          active={active.calcular}
        >
          Calcular
        </Calcular>
        <Result active={active.result} TMB={TMB} reset={handleResetState} />
      </div>
      <div className="basal__footer">
        <a href="#section-tmb">
          <button className="btn-more-info">
            <IoIosArrowDropdown className="btn-icon-drop" /> Mais Informações
          </button>
        </a>
      </div>
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

const Result = ({ active, TMB, reset }) => {
  return (
    <div className={`result result-${active ? "active" : "inactive"}`}>
      <h3>A sua Taxa Metabolica Basal é: {TMB} calorias</h3>
      <h2>
        Para perda de peso recomenda-se a ingestão de: {TMB - 500} a {TMB - 300}{" "}
        calorias
      </h2>
      <h2>
        Para ganho de peso recomenda-se a ingestão de: {TMB + 300} a {TMB + 500}{" "}
        calorias
      </h2>
      <button onClick={reset} className="btn-reset">
        Calcular Denovo
      </button>
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
    let tempPeso = parseInt(e.target.value.replace(".", ""));
    if (tempPeso < 1 || tempPeso > 1000) return;

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
        placeholder="kg"
        value={peso === 0 ? "" : peso}
        onChange={(e) => handleInputPeso(e)}
      />
    </div>
  );
};

const Altura = ({ setInfos, altura }) => {
  const handleInputAltura = (e) => {
    e.preventDefault();
    let tempAltura = Number(e.target.value.replace(".", ""));
    if (tempAltura < 0 || tempAltura > 1000) return;

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
        placeholder="cm"
        value={altura === 0 ? "" : altura}
        onChange={(e) => handleInputAltura(e)}
      />
    </div>
  );
};

const Idade = ({ setInfos, idade }) => {
  const handleInputIdade = (e) => {
    e.preventDefault();
    let tempIdade = Number(e.target.value.replace(".", ""));
    if (tempIdade < 0 || tempIdade > 200) return;

    setInfos((prev) => ({
      ...prev,
      idade: tempIdade,
    }));
  };
  return (
    <div className="input__idade">
      <input
        type="number"
        min={0}
        max={300}
        placeholder={0}
        value={idade === 0 ? "" : idade}
        onChange={(e) => handleInputIdade(e)}
      />
    </div>
  );
};

const IntensidadeFisica = ({ setInfos }) => {
  const handleInputIntensidade = (e) => {
    e.preventDefault();
    setInfos((prev) => ({
      ...prev,
      intensidade: NIVEL_ATIVIDADE[e.target.value],
    }));
  };

  return (
    <div className="input__intensidade">
      <select
        onChange={(e) => handleInputIntensidade(e)}
        name="intensidade-fisica"
        id="intensidade-fisica"
      >
        <option value="sedentarismo">Pouco ou nenhum exercício</option>
        <option value="pouco">
          Exercicio ou algum esporte leve de 1 a 3 dias/semana{" "}
        </option>
        <option value="moderado">
          Exercício ou esporte moderado de 3 a 5 dias/semana
        </option>
        <option value="muito">
          Exercício ou esporte pesado de 6 a 7 dias/semana
        </option>
        <option value="intenso">
          Exercício ou esporte muito pesado e trabalho físico intenso todos os
          dias
        </option>
      </select>
    </div>
  );
};

export default Basal;
