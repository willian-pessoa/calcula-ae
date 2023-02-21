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
      </div>
      <div className="basal__footer">b</div>
    </section>
  );
};

const InputBasalLeft = () => {
  return <input className="input-left active-left"></input>;
};

const InputBasalRight = () => {
  return <input className="input-right active-right"></input>;
};

export default Basal;
