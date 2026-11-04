/* ============================================================
   content.jsx — per-language site copy (window.CONTENT[lang])
   Phase 1: nav, hero, intro, about, spec, index, project cards.
   Values/proper nouns (BYU, Provo, units, ISO/FDA codes) are
   intentionally preserved across languages.
   ============================================================ */

window.CONTENT = {
  en: {
    nav: {
      indexOfWorks: 'INDEX OF WORKS', themeDark: 'Dark mode', themeLight: 'Light mode',
      drawer: { home: 'HOME', intro: 'INTRO', about: 'ABOUT', skills: 'SKILLS', index: 'INDEX OF WORKS' },
      pill: { home: 'HOME', intro: 'INTRO', about: 'ABOUT', skills: 'SKILLS', work: 'WORK' },
    },
    hero: { title: 'ENGINEERING PORTFOLIO', tagline: 'MECHANICAL ENGINEERING • ROBOTICS • NEUROMECHANICS • PHYSICS-INFORMED DEEP LEARNING', scroll: 'SCROLL TO EXPLORE PROJECTS' },
    intro: {
      eyebrow: '// INTRODUCTION',
      headlineHTML: '<em>Dynamics</em>, <em>simulation</em>, and <em>robotics</em>, from the lab to the field.',
      body: "I'm a mechanical engineer working on robotics, finite element analysis of mechanical vibrations, human body dynamics, and neural networks that obey physics.",
    },
    about: {
      eyebrow: '// PROFILE',
      blueprintTag: 'ANATOMICAL REF SHEET — REV 3.1',
      meta: [
        { k: 'NOW', v: 'M.S. Mechanical Engineering, BYU' },
        { k: 'COMPLETED', v: "B.S. Mechanical Engineering, BYU '26" },
        { k: 'NEXT', v: "M.S. Robotic Systems Dev., Carnegie Mellon '27" },
        { k: 'RESEARCH', v: 'Neuromechanics (Dr. Steven Charles)' },
        { k: 'LOCATION', v: 'Provo, Utah' },
      ],
    },
    spec: {
      eyebrow: '// AREAS OF SPECIALIZATION', titleHTML: 'CORE<br/>COMPETENCIES', count: '10 DISCIPLINES',
      items: ['Robot Dynamics & Control', 'Inverse Kinematics & Gait Design', 'Neuromechanical Modeling', 'Physics-Informed Deep Learning', 'Dynamic System Simulation', 'Finite Element & Vibration Analysis', 'Mechanical Design & CAD', 'Mechatronics & Embedded Control', 'Agentic AI Systems', 'Technical Team Leadership'],
    },
    contact: { eyebrow: 'CONTACT', title: 'Send me a message', name: 'Name', email: 'Email', message: 'Message', send: 'Send message', sending: 'Sending…', sent: "Message sent. I'll get back to you soon.", error: 'Something went wrong. Please try again, or copy my email below.', copy: 'Or copy my email', copied: 'Copied ✓', close: 'Close' },
    index: {
      titleHTML: 'INDEX<br/>OF WORKS',
      projectWord: 'PROJECT', technicalDiagram: 'TECHNICAL DIAGRAM', viewSpecs: 'VIEW SPECS →', endOfIndex: 'END OF INDEX', lastUpdated: 'LAST UPDATED',
    },
    projects: [
      { category: 'NEURAL / AI', title: 'DEEP LEARNING', flow: '9 ARCHITECTURES' },
      { category: 'BIOMECHANICS', title: 'NEUROMECHANICS RESEARCH', flow: '50-MUSCLE ARM MODEL' },
      { category: 'AEROSPACE', title: 'MARS ROVER', flow: '4TH OF 114 TEAMS' },
      { category: 'ROBOTICS', title: 'HEXAPOD ROBOT', flow: '18 DOF' },
      { category: 'ROBOTICS', title: 'AUTONOMOUS ROBOT', flow: 'EMBEDDED CONTROL' },
      { category: 'PRODUCT', title: 'HYDRATION TRACKER', flow: '50+ CUSTOMER INTERVIEWS' },
      { category: 'STRUCTURAL DYNAMICS', title: 'POWDER DAMPERS', flow: 'IMAC PAPER' },
    ],
  },

  ja: {
    nav: {
      indexOfWorks: '作品インデックス', themeDark: 'ダークモード', themeLight: 'ライトモード',
      drawer: { home: 'ホーム', intro: 'イントロ', about: 'アバウト', skills: 'スキル', index: '作品インデックス' },
      pill: { home: 'ホーム', intro: 'イントロ', about: 'アバウト', skills: 'スキル', work: '作品' },
    },
    hero: { title: 'エンジニアリング ポートフォリオ', tagline: '機械工学 • ロボティクス • ニューロメカニクス • 物理情報深層学習', scroll: 'スクロールしてプロジェクトを見る' },
    intro: {
      eyebrow: '// イントロダクション',
      headlineHTML: '<em>ダイナミクス</em>、<em>シミュレーション</em>、<em>ロボティクス</em>。研究室から現場まで。',
      body: 'ロボティクス、機械振動の有限要素解析、人体の動力学、そして物理法則に従うニューラルネットワークに取り組む機械エンジニアです。',
    },
    about: {
      eyebrow: '// プロフィール',
      blueprintTag: '解剖参照シート — REV 3.1',
      meta: [
        { k: '現在', v: '機械工学 修士課程, BYU' },
        { k: '卒業', v: "機械工学 学士, BYU '26" },
        { k: '進学予定', v: "M.S. Robotic Systems Dev., Carnegie Mellon '27" },
        { k: '研究', v: 'ニューロメカニクス (Dr. Steven Charles)' },
        { k: '所在地', v: 'Provo, Utah' },
      ],
    },
    spec: {
      eyebrow: '// 専門分野', titleHTML: 'コア<br/>コンピテンシー', count: '10 分野',
      items: ['ロボット動力学 & 制御', '逆運動学 & 歩容設計', 'ニューロメカニクスモデリング', '物理情報深層学習', '動的システムシミュレーション', '有限要素法 & 振動解析', '機械設計 & CAD', 'メカトロニクス & 組込み制御', 'エージェント型AIシステム', '技術チームリーダーシップ'],
    },
    contact: { eyebrow: 'お問い合わせ', title: 'メッセージを送る', name: 'お名前', email: 'メールアドレス', message: 'メッセージ', send: '送信する', sending: '送信中…', sent: 'メッセージを送信しました。折り返しご連絡します。', error: 'エラーが発生しました。もう一度お試しいただくか、下のメールアドレスをコピーしてください。', copy: 'メールアドレスをコピー', copied: 'コピーしました ✓', close: '閉じる' },
    index: {
      titleHTML: '作品<br/>インデックス',
      projectWord: 'プロジェクト', technicalDiagram: '技術図面', viewSpecs: '仕様を見る →', endOfIndex: 'インデックス終わり', lastUpdated: '最終更新',
    },
    projects: [
      { category: 'ニューラル / AI', title: 'ディープラーニング', flow: '9つのアーキテクチャ' },
      { category: 'バイオメカニクス', title: 'ニューロメカニクス研究', flow: '50筋の腕モデル' },
      { category: '航空宇宙', title: '火星ローバー', flow: '114チーム中4位' },
      { category: 'ロボティクス', title: 'ヘキサポッドロボット', flow: '18自由度' },
      { category: 'ロボティクス', title: '自律ロボット', flow: '組込み制御' },
      { category: 'プロダクト', title: '水分補給トラッカー', flow: '顧客インタビュー50件以上' },
      { category: '構造力学', title: 'パウダーダンパー', flow: 'IMAC論文' },
    ],
  },

  de: {
    nav: {
      indexOfWorks: 'WERKVERZEICHNIS', themeDark: 'Dunkelmodus', themeLight: 'Hellmodus',
      drawer: { home: 'START', intro: 'INTRO', about: 'ÜBER', skills: 'SKILLS', index: 'WERKVERZEICHNIS' },
      pill: { home: 'START', intro: 'INTRO', about: 'ÜBER', skills: 'SKILLS', work: 'WERKE' },
    },
    hero: { title: 'INGENIEUR- PORTFOLIO', tagline: 'MASCHINENBAU • ROBOTIK • NEUROMECHANIK • PHYSIKINFORMIERTES DEEP LEARNING', scroll: 'SCROLLEN, UM PROJEKTE ZU ENTDECKEN' },
    intro: {
      eyebrow: '// EINFÜHRUNG',
      headlineHTML: '<em>Dynamik</em>, <em>Simulation</em> und <em>Robotik</em>, vom Labor bis ins Feld.',
      body: 'Ich bin Maschinenbauingenieur und arbeite an Robotik, Finite-Elemente-Analyse mechanischer Schwingungen, der Dynamik des menschlichen Körpers und neuronalen Netzen, die den Gesetzen der Physik folgen.',
    },
    about: {
      eyebrow: '// PROFIL',
      blueprintTag: 'ANATOMISCHES REFERENZBLATT — REV 3.1',
      meta: [
        { k: 'AKTUELL', v: 'M.Sc. Maschinenbau, BYU' },
        { k: 'ABGESCHLOSSEN', v: "B.Sc. Maschinenbau, BYU '26" },
        { k: 'NÄCHSTES', v: "M.S. Robotic Systems Dev., Carnegie Mellon '27" },
        { k: 'FORSCHUNG', v: 'Neuromechanik (Dr. Steven Charles)' },
        { k: 'STANDORT', v: 'Provo, Utah' },
      ],
    },
    spec: {
      eyebrow: '// FACHGEBIETE', titleHTML: 'KERN-<br/>KOMPETENZEN', count: '10 DISZIPLINEN',
      items: ['Roboterdynamik & Regelung', 'Inverse Kinematik & Gangdesign', 'Neuromechanische Modellierung', 'Physikinformiertes Deep Learning', 'Simulation dynamischer Systeme', 'FEM & Schwingungsanalyse', 'Konstruktion & CAD', 'Mechatronik & Embedded-Regelung', 'Agentische KI-Systeme', 'Technische Teamleitung'],
    },
    contact: { eyebrow: 'KONTAKT', title: 'Schreib mir eine Nachricht', name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Nachricht senden', sending: 'Wird gesendet…', sent: 'Nachricht gesendet. Ich melde mich bald.', error: 'Etwas ist schiefgelaufen. Bitte versuch es noch einmal oder kopiere unten meine E-Mail.', copy: 'Oder meine E-Mail kopieren', copied: 'Kopiert ✓', close: 'Schließen' },
    index: {
      titleHTML: 'WERK-<br/>VERZEICHNIS',
      projectWord: 'PROJEKT', technicalDiagram: 'TECHNISCHE ZEICHNUNG', viewSpecs: 'DETAILS ANSEHEN →', endOfIndex: 'ENDE DES VERZEICHNISSES', lastUpdated: 'ZULETZT AKTUALISIERT',
    },
    projects: [
      { category: 'NEURONAL / KI', title: 'DEEP LEARNING', flow: '9 ARCHITEKTUREN' },
      { category: 'BIOMECHANIK', title: 'NEUROMECHANIK-FORSCHUNG', flow: '50-MUSKEL-ARMMODELL' },
      { category: 'LUFT- & RAUMFAHRT', title: 'MARS-ROVER', flow: 'PLATZ 4 VON 114 TEAMS' },
      { category: 'ROBOTIK', title: 'HEXAPOD-ROBOTER', flow: '18 FREIHEITSGRADE' },
      { category: 'ROBOTIK', title: 'AUTONOMER ROBOTER', flow: 'EMBEDDED-REGELUNG' },
      { category: 'PRODUKT', title: 'HYDRATIONS-TRACKER', flow: '50+ KUNDENINTERVIEWS' },
      { category: 'STRUKTURDYNAMIK', title: 'PULVERDÄMPFER', flow: 'IMAC-BEITRAG' },
    ],
  },

  fr: {
    nav: {
      indexOfWorks: 'INDEX DES TRAVAUX', themeDark: 'Mode sombre', themeLight: 'Mode clair',
      drawer: { home: 'ACCUEIL', intro: 'INTRO', about: 'À PROPOS', skills: 'COMPÉTENCES', index: 'INDEX DES TRAVAUX' },
      pill: { home: 'ACCUEIL', intro: 'INTRO', about: 'À PROPOS', skills: 'EXPERTISE', work: 'TRAVAUX' },
    },
    hero: { title: "PORTFOLIO D'INGÉNIERIE", tagline: 'GÉNIE MÉCANIQUE • ROBOTIQUE • NEUROMÉCANIQUE • DEEP LEARNING INFORMÉ PAR LA PHYSIQUE', scroll: 'FAITES DÉFILER POUR EXPLORER LES PROJETS' },
    intro: {
      eyebrow: '// INTRODUCTION',
      headlineHTML: '<em>Dynamique</em>, <em>simulation</em> et <em>robotique</em>, du laboratoire au terrain.',
      body: "Je suis ingénieur en mécanique et je travaille sur la robotique, l'analyse par éléments finis des vibrations mécaniques, la dynamique du corps humain et des réseaux de neurones qui respectent la physique.",
    },
    about: {
      eyebrow: '// PROFIL',
      blueprintTag: 'FICHE DE RÉFÉRENCE ANATOMIQUE — RÉV. 3.1',
      meta: [
        { k: 'ACTUEL', v: 'Master en génie mécanique, BYU' },
        { k: 'OBTENU', v: "Licence en génie mécanique, BYU '26" },
        { k: 'À VENIR', v: "M.S. Robotic Systems Dev., Carnegie Mellon '27" },
        { k: 'RECHERCHE', v: 'Neuromécanique (Dr Steven Charles)' },
        { k: 'LIEU', v: 'Provo, Utah' },
      ],
    },
    spec: {
      eyebrow: '// DOMAINES DE SPÉCIALISATION', titleHTML: 'COMPÉTENCES<br/>CLÉS', count: '10 DISCIPLINES',
      items: ['Dynamique & commande des robots', 'Cinématique inverse & conception de la marche', 'Modélisation neuromécanique', 'Deep learning informé par la physique', 'Simulation de systèmes dynamiques', 'Éléments finis & analyse vibratoire', 'Conception mécanique & CAO', 'Mécatronique & commande embarquée', "Systèmes d'IA agentique", "Direction d'équipes techniques"],
    },
    contact: { eyebrow: 'CONTACT', title: 'Envoyez-moi un message', name: 'Nom', email: 'E-mail', message: 'Message', send: 'Envoyer', sending: 'Envoi…', sent: 'Message envoyé. Je vous réponds rapidement.', error: "Une erreur s'est produite. Réessayez, ou copiez mon e-mail ci-dessous.", copy: 'Ou copier mon e-mail', copied: 'Copié ✓', close: 'Fermer' },
    index: {
      titleHTML: 'INDEX DES<br/>TRAVAUX',
      projectWord: 'PROJET', technicalDiagram: 'SCHÉMA TECHNIQUE', viewSpecs: 'VOIR LES SPÉCS →', endOfIndex: "FIN DE L'INDEX", lastUpdated: 'DERNIÈRE MISE À JOUR',
    },
    projects: [
      { category: 'NEURONAL / IA', title: 'APPRENTISSAGE PROFOND', flow: '9 ARCHITECTURES' },
      { category: 'BIOMÉCANIQUE', title: 'RECHERCHE EN NEUROMÉCANIQUE', flow: 'MODÈLE DE BRAS À 50 MUSCLES' },
      { category: 'AÉROSPATIALE', title: 'ROVER MARTIEN', flow: '4E SUR 114 ÉQUIPES' },
      { category: 'ROBOTIQUE', title: 'ROBOT HEXAPODE', flow: '18 DDL' },
      { category: 'ROBOTIQUE', title: 'ROBOT AUTONOME', flow: 'COMMANDE EMBARQUÉE' },
      { category: 'PRODUIT', title: "SUIVI D'HYDRATATION", flow: '50+ ENTRETIENS CLIENTS' },
      { category: 'DYNAMIQUE STRUCTURELLE', title: 'AMORTISSEURS À POUDRE', flow: 'ARTICLE IMAC' },
    ],
  },

  ko: {
    nav: {
      indexOfWorks: '작품 색인', themeDark: '다크 모드', themeLight: '라이트 모드',
      drawer: { home: '홈', intro: '소개', about: '프로필', skills: '역량', index: '작품 색인' },
      pill: { home: '홈', intro: '소개', about: '프로필', skills: '역량', work: '작품' },
    },
    hero: { title: '엔지니어링 포트폴리오', tagline: '기계공학 • 로보틱스 • 신경역학 • 물리 기반 딥러닝', scroll: '스크롤하여 프로젝트 살펴보기' },
    intro: {
      eyebrow: '// 소개',
      headlineHTML: '<em>동역학</em>, <em>시뮬레이션</em>, <em>로보틱스</em>. 연구실에서 현장까지.',
      body: '저는 로보틱스, 기계 진동의 유한요소해석, 인체 동역학, 그리고 물리 법칙을 따르는 신경망을 다루는 기계공학 엔지니어입니다.',
    },
    about: {
      eyebrow: '// 프로필',
      blueprintTag: '해부 참조 시트 — REV 3.1',
      meta: [
        { k: '현재', v: '기계공학 석사과정, BYU' },
        { k: '졸업', v: "기계공학 학사, BYU '26" },
        { k: '진학 예정', v: "M.S. Robotic Systems Dev., Carnegie Mellon '27" },
        { k: '연구', v: '신경역학 (Dr. Steven Charles)' },
        { k: '위치', v: 'Provo, Utah' },
      ],
    },
    spec: {
      eyebrow: '// 전문 분야', titleHTML: '핵심<br/>역량', count: '10개 분야',
      items: ['로봇 동역학 & 제어', '역기구학 & 보행 설계', '신경역학 모델링', '물리 기반 딥러닝', '동적 시스템 시뮬레이션', '유한요소 & 진동 해석', '기계 설계 & CAD', '메카트로닉스 & 임베디드 제어', '에이전틱 AI 시스템', '기술 팀 리더십'],
    },
    contact: { eyebrow: '연락처', title: '메시지 보내기', name: '이름', email: '이메일', message: '메시지', send: '보내기', sending: '보내는 중…', sent: '메시지를 보냈습니다. 곧 답장드리겠습니다.', error: '문제가 발생했습니다. 다시 시도하시거나 아래 이메일을 복사해 주세요.', copy: '또는 이메일 복사', copied: '복사됨 ✓', close: '닫기' },
    index: {
      titleHTML: '작품<br/>색인',
      projectWord: '프로젝트', technicalDiagram: '기술 도면', viewSpecs: '사양 보기 →', endOfIndex: '색인 끝', lastUpdated: '마지막 업데이트',
    },
    projects: [
      { category: '뉴럴 / AI', title: '딥러닝', flow: '9개 아키텍처' },
      { category: '생체역학', title: '신경역학 연구', flow: '50개 근육 팔 모델' },
      { category: '항공우주', title: '화성 로버', flow: '114개 팀 중 4위' },
      { category: '로보틱스', title: '헥사포드 로봇', flow: '18 자유도' },
      { category: '로보틱스', title: '자율 로봇', flow: '임베디드 제어' },
      { category: '제품', title: '수분 섭취 트래커', flow: '고객 인터뷰 50건 이상' },
      { category: '구조 동역학', title: '분말 댐퍼', flow: 'IMAC 논문' },
    ],
  },

  es: {
    nav: {
      indexOfWorks: 'ÍNDICE DE TRABAJOS', themeDark: 'Modo oscuro', themeLight: 'Modo claro',
      drawer: { home: 'INICIO', intro: 'INTRO', about: 'PERFIL', skills: 'APTITUDES', index: 'ÍNDICE DE TRABAJOS' },
      pill: { home: 'INICIO', intro: 'INTRO', about: 'PERFIL', skills: 'APTITUDES', work: 'TRABAJOS' },
    },
    hero: { title: 'PORTAFOLIO DE INGENIERÍA', tagline: 'INGENIERÍA MECÁNICA • ROBÓTICA • NEUROMECÁNICA • DEEP LEARNING INFORMADO POR LA FÍSICA', scroll: 'DESPLÁZATE PARA EXPLORAR LOS PROYECTOS' },
    intro: {
      eyebrow: '// INTRODUCCIÓN',
      headlineHTML: '<em>Dinámica</em>, <em>simulación</em> y <em>robótica</em>, del laboratorio al campo.',
      body: 'Soy ingeniero mecánico y trabajo en robótica, análisis por elementos finitos de vibraciones mecánicas, dinámica del cuerpo humano y redes neuronales que obedecen a la física.',
    },
    about: {
      eyebrow: '// PERFIL',
      blueprintTag: 'FICHA DE REFERENCIA ANATÓMICA — REV. 3.1',
      meta: [
        { k: 'ACTUAL', v: 'M.S. en Ingeniería Mecánica, BYU' },
        { k: 'COMPLETADO', v: "B.S. en Ingeniería Mecánica, BYU '26" },
        { k: 'PRÓXIMO', v: "M.S. Robotic Systems Dev., Carnegie Mellon '27" },
        { k: 'INVESTIGACIÓN', v: 'Neuromecánica (Dr. Steven Charles)' },
        { k: 'UBICACIÓN', v: 'Provo, Utah' },
      ],
    },
    spec: {
      eyebrow: '// ÁREAS DE ESPECIALIZACIÓN', titleHTML: 'COMPETENCIAS<br/>CLAVE', count: '10 DISCIPLINAS',
      items: ['Dinámica y control de robots', 'Cinemática inversa y diseño de marcha', 'Modelado neuromecánico', 'Deep learning informado por la física', 'Simulación de sistemas dinámicos', 'Elementos finitos y análisis de vibraciones', 'Diseño mecánico y CAD', 'Mecatrónica y control embebido', 'Sistemas de IA agéntica', 'Liderazgo de equipos técnicos'],
    },
    contact: { eyebrow: 'CONTACTO', title: 'Envíame un mensaje', name: 'Nombre', email: 'Correo', message: 'Mensaje', send: 'Enviar mensaje', sending: 'Enviando…', sent: 'Mensaje enviado. Te responderé pronto.', error: 'Algo salió mal. Inténtalo de nuevo o copia mi correo abajo.', copy: 'O copia mi correo', copied: 'Copiado ✓', close: 'Cerrar' },
    index: {
      titleHTML: 'ÍNDICE DE<br/>TRABAJOS',
      projectWord: 'PROYECTO', technicalDiagram: 'DIAGRAMA TÉCNICO', viewSpecs: 'VER ESPECIF. →', endOfIndex: 'FIN DEL ÍNDICE', lastUpdated: 'ÚLTIMA ACTUALIZACIÓN',
    },
    projects: [
      { category: 'NEURONAL / IA', title: 'APRENDIZAJE PROFUNDO', flow: '9 ARQUITECTURAS' },
      { category: 'BIOMECÁNICA', title: 'INVESTIGACIÓN EN NEUROMECÁNICA', flow: 'MODELO DE BRAZO DE 50 MÚSCULOS' },
      { category: 'AEROESPACIAL', title: 'ROVER DE MARTE', flow: '4.º DE 114 EQUIPOS' },
      { category: 'ROBÓTICA', title: 'ROBOT HEXÁPODO', flow: '18 GDL' },
      { category: 'ROBÓTICA', title: 'ROBOT AUTÓNOMO', flow: 'CONTROL EMBEBIDO' },
      { category: 'PRODUCTO', title: 'MONITOR DE HIDRATACIÓN', flow: '50+ ENTREVISTAS CON CLIENTES' },
      { category: 'DINÁMICA ESTRUCTURAL', title: 'AMORTIGUADORES DE POLVO', flow: 'ARTÍCULO IMAC' },
    ],
  },
};
