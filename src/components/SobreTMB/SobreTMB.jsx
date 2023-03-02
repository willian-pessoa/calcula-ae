import React from "react";

import { ARTIGO_TMB } from "@/data/texto";

import "./SobreTMB.scss";

const SobreTMB = () => {
  return (
    <section id="section-tmb" className="section-tmb">
      <article className="artigo-tmb">
        <h1>{ARTIGO_TMB.Título}</h1>
        <p>{ARTIGO_TMB.Introdução}</p>
        <p>{ARTIGO_TMB.TMB}</p>
        <h3>Como calcular?</h3>
        <p>{ARTIGO_TMB.calcular}</p>
        <h3>Conclusão</h3>
        <p>{ARTIGO_TMB.Conclusão}</p>
      </article>
    </section>
  );
};

export default SobreTMB;
