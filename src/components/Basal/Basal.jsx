import React from "react";

import "./Basal.scss";

const Basal = () => {
  return (
    <section className="basal">
      <h1>Calculadora de Taxa de Metabolismo Basal</h1>
      <div className="basal__calc">
        <InputBasalLeft />
        <InputBasalLeft />
        <InputBasalRight />
        <InputBasalRight />
        <InputActivity />
        <Calcular>Calcular</Calcular>
      </div>
      <div className="basal__footer">b</div>
    </section>
  );
};

const InputBasalLeft = ({active}) => {
  return <input className="input-left active-left"></input>;
};

const InputBasalRight = ({active}) => {
  return <input className="input-right active-right"></input>;
};

const InputActivity = ({active}) => {
  return <input className="input-activity" ></input>
}

const Calcular = ({active, children}) => {
  return <button className="btn-calcular btn-active">{children}</button>
}

export default Basal;
