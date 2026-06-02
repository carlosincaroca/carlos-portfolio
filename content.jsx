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
    hero: { tagline: 'PORTFOLIO OF BIOMEDICAL ENGINEERING • COMPUTATIONAL BIOMECHANICS • MEDICAL DEVICES', scroll: 'SCROLL TO EXPLORE PROJECTS' },
    intro: {
      eyebrow: '// INTRODUCTION',
      headlineHTML: 'Engineering <em>human-grade</em> solutions — where <em>mechanical precision</em> meets biological complexity.',
      body: 'Biomedical engineer bridging the gap between clinical need and mechanical innovation. Focused on systems where precision engineering enables better patient outcomes — from cardiac assist devices to neural interfaces and beyond.',
    },
    about: {
      eyebrow: '// PROFILE',
      bio: 'ME student at Brigham Young University specializing in the intersection of mechanical engineering and biomedical applications. Designing systems where precision engineering enables better patient outcomes — from concept to clinical validation.',
      blueprintTag: 'ANATOMICAL REF SHEET — REV 3.1',
      meta: [
        { k: 'INSTITUTION', v: 'Brigham Young University' },
        { k: 'DEGREE', v: 'B.S. Mechanical Engineering' },
        { k: 'TRACK', v: 'Biomedical Engineering' },
        { k: 'LOCATION', v: 'Provo, Utah' },
        { k: 'STATUS', v: 'ACTIVE CANDIDATE' },
      ],
    },
    spec: {
      eyebrow: '// AREAS OF SPECIALIZATION', titleHTML: 'CORE<br/>COMPETENCIES', count: '10 DISCIPLINES',
      items: ['Cardiac Systems & Hemodynamics', 'Neural Interface Design', 'Prosthetics & Orthotics', 'Vascular Engineering', 'Respiratory Device Systems', 'Exoskeletal Biomechanics', 'Bioelectronics & Sensing', 'Computational Biomechanics', 'Medical Imaging Integration', 'FDA Regulatory Compliance'],
    },
    index: {
      titleHTML: 'INDEX<br/>OF WORKS', projectsWord: 'PROJECTS', systemsWord: 'SYSTEMS', revisionsWord: 'REVISIONS',
      projectWord: 'PROJECT', technicalDiagram: 'TECHNICAL DIAGRAM', viewSpecs: 'VIEW SPECS →', endOfIndex: 'END OF INDEX', lastUpdated: 'LAST UPDATED',
    },
    projects: [
      { category: 'NEURAL / AI', title: 'DEEP LEARNING', flow: '94.2% ACC' },
      { category: 'BIOMECHANICS', title: 'EXOSKELETON SPINE', flow: 'LOAD DISTRIBUTION' },
      { category: 'AEROSPACE', title: 'MARS ROVER', flow: '25KM RANGE' },
      { category: 'MECHANICS', title: 'PROSTHETIC JOINT', flow: 'ROM 150°' },
      { category: 'ROBOTICS', title: 'AUTONOMOUS ROBOT', flow: '15 L/MIN' },
      { category: 'CARDIOLOGY', title: 'VASCULAR STENT', flow: 'Ø 3.5MM' },
    ],
  },

  ja: {
    nav: {
      indexOfWorks: '作品インデックス', themeDark: 'ダークモード', themeLight: 'ライトモード',
      drawer: { home: 'ホーム', intro: 'イントロ', about: 'アバウト', skills: 'スキル', index: '作品インデックス' },
      pill: { home: 'ホーム', intro: 'イントロ', about: 'アバウト', skills: 'スキル', work: '作品' },
    },
    hero: { tagline: '生体医工学 • 計算バイオメカニクス • 医療機器のポートフォリオ', scroll: 'スクロールしてプロジェクトを見る' },
    intro: {
      eyebrow: '// イントロダクション',
      headlineHTML: '<em>人間品質</em>のソリューションを設計する — <em>機械的な精度</em>が生物学的な複雑さと出会う場所。',
      body: '臨床的ニーズと機械工学的イノベーションの架け橋となる生体医工学エンジニア。精密工学がより良い患者アウトカムを実現するシステムに注力 — 心臓補助装置から神経インターフェース、そしてその先へ。',
    },
    about: {
      eyebrow: '// プロフィール',
      bio: 'ブリガムヤング大学で機械工学を専攻し、機械工学と生体医工学応用の交差点を専門とする学生。精密工学がより良い患者アウトカムを実現するシステムを、コンセプトから臨床検証まで設計している。',
      blueprintTag: '解剖参照シート — REV 3.1',
      meta: [
        { k: '所属', v: 'Brigham Young University' },
        { k: '学位', v: '機械工学 学士 (B.S.)' },
        { k: '専攻', v: '生体医工学' },
        { k: '所在地', v: 'Provo, Utah' },
        { k: 'ステータス', v: '在籍中' },
      ],
    },
    spec: {
      eyebrow: '// 専門分野', titleHTML: 'コア<br/>コンピテンシー', count: '10 分野',
      items: ['心臓システム & 血行動態', '神経インターフェース設計', '義肢 & 装具', '血管工学', '呼吸器デバイスシステム', '外骨格バイオメカニクス', 'バイオエレクトロニクス & センシング', '計算バイオメカニクス', '医用画像統合', 'FDA規制コンプライアンス'],
    },
    index: {
      titleHTML: '作品<br/>インデックス', projectsWord: 'プロジェクト', systemsWord: 'システム', revisionsWord: 'リビジョン',
      projectWord: 'プロジェクト', technicalDiagram: '技術図面', viewSpecs: '仕様を見る →', endOfIndex: 'インデックス終わり', lastUpdated: '最終更新',
    },
    projects: [
      { category: 'ニューラル / AI', title: 'ディープラーニング', flow: '94.2% 精度' },
      { category: 'バイオメカニクス', title: '外骨格スパイン', flow: '荷重分散' },
      { category: '航空宇宙', title: '火星ローバー', flow: '航続 25KM' },
      { category: 'メカニクス', title: '義足関節', flow: '可動域 150°' },
      { category: 'ロボティクス', title: '自律ロボット', flow: '15 L/分' },
      { category: '循環器', title: '血管ステント', flow: 'Ø 3.5MM' },
    ],
  },

  de: {
    nav: {
      indexOfWorks: 'WERKVERZEICHNIS', themeDark: 'Dunkelmodus', themeLight: 'Hellmodus',
      drawer: { home: 'START', intro: 'INTRO', about: 'ÜBER', skills: 'SKILLS', index: 'WERKVERZEICHNIS' },
      pill: { home: 'START', intro: 'INTRO', about: 'ÜBER', skills: 'SKILLS', work: 'WERKE' },
    },
    hero: { tagline: 'PORTFOLIO FÜR BIOMEDIZINTECHNIK • COMPUTERGESTÜTZTE BIOMECHANIK • MEDIZINPRODUKTE', scroll: 'SCROLLEN, UM PROJEKTE ZU ENTDECKEN' },
    intro: {
      eyebrow: '// EINFÜHRUNG',
      headlineHTML: '<em>Menschengerechte</em> Lösungen entwickeln — wo <em>mechanische Präzision</em> auf biologische Komplexität trifft.',
      body: 'Biomediziningenieur, der die Lücke zwischen klinischem Bedarf und mechanischer Innovation schließt. Fokussiert auf Systeme, in denen Präzisionstechnik bessere Behandlungsergebnisse ermöglicht — von Herzunterstützungssystemen bis zu neuronalen Schnittstellen und darüber hinaus.',
    },
    about: {
      eyebrow: '// PROFIL',
      bio: 'Maschinenbaustudent an der Brigham Young University mit Spezialisierung auf die Schnittstelle von Maschinenbau und biomedizinischen Anwendungen. Entwickelt Systeme, in denen Präzisionstechnik bessere Behandlungsergebnisse ermöglicht — vom Konzept bis zur klinischen Validierung.',
      blueprintTag: 'ANATOMISCHES REFERENZBLATT — REV 3.1',
      meta: [
        { k: 'INSTITUTION', v: 'Brigham Young University' },
        { k: 'ABSCHLUSS', v: 'B.Sc. Maschinenbau' },
        { k: 'SCHWERPUNKT', v: 'Biomedizintechnik' },
        { k: 'STANDORT', v: 'Provo, Utah' },
        { k: 'STATUS', v: 'AKTIVER KANDIDAT' },
      ],
    },
    spec: {
      eyebrow: '// FACHGEBIETE', titleHTML: 'KERN-<br/>KOMPETENZEN', count: '10 DISZIPLINEN',
      items: ['Herzsysteme & Hämodynamik', 'Neuronale Schnittstellen', 'Prothetik & Orthetik', 'Gefäßtechnik', 'Beatmungsgerätesysteme', 'Exoskelett-Biomechanik', 'Bioelektronik & Sensorik', 'Computergestützte Biomechanik', 'Integration medizinischer Bildgebung', 'FDA-Regulierungskonformität'],
    },
    index: {
      titleHTML: 'WERK-<br/>VERZEICHNIS', projectsWord: 'PROJEKTE', systemsWord: 'SYSTEME', revisionsWord: 'REVISIONEN',
      projectWord: 'PROJEKT', technicalDiagram: 'TECHNISCHE ZEICHNUNG', viewSpecs: 'DETAILS ANSEHEN →', endOfIndex: 'ENDE DES VERZEICHNISSES', lastUpdated: 'ZULETZT AKTUALISIERT',
    },
    projects: [
      { category: 'NEURONAL / KI', title: 'DEEP LEARNING', flow: '94,2% GENAUIGKEIT' },
      { category: 'BIOMECHANIK', title: 'EXOSKELETT-WIRBELSÄULE', flow: 'LASTVERTEILUNG' },
      { category: 'LUFT- & RAUMFAHRT', title: 'MARS-ROVER', flow: '25KM REICHWEITE' },
      { category: 'MECHANIK', title: 'PROTHESENGELENK', flow: 'BEWEGUNG 150°' },
      { category: 'ROBOTIK', title: 'AUTONOMER ROBOTER', flow: '15 L/MIN' },
      { category: 'KARDIOLOGIE', title: 'GEFÄSSSTENT', flow: 'Ø 3,5MM' },
    ],
  },

  fr: {
    nav: {
      indexOfWorks: 'INDEX DES TRAVAUX', themeDark: 'Mode sombre', themeLight: 'Mode clair',
      drawer: { home: 'ACCUEIL', intro: 'INTRO', about: 'À PROPOS', skills: 'COMPÉTENCES', index: 'INDEX DES TRAVAUX' },
      pill: { home: 'ACCUEIL', intro: 'INTRO', about: 'À PROPOS', skills: 'EXPERTISE', work: 'TRAVAUX' },
    },
    hero: { tagline: "PORTFOLIO D'INGÉNIERIE BIOMÉDICALE • BIOMÉCANIQUE COMPUTATIONNELLE • DISPOSITIFS MÉDICAUX", scroll: 'FAITES DÉFILER POUR EXPLORER LES PROJETS' },
    intro: {
      eyebrow: '// INTRODUCTION',
      headlineHTML: "Concevoir des solutions <em>à échelle humaine</em> — là où la <em>précision mécanique</em> rencontre la complexité biologique.",
      body: "Ingénieur biomédical faisant le pont entre les besoins cliniques et l'innovation mécanique. Spécialisé dans les systèmes où l'ingénierie de précision améliore les résultats pour les patients — des dispositifs d'assistance cardiaque aux interfaces neuronales et au-delà.",
    },
    about: {
      eyebrow: '// PROFIL',
      bio: "Étudiant en génie mécanique à la Brigham Young University, spécialisé dans l'intersection du génie mécanique et des applications biomédicales. Conçoit des systèmes où l'ingénierie de précision améliore les résultats pour les patients — du concept à la validation clinique.",
      blueprintTag: 'FICHE DE RÉFÉRENCE ANATOMIQUE — RÉV. 3.1',
      meta: [
        { k: 'ÉTABLISSEMENT', v: 'Brigham Young University' },
        { k: 'DIPLÔME', v: 'Licence en génie mécanique' },
        { k: 'SPÉCIALITÉ', v: 'Génie biomédical' },
        { k: 'LIEU', v: 'Provo, Utah' },
        { k: 'STATUT', v: 'CANDIDAT ACTIF' },
      ],
    },
    spec: {
      eyebrow: '// DOMAINES DE SPÉCIALISATION', titleHTML: 'COMPÉTENCES<br/>CLÉS', count: '10 DISCIPLINES',
      items: ['Systèmes cardiaques & hémodynamique', "Conception d'interfaces neuronales", 'Prothèses & orthèses', 'Ingénierie vasculaire', 'Systèmes de dispositifs respiratoires', 'Biomécanique des exosquelettes', 'Bioélectronique & capteurs', 'Biomécanique computationnelle', "Intégration de l'imagerie médicale", 'Conformité réglementaire FDA'],
    },
    index: {
      titleHTML: 'INDEX DES<br/>TRAVAUX', projectsWord: 'PROJETS', systemsWord: 'SYSTÈMES', revisionsWord: 'RÉVISIONS',
      projectWord: 'PROJET', technicalDiagram: 'SCHÉMA TECHNIQUE', viewSpecs: 'VOIR LES SPÉCS →', endOfIndex: "FIN DE L'INDEX", lastUpdated: 'DERNIÈRE MISE À JOUR',
    },
    projects: [
      { category: 'NEURONAL / IA', title: 'APPRENTISSAGE PROFOND', flow: '94,2% PRÉC.' },
      { category: 'BIOMÉCANIQUE', title: 'COLONNE EXOSQUELETTE', flow: 'RÉPARTITION DES CHARGES' },
      { category: 'AÉROSPATIALE', title: 'ROVER MARTIEN', flow: 'AUTONOMIE 25KM' },
      { category: 'MÉCANIQUE', title: 'ARTICULATION PROTHÉTIQUE', flow: 'AMPLITUDE 150°' },
      { category: 'ROBOTIQUE', title: 'ROBOT AUTONOME', flow: '15 L/MIN' },
      { category: 'CARDIOLOGIE', title: 'STENT VASCULAIRE', flow: 'Ø 3,5MM' },
    ],
  },

  ko: {
    nav: {
      indexOfWorks: '작품 색인', themeDark: '다크 모드', themeLight: '라이트 모드',
      drawer: { home: '홈', intro: '소개', about: '프로필', skills: '역량', index: '작품 색인' },
      pill: { home: '홈', intro: '소개', about: '프로필', skills: '역량', work: '작품' },
    },
    hero: { tagline: '생체의공학 • 전산 생체역학 • 의료기기 포트폴리오', scroll: '스크롤하여 프로젝트 살펴보기' },
    intro: {
      eyebrow: '// 소개',
      headlineHTML: '<em>인간 중심</em>의 솔루션을 설계합니다 — <em>기계적 정밀성</em>이 생물학적 복잡성과 만나는 지점에서.',
      body: '임상적 필요와 기계공학적 혁신 사이를 잇는 생체의공학 엔지니어. 정밀공학이 더 나은 환자 결과를 가능하게 하는 시스템에 집중합니다 — 심장 보조 장치부터 신경 인터페이스, 그 너머까지.',
    },
    about: {
      eyebrow: '// 프로필',
      bio: '브리검영대학교 기계공학 전공 학생으로, 기계공학과 생체의공학 응용의 접점을 전문으로 합니다. 정밀공학이 더 나은 환자 결과를 가능하게 하는 시스템을 개념부터 임상 검증까지 설계합니다.',
      blueprintTag: '해부 참조 시트 — REV 3.1',
      meta: [
        { k: '소속', v: 'Brigham Young University' },
        { k: '학위', v: '기계공학 학사 (B.S.)' },
        { k: '전공', v: '생체의공학' },
        { k: '위치', v: 'Provo, Utah' },
        { k: '상태', v: '재학 중' },
      ],
    },
    spec: {
      eyebrow: '// 전문 분야', titleHTML: '핵심<br/>역량', count: '10개 분야',
      items: ['심장 시스템 & 혈역학', '신경 인터페이스 설계', '의지 & 보조기', '혈관 공학', '호흡기 장치 시스템', '외골격 생체역학', '바이오일렉트로닉스 & 센싱', '전산 생체역학', '의료 영상 통합', 'FDA 규제 준수'],
    },
    index: {
      titleHTML: '작품<br/>색인', projectsWord: '프로젝트', systemsWord: '시스템', revisionsWord: '리비전',
      projectWord: '프로젝트', technicalDiagram: '기술 도면', viewSpecs: '사양 보기 →', endOfIndex: '색인 끝', lastUpdated: '마지막 업데이트',
    },
    projects: [
      { category: '뉴럴 / AI', title: '딥러닝', flow: '94.2% 정확도' },
      { category: '생체역학', title: '외골격 척추', flow: '하중 분산' },
      { category: '항공우주', title: '화성 로버', flow: '주행거리 25KM' },
      { category: '메카닉스', title: '의족 관절', flow: '가동범위 150°' },
      { category: '로보틱스', title: '자율 로봇', flow: '15 L/분' },
      { category: '심장학', title: '혈관 스텐트', flow: 'Ø 3.5MM' },
    ],
  },

  es: {
    nav: {
      indexOfWorks: 'ÍNDICE DE TRABAJOS', themeDark: 'Modo oscuro', themeLight: 'Modo claro',
      drawer: { home: 'INICIO', intro: 'INTRO', about: 'PERFIL', skills: 'APTITUDES', index: 'ÍNDICE DE TRABAJOS' },
      pill: { home: 'INICIO', intro: 'INTRO', about: 'PERFIL', skills: 'APTITUDES', work: 'TRABAJOS' },
    },
    hero: { tagline: 'PORTAFOLIO DE INGENIERÍA BIOMÉDICA • BIOMECÁNICA COMPUTACIONAL • DISPOSITIVOS MÉDICOS', scroll: 'DESPLÁZATE PARA EXPLORAR LOS PROYECTOS' },
    intro: {
      eyebrow: '// INTRODUCCIÓN',
      headlineHTML: 'Diseñar soluciones <em>a escala humana</em> — donde la <em>precisión mecánica</em> se encuentra con la complejidad biológica.',
      body: 'Ingeniero biomédico que tiende puentes entre la necesidad clínica y la innovación mecánica. Centrado en sistemas donde la ingeniería de precisión mejora los resultados de los pacientes: desde dispositivos de asistencia cardíaca hasta interfaces neuronales y más allá.',
    },
    about: {
      eyebrow: '// PERFIL',
      bio: 'Estudiante de Ingeniería Mecánica en la Brigham Young University, especializado en la intersección entre la ingeniería mecánica y las aplicaciones biomédicas. Diseña sistemas donde la ingeniería de precisión mejora los resultados de los pacientes, desde el concepto hasta la validación clínica.',
      blueprintTag: 'FICHA DE REFERENCIA ANATÓMICA — REV. 3.1',
      meta: [
        { k: 'INSTITUCIÓN', v: 'Brigham Young University' },
        { k: 'TITULACIÓN', v: 'Grado en Ingeniería Mecánica' },
        { k: 'ESPECIALIDAD', v: 'Ingeniería Biomédica' },
        { k: 'UBICACIÓN', v: 'Provo, Utah' },
        { k: 'ESTADO', v: 'CANDIDATO ACTIVO' },
      ],
    },
    spec: {
      eyebrow: '// ÁREAS DE ESPECIALIZACIÓN', titleHTML: 'COMPETENCIAS<br/>CLAVE', count: '10 DISCIPLINAS',
      items: ['Sistemas cardíacos y hemodinámica', 'Diseño de interfaces neuronales', 'Prótesis y ortesis', 'Ingeniería vascular', 'Sistemas de dispositivos respiratorios', 'Biomecánica de exoesqueletos', 'Bioelectrónica y sensores', 'Biomecánica computacional', 'Integración de imagen médica', 'Cumplimiento normativo de la FDA'],
    },
    index: {
      titleHTML: 'ÍNDICE DE<br/>TRABAJOS', projectsWord: 'PROYECTOS', systemsWord: 'SISTEMAS', revisionsWord: 'REVISIONES',
      projectWord: 'PROYECTO', technicalDiagram: 'DIAGRAMA TÉCNICO', viewSpecs: 'VER ESPECIF. →', endOfIndex: 'FIN DEL ÍNDICE', lastUpdated: 'ÚLTIMA ACTUALIZACIÓN',
    },
    projects: [
      { category: 'NEURONAL / IA', title: 'APRENDIZAJE PROFUNDO', flow: '94,2% PREC.' },
      { category: 'BIOMECÁNICA', title: 'COLUMNA EXOESQUELETO', flow: 'DISTRIBUCIÓN DE CARGA' },
      { category: 'AEROESPACIAL', title: 'ROVER DE MARTE', flow: 'ALCANCE 25KM' },
      { category: 'MECÁNICA', title: 'ARTICULACIÓN PROTÉSICA', flow: 'RANGO 150°' },
      { category: 'ROBÓTICA', title: 'ROBOT AUTÓNOMO', flow: '15 L/MIN' },
      { category: 'CARDIOLOGÍA', title: 'ESTENT VASCULAR', flow: 'Ø 3,5MM' },
    ],
  },
};
