// src/JobDescription.js (projeto candidate-form)
import React from 'react';
import { Link } from 'react-router-dom';

function JobDescription() {
  return (
    <div className="job-description-container">
      <div className="job-description-box">
        <h1 className="job-description-title">Vaga: Analista Administrativo Júnior</h1>

        <section className="job-section">
          <h2>Sobre a Empresa</h2>
          <p>
            Somos uma empresa especializada em consultoria para instituições financeiras globais, oferecendo suporte em plataformas, transações financeiras (saques e depósitos) e esclarecimento de dúvidas operacionais. Também realizamos a análise e aprovação de processos KYC (Know Your Customer), avaliando documentos de identidade e comprovantes de endereço de clientes ao redor do mundo.
          </p>
        </section>

        <section className="job-section">
          <h2>Responsabilidades</h2>
          <ul>
            <li>Prestar atendimento ao cliente e suporte bilíngue para questões operacionais e técnicas. Tratamento de suporte apenas por e-mails, tickets e livechat.</li>
            <li>Assegurar a qualidade e a eficiência no atendimento, contribuindo para a satisfação dos clientes.</li>
            <li>Fazer a recepção e aprovação de documentos para abertura de contas.</li>
            <li>Realizar análise criteriosa de documentos e processos de identificação (KYC).</li>
            <li>Executar atividades administrativas relacionadas ao atendimento e análise documental.</li>
          </ul>
        </section>

        <section className="job-section">
          <h2>Requisitos</h2>
          <ul>
            <li>Ensino superior em Administração, Economia, Finanças ou áreas correlatas é um diferencial</li>
            <li>Experiência prévia com suporte ao cliente - Requisito.</li>
            <li>Conhecimento em processos de KYC - Requisito.</li>
            <li>Atenção aos detalhes, pensamento analítico e comprometimento com a qualidade.</li>
            <li>Boa comunicação e habilidades interpessoais.</li>
            <li>Proatividade e vontade de aprender.</li>
          </ul>
        </section>

        <section className="job-section">
          <h2>Condições da Vaga</h2>
          <p><strong>Regime de Contratação:</strong> CLT</p>
          <p><strong>Remuneração:</strong> R$ 4.000,00 mensais</p>
          <p><strong>Benefícios:</strong> Vale-transporte + Vale-refeição</p>
          <p><strong>Local de Trabalho:</strong> Presencial - São Paulo (Bairro Vila Olímpia)</p>
        </section>

        <section className="job-section">
          <h2>Jornada de Trabalho (Híbrido)</h2>
          <p><strong>Terça a Quinta-feira:</strong> 13h00 às 22h00 (Presencial)</p>
          <p><strong>Segunda e sexta-feira:</strong> 13h00 às 22:00 (Home Office)</p>
          <p><strong>Sábado:</strong> Home Office, com escala rotativa:</p>
          <ul>
            <li>Escala 1: 07h00 – 11h00</li>
            <li>Escala 2: 11h00 – 15h00</li>
            <li>Escala 3: 14h00 – 18h00</li>
            <li>Escala 4: 18h00 – 22h00</li>
          </ul>
          <p><strong>Domingo:</strong> Home Office</p>
          <p>1 domingo por mês das 13h00 às 22h00</p>
        </section>

        <div className="apply-button-container">
          <Link to="/form" className="apply-button">Candidate-se</Link>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;