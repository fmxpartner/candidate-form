// src/CandidateForm.js (projeto candidate-form)
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './App.css';

// Configuração do Firebase (substitua pelos valores do seu projeto)
const firebaseConfig = {
  apiKey: "AIzaSyCcDdI1fLtQBZpQWwCRCJQZNmgwuu31vWw",
  authDomain: "system-management-1ee11.firebaseapp.com",
  projectId: "system-management-1ee11",
  storageBucket: "system-management-1ee11.firebasestorage.app",
  messagingSenderId: "768745399615",
  appId: "1:768745399615:web:de9e37843a593867d49f8a",
  measurementId: "G-DF9CM8C6BM"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

function CandidateForm() {
  const [formData, setFormData] = useState({
    photo: null,
    fullName: '',
    email: '',
    birthDate: '',
    contact: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    familyStructure: '',
    hobbies: '',
    personalGoals: '',
    education: '',
    englishFluency: '',
    spanishFluency: '',
    coursesLastYear: '',
    developmentAreas: '',
    professionalGoals: '',
    strengths: '',
    lastSalary: '',
    customerSupportExperience: '',
    kycExperience: '',
    cv: null,
    professionalAchievement: '',
    professionalGrowth: '',
    motivations: '',
    discProfile: '',
    doubts: '',
    weekendAvailability: '',
    startAvailability: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (name === 'photo') {
        setFormData((prev) => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
      } else if (name === 'cv') {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    }
  };

  const handleResetForm = () => {
    setFormData({
      photo: null,
      fullName: '',
      email: '',
      birthDate: '',
      contact: '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      familyStructure: '',
      hobbies: '',
      personalGoals: '',
      education: '',
      englishFluency: '',
      spanishFluency: '',
      coursesLastYear: '',
      developmentAreas: '',
      professionalGoals: '',
      strengths: '',
      lastSalary: '',
      customerSupportExperience: '',
      kycExperience: '',
      cv: null,
      professionalAchievement: '',
      professionalGrowth: '',
      motivations: '',
      discProfile: '',
      doubts: '',
      weekendAvailability: '',
      startAvailability: ''
    });
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cv) {
      alert('Please attach your CV in PDF format.');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Starting CV upload...');
      let cvUrl = null;
      if (formData.cv) {
        const cvFile = formData.cv;
        const cvRef = ref(storage, `candidates/cvs/${cvFile.name}_${Date.now()}`);
        console.log('Uploading CV to:', cvRef.fullPath);
        await uploadBytes(cvRef, cvFile);
        console.log('CV uploaded successfully, getting download URL...');
        cvUrl = await getDownloadURL(cvRef);
        console.log('Download URL obtained:', cvUrl);
      }

      const candidateData = {
        ...formData,
        status: 'Candidates',
        registrationDate: new Date().toISOString(),
        cv: cvUrl,
        photo: formData.photo
      };
      console.log('Submitting candidate data to Firestore:', candidateData);
      await addDoc(collection(db, 'candidates'), candidateData);
      console.log('Candidate data submitted successfully');
      setSuccessMessage('Form submitted successfully! We will contact you soon.');
      handleResetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
      console.log('Submission process finished');
    }
  };

  return (
    <div className="candidate-form-container">
      <div className="candidate-form-box">
        <h1 className="candidate-form-title">Formulário para Candidatura</h1>
        <p className="candidate-form-subtitle">
          Bem-vindo(a) à primeira etapa do nosso processo seletivo!<br />
          Pedimos que responda cada pergunta com sinceridade e transparência, mostrando quem você realmente é. Acreditamos que a honestidade é o caminho mais curto para a sua realização profissional.
        </p>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Foto Profissional (Opcional)</label>
            <div className="photo-upload">
              {formData.photo ? (
                <img src={formData.photo} alt="Foto do candidato" className="photo-preview" />
              ) : (
                <div className="photo-placeholder">
                  <i className="fas fa-camera"></i>
                  <span>Coloque uma foto profissional aqui - Opcional</span>
                </div>
              )}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="photo-input"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Nome Completo</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contato (WhatsApp)</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>CEP</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Nome da Rua</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Número da Residência</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Complemento</label>
              <input
                type="text"
                name="complement"
                value={formData.complement}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Bairro</label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Cidade</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Qual a sua estrutura familiar? (Ex: Pai + idade | Mãe + idade | Filhos + idade | Cônjuge + idade)</label>
              <input
                type="text"
                name="familyStructure"
                value={formData.familyStructure}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>O que você gosta de fazer para se divertir/hobbies?</label>
              <textarea
                name="hobbies"
                value={formData.hobbies}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Quais os seus objetivos pessoais?</label>
              <textarea
                name="personalGoals"
                value={formData.personalGoals}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Quais das informações abaixo corresponde à sua formação? (Selecione a mais atualizada)</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Ensino médio">Ensino médio</option>
                <option value="Ensino superior">Ensino superior</option>
                <option value="Pós Graduação">Pós Graduação</option>
                <option value="MBA">MBA</option>
                <option value="Não tenho formação">Não tenho formação</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Seu nível de fluência em inglês</label>
              <select
                name="englishFluency"
                value={formData.englishFluency}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Iniciante">Iniciante (nunca estudei ou estudei porém não consigo me comunicar numa reunião sem auxílio de colegas)</option>
                <option value="Básico">Básico (já estudei, consigo entender e me comunicar numa reunião com ajuda de colegas para traduzir algumas palavras)</option>
                <option value="Intermediário">Intermediário (já estudei, consigo entender e participar de uma reunião no idioma, me comunicando bem)</option>
                <option value="Avançado">Avançado (tenho fluência e consigo liderar qualquer reunião nesse idioma)</option>
                <option value="Fluente">Fluente (tenho fluência 100%, falo como um nativo)</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Seu nível de fluência em espanhol</label>
              <select
                name="spanishFluency"
                value={formData.spanishFluency}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Iniciante">Iniciante (nunca estudei ou estudei porém não consigo me comunicar numa reunião sem auxílio de colegas)</option>
                <option value="Básico">Básico (já estudei, consigo entender e me comunicar numa reunião com ajuda de colegas para traduzir algumas palavras)</option>
                <option value="Intermediário">Intermediário (já estudei, consigo entender e participar de uma reunião no idioma, me comunicando bem)</option>
                <option value="Avançado">Avançado (tenho fluência e consigo liderar qualquer reunião nesse idioma)</option>
                <option value="Fluente">Fluente (tenho fluência 100%, falo como um nativo)</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Quais os cursos utilizados para o seu desenvolvimento pessoal/profissional no ano passado?</label>
              <textarea
                name="coursesLastYear"
                value={formData.coursesLastYear}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Que área(s) você está buscando se desenvolver neste ano?</label>
              <textarea
                name="developmentAreas"
                value={formData.developmentAreas}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Quais os seus objetivos profissionais?</label>
              <textarea
                name="professionalGoals"
                value={formData.professionalGoals}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Quais são seus pontos fortes?</label>
              <textarea
                name="strengths"
                value={formData.strengths}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Qual foi sua última remuneração bruta (salário mensal sem benefícios)?</label>
              <input
                type="text"
                name="lastSalary"
                value={formData.lastSalary}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Tem experiência com Suporte ao Cliente?</label>
              <select
                name="customerSupportExperience"
                value={formData.customerSupportExperience}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Tem experiência com KYC?</label>
              <select
                name="kycExperience"
                value={formData.kycExperience}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Anexe aqui seu CV atual no formato PDF apenas</label>
              <p style={{ color: '#e74c3c', fontSize: '14px' }}>
                Não daremos andamento no processo caso não tenha carregado o seu currículo.
              </p>
              <input
                type="file"
                name="cv"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>De forma resumida, qual foi sua principal conquista profissional?</label>
              <textarea
                name="professionalAchievement"
                value={formData.professionalAchievement}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>O que você acredita que precisa para evoluir profissionalmente?</label>
              <textarea
                name="professionalGrowth"
                value={formData.professionalGrowth}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>5 coisas que mais te motivam em ordem de prioridade?</label>
              <textarea
                name="motivations"
                value={formData.motivations}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label className="disc-label">
                Seu perfil comportamental (DISC)
                <a
                  href="https://www.pactorh.com.br/teste-disc/disc/faca-agora-teste-disc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="disc-link"
                >
                  <i className="fas fa-link"></i> Fazer o Teste
                </a>
              </label>
              <p className="disc-comment">
                Clique no botão ao lado para fazer o seu teste.
              </p>
              <select
                name="discProfile"
                value={formData.discProfile}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="D - Dominante">D - Dominante</option>
                <option value="I - Influente">I - Influente</option>
                <option value="S - Estabilidade">S - Estabilidade</option>
                <option value="C - Conformidade">C - Conformidade</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Tem dúvida sobre a vaga?</label>
              <select
                name="doubts"
                value={formData.doubts}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Tem disponibilidade aos finais de semana e feriados?</label>
              <select
                name="weekendAvailability"
                value={formData.weekendAvailability}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Tem disponibilidade para início imediato ou precisa de um tempo?</label>
              <input
                type="text"
                name="startAvailability"
                value={formData.startAvailability}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Formulário'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CandidateForm;