const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
    menuButton.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
    mainNav.classList.toggle('open', !isExpanded);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
      mainNav.classList.remove('open');
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mainNav.querySelectorAll('.nav-link').forEach((link) => {
            const active = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }
}

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const heroImages = [...document.querySelectorAll('.hero-image')];
if (heroImages.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let activeImage = heroImages.findIndex((image) => image.classList.contains('active'));
  if (activeImage < 0) activeImage = 0;
  window.setInterval(() => {
    heroImages[activeImage].classList.remove('active');
    activeImage = (activeImage + 1) % heroImages.length;
    heroImages[activeImage].classList.add('active');
  }, 6000);
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealItems = document.querySelectorAll('.service-card, .differential, .segment-card, .project-placeholder, .quote-form');
  if (revealItems.length) {
    document.documentElement.classList.add('has-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((item, index) => {
      item.classList.add('reveal-item');
      item.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`);
      revealObserver.observe(item);
    });
  }
}

const serviceData = {
  'portaria-remota': {
    title: 'Portaria Remota e Autônoma',
    description: 'Modernize a portaria do seu condomínio com tecnologias de controle de acesso e monitoramento remoto dimensionadas para a rotina do empreendimento.',
    details: 'A solução pode combinar controle de visitantes, comunicação, câmeras e gerenciamento de acessos, conforme a infraestrutura existente, as características do condomínio e o escopo contratado.',
    benefits: ['Modernização do controle de entrada e saída', 'Integração com equipamentos compatíveis', 'Planejamento alinhado à operação do condomínio', 'Suporte e manutenção conforme contratação'],
    applications: 'Condomínios residenciais e empreendimentos que desejam avaliar alternativas para organizar sua portaria e o controle de visitantes.'
  },
  'controle-de-acesso': {
    title: 'Controle de Acesso',
    description: 'Gerencie entradas e saídas de pessoas e veículos com sistemas de identificação escolhidos de acordo com o local e as necessidades do projeto.',
    details: 'A Predial Security avalia os pontos de entrada, os fluxos de circulação e a compatibilidade dos equipamentos para propor um sistema adequado ao ambiente.',
    benefits: ['Gestão organizada de acessos', 'Opções de identificação conforme o projeto', 'Possibilidade de integração com outros sistemas', 'Configuração e manutenção técnica'],
    applications: 'Condomínios, edifícios comerciais, empresas, indústrias, hotéis e espaços institucionais.'
  },
  'cameras-seguranca': {
    title: 'Câmeras e Segurança Eletrônica',
    description: 'Soluções de CFTV, monitoramento por câmeras e vigilância eletrônica planejadas para os espaços e objetivos do cliente.',
    details: 'O projeto considera cobertura dos ambientes, infraestrutura, posicionamento dos equipamentos, armazenamento e integração possível com outros sistemas.',
    benefits: ['Planejamento de pontos de monitoramento', 'Instalação e configuração dos equipamentos', 'Possibilidade de integração tecnológica', 'Suporte técnico conforme o serviço contratado'],
    applications: 'Áreas comuns de condomínios, instalações corporativas, operações logísticas e ambientes institucionais.'
  },
  'interfones': {
    title: 'Instalação e Manutenção de Interfones',
    description: 'Instalação, configuração, manutenção e modernização de sistemas de interfonia para comunicação mais organizada nos acessos.',
    details: 'A equipe avalia a infraestrutura e os equipamentos existentes para definir o serviço técnico ou a atualização mais apropriada ao empreendimento.',
    benefits: ['Diagnóstico da infraestrutura de interfonia', 'Instalação e configuração de equipamentos', 'Manutenção e modernização de sistemas', 'Atendimento conforme escopo contratado'],
    applications: 'Condomínios, edifícios comerciais e instalações que precisam implantar ou atualizar a comunicação interna.'
  },
  'automacao-portoes': {
    title: 'Automação de Portões',
    description: 'Automatização, instalação, configuração e manutenção de motores e sistemas de acionamento de portões.',
    details: 'A solução é definida considerando o portão, a frequência de uso, os equipamentos instalados e as condições de infraestrutura e segurança do local.',
    benefits: ['Avaliação técnica da aplicação', 'Instalação e configuração do acionamento', 'Manutenção de motores e componentes', 'Compatibilidade avaliada para cada projeto'],
    applications: 'Acessos de condomínios, empresas e propriedades que necessitam automatizar ou manter seus portões.'
  },
  'instalacao-manutencao': {
    title: 'Instalação e Manutenção de Equipamentos',
    description: 'Serviços técnicos de instalação, configuração, integração e manutenção de equipamentos de segurança e tecnologia.',
    details: 'A atuação pode envolver equipamentos compatíveis com a infraestrutura do cliente e com o escopo acordado, incluindo avaliação, implantação e suporte técnico.',
    benefits: ['Instalação e configuração profissional', 'Integração de equipamentos compatíveis', 'Manutenção técnica planejada', 'Acompanhamento conforme contratação'],
    applications: 'Condomínios, empresas e instituições com equipamentos de segurança ou tecnologia que precisam de implantação ou suporte.'
  },
  locacao: {
    title: 'Locação de Câmeras e Controle de Acesso',
    description: 'Locação de equipamentos e sistemas de câmeras e controle de acesso, conforme a necessidade do cliente e as condições comerciais contratadas.',
    details: 'O escopo, a disponibilidade, os equipamentos incluídos, o suporte e as condições de locação são definidos em proposta comercial para cada necessidade.',
    benefits: ['Alternativa de contratação conforme necessidade', 'Dimensionamento de equipamentos por projeto', 'Possibilidade de incluir suporte conforme contrato', 'Condições comerciais apresentadas em proposta'],
    applications: 'Empreendimentos e empresas que estejam avaliando locação de equipamentos de segurança eletrônica.'
  },
  'empresas-orgaos-publicos': {
    title: 'Soluções para Empresas e Órgãos Públicos',
    description: 'Projetos personalizados de segurança eletrônica, monitoramento e controle de acesso para ambientes corporativos e institucionais.',
    details: 'Cada projeto é planejado considerando os fluxos de pessoas, as áreas de acesso, a infraestrutura e os requisitos operacionais informados pelo cliente.',
    benefits: ['Levantamento das necessidades do ambiente', 'Projeto alinhado à operação institucional', 'Integração de soluções compatíveis', 'Acompanhamento técnico conforme contratação'],
    applications: 'Empresas, indústrias, operações logísticas e órgãos públicos.'
  }
};

const servicePage = document.querySelector('[data-service-page]');
if (servicePage) {
  const serviceKey = new URLSearchParams(window.location.search).get('servico');
  const service = serviceData[serviceKey];
  if (!service) {
    window.location.replace('index.html#solucoes');
  } else {
    document.title = `${service.title} | Predial Security`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', service.description);
    document.querySelector('#service-title').textContent = service.title;
    document.querySelector('#service-breadcrumb').textContent = service.title;
    document.querySelector('#service-description').textContent = service.description;
    document.querySelector('#service-details').textContent = service.details;
    document.querySelector('#service-applications').textContent = service.applications;
    const benefitList = document.querySelector('#service-benefits');
    service.benefits.forEach((benefit) => {
      const item = document.createElement('li');
      item.textContent = benefit;
      benefitList.append(item);
    });
    document.querySelector('#service-quote').href = `index.html?servico=${encodeURIComponent(serviceKey)}#contato`;
  }
}

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('servico');
  const serviceOptions = {
    'portaria-remota': 'Portaria Remota e Autônoma',
    'controle-de-acesso': 'Controle de Acesso',
    'cameras-seguranca': 'Câmeras e Segurança Eletrônica',
    interfones: 'Instalação e Manutenção de Interfones',
    'automacao-portoes': 'Automação de Portões',
    'instalacao-manutencao': 'Instalação e Manutenção de Equipamentos',
    locacao: 'Locação de Câmeras e Controle de Acesso',
    'empresas-orgaos-publicos': 'Soluções para Empresas e Órgãos Públicos'
  };
  const requestedOption = serviceOptions[requestedService];
  if (requestedOption) quoteForm.elements.service.value = requestedOption;

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameField = quoteForm.elements.name;
    const organizationField = quoteForm.elements.organization;
    nameField.setCustomValidity(nameField.value.trim() ? '' : 'Informe seu nome completo.');
    organizationField.setCustomValidity(organizationField.value.trim() ? '' : 'Informe o nome da empresa ou condomínio.');
    if (!quoteForm.reportValidity()) return;

    const formData = new FormData(quoteForm);
    const fields = [
      ['Nome', formData.get('name')],
      ['Empresa/condomínio', formData.get('organization')],
      ['Serviço', formData.get('service')],
      ['Cidade', formData.get('city')],
      ['Necessidade', formData.get('message')]
    ];
    const message = [
      'Olá! Gostaria de solicitar uma proposta para a Predial Security.',
      ...fields.filter(([, value]) => String(value || '').trim()).map(([label, value]) => `${label}: ${String(value).trim()}`)
    ].join('\n');
    const whatsappUrl = `https://wa.me/559831961515?text=${encodeURIComponent(message)}`;
    const status = document.querySelector('#form-status');
    const whatsappWindow = window.open(whatsappUrl, '_blank');
    if (whatsappWindow) {
      whatsappWindow.opener = null;
      status.textContent = 'A mensagem foi preparada no WhatsApp. Revise os dados e toque em Enviar para concluir o contato.';
    } else {
      status.textContent = 'O navegador bloqueou a nova janela. Abra o WhatsApp pelo botão de contato e envie sua solicitação.';
    }
  });
}