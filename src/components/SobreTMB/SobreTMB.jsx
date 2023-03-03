import React from "react";

import { ARTIGO_TMB } from "@/data/texto";

import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

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
      <footer className="section-tmb__footer">
        <ul className="contact__list">
          <li className="contact__list__item">
            <a
              href="https://www.linkedin.com/in/willian-pessoa/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              &nbsp;Linkedin
            </a>
          </li>
          <li className="contact__list__item">
            <a
              href="https://github.com/willian-pessoa"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithubSquare />
              &nbsp;GitHub
            </a>
          </li>
          <li className="contact__list__item">
            <a
              href="https://leetcode.com/willian-pessoa/"
              target="_blank"
              rel="noreferrer"
            >
              <SiLeetcode />
              &nbsp;LeetCode
            </a>
          </li>
          <li>@Willian Pessoa</li>
        </ul>
      </footer>
    </section>
  );
};

export default SobreTMB;
