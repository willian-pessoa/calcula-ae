import React from 'react'

import { ARTIGO_TMB } from '@/data/texto'

import "./SobreTMB.scss"

const SobreTMB = () => {
  return (
    <article id="artigo-tmb" className='artigo'>
      <h1>{ARTIGO_TMB.Título}</h1>
    </article>
  )
}

export default SobreTMB
