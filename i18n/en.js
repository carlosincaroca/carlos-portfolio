/* ============================================================
   Project-page copy — ENGLISH (source of truth).
   Other languages live beside this file (ja/de/fr/ko/es.js) and
   mirror this exact shape. Missing keys fall back to English.
   ============================================================ */
window.CASE_UI = window.CASE_UI || {};
window.CASE_CONTENT = window.CASE_CONTENT || {};

window.caseUI = function (lang) {
  return Object.assign({}, window.CASE_UI.en, window.CASE_UI[lang] || {});
};
window.caseCopy = function (lang, key) {
  var en = window.CASE_CONTENT.en[key];
  var l = (window.CASE_CONTENT[lang] || {})[key];
  return l ? Object.assign({}, en, l) : en;
};

window.CASE_UI.en = {
  back: 'BACK TO INDEX', mode: 'Mode', techStack: 'Tech stack', phases: 'Project phases', indexed: 'Indexed',
  specimen: 'Specimen', explode: 'Explode', assemble: 'Assemble', modelView: 'Model View', exitView: 'Exit View',
  dim: 'Dim', view3d: 'View 3D', railAssembly: 'Assembly · Ctrl', railModel: 'Model · Ctrl', railSpecimen: 'Specimen · Ctrl',
  brand: 'ENGINEERING PORTFOLIO', project: 'PROJECT',
};

window.CASE_CONTENT.en = {
  dl: {
    pill: 'Neural / AI · Scientific ML',
    title: ['Physics-informed', 'deep learning.'],
    lead: "Neural networks that have to obey physics, not just fit data. I've used them to resolve fluid flow under the Navier–Stokes equations, pull unknown coefficients out of a PDE, uncover the hidden dynamics of a nonlinear oscillator, and learn the forces between interacting particles. Then I turned them on the human arm to cancel tremor.",
    statusLabel: 'Physics-informed', statusSub: 'PDEs, dynamics, control',
    metrics: [['Architectures', '9'], ['Flow super-res', '30×'], ['Latent space', '128-D'], ['Framework', 'PyTorch']],
    modes: {
      fluids: { label: 'Fluids', title: 'Fluids & PDEs',
        desc: "Physics-informed networks trained on the governing equations, not just labeled answers. I solved the viscous Burgers' equation as it steepens into a shock, ran it in reverse to recover the equation's unknown coefficients from data, and super-resolved a coarse 14×9 flow field to 77×49 by enforcing incompressible Navier–Stokes on a curvilinear grid.",
        items: ["Burgers' equation, forward & inverse", 'Navier–Stokes super-resolution', 'Curvilinear-grid physics loss'] },
      dynamics: { label: 'Dynamics', title: 'Dynamics',
        desc: 'Networks that learn how systems move: a damped spring-mass system from its equation of motion; a double-well oscillator hidden inside 128-dimensional measurements, recovered with an autoencoder and a neural ODE; a 7-state system made linear in a learned Koopman space; real weather data forecast with a neural ODE; and a graph network that learns the forces between four spring-coupled particles, then simulates their motion.',
        items: ['Neural ODEs + autoencoders', 'Neural Koopman operators', 'Graph networks for Newtonian physics'] },
      tremor: { label: 'Tremor', title: 'Tremor control',
        desc: "A physics-informed network that predicts the wrist torque needed to cancel tremor in any arm posture. It reads the arm's inertia, damping, and stiffness from my lab's 7-joint arm model and is trained on how much tremor survives the correction. In simulation it cut tremor 85% on average across seven everyday postures, for both Parkinsonian and essential tremor, and up to 95% in the best posture.",
        items: ['Posture-aware torque prediction', 'Frequency-domain physics loss', 'Explicit physics beat V2 by 9–16 pts'] },
    },
    stackText: 'Built in PyTorch, starting from backpropagation written by hand in NumPy.',
    stack: ['PyTorch', 'torchdiffeq', 'PyTorch Geometric', 'NumPy / SciPy', 'Apple MPS'],
    fig: ['Neural architecture', 'Physics-informed loss'],
    phases: [
      { name: 'Foundations', detail: 'Neural networks and backpropagation written from scratch in NumPy.', status: 'COMPLETE' },
      { name: 'Physics-informed models', detail: 'PDE solvers, neural ODEs, Koopman operators, convolutional and graph networks.', status: 'COMPLETE' },
      { name: 'Tremor controller', detail: 'Three versions; making the physics explicit in V3 lifted suppression by 9–16 points.', status: 'COMPLETE' },
    ],
  },

  neuro: {
    pill: 'Neuromechanics / Upper-Limb Tremor',
    title: ['Upper-limb', 'tremor model.'],
    lead: 'A model of the human arm that traces how tremor travels from the muscles to the hand. I helped expand it to the whole upper limb, rewrote its simulation to run in hours instead of a week, and am using it to study how tremor changes when the limb itself changes.',
    statusLabel: 'Ongoing research', statusSub: 'Paper in preparation',
    metrics: [['Muscles', '50'], ['Joints', '7'], ['Speedup', '85×'], ['Sim data', '3×']],
    modes: {
      mechanical: { label: 'Model', title: 'Model',
        desc: 'Treats the arm the way robotics treats a manipulator. Muscle activation dynamics, limb mechanical properties, and joint kinematics combine to show which traits of the body govern tremor intensity.',
        items: ['50-muscle upper-limb model', 'Robotics-based limb dynamics', 'Custom MATLAB model'] },
      clinical: { label: 'Simulation', title: 'Simulation',
        desc: 'Rewrote the simulation code, taking a run from 170 hours to 2. Parameter sweeps that took a week now run the same day.',
        items: ['170 h → 2 h per run', 'Large parameter sweeps', '3× more simulation data'] },
    },
    stackText: 'Custom MATLAB model built on robot dynamics, with statistical analysis of what drives tremor intensity.',
    stack: ['MATLAB', 'Robot dynamics', 'Musculoskeletal modeling', 'Statistical analysis', 'Parameter sweeps'],
    fig: ['Tremor propagation', 'Muscle → joint → hand'],
    phases: [
      { name: 'Model expansion', detail: 'Helped grow the model from 15 to 50 muscles for complete upper-limb analysis.', status: 'COMPLETE' },
      { name: 'Simulation rewrite', detail: 'Rewrote the simulation code, cutting runtime 85× (170 h → 2 h).', status: 'COMPLETE' },
      { name: 'Current research', detail: 'How tremor changes when the limb itself changes, through suppression or daily activity. Paper in preparation.', status: 'ACTIVE' },
    ],
  },

  mars: {
    pill: 'Mars Rover · Robotic Arm',
    title: ['Rover robotic', 'arm.'],
    lead: "Two seasons on the BYU Mars Rover Team's mechanical subteam. I led the mechanical redesign of the arm joints and operated the arm during the retrieval and delivery mission at the University Rover Challenge.",
    statusLabel: 'Two competition seasons', statusSub: '2024–25 · 2025–26',
    metrics: [['Place', '4th'], ['Teams', '114'], ['Countries', '15'], ['Year', '2025']],
    modes: {
      manipulation: { label: 'Design', title: 'Design',
        desc: 'Designed joint housings and led the mechanical redesign of the arm, using finite element analysis to check von Mises stresses and make sure parts hold up under operating loads.',
        items: ['Joint housing design', 'Arm mechanical redesign', 'FEA stress checks (von Mises)'] },
      sampling: { label: 'Operation', title: 'Operation',
        desc: 'Operated the arm during the retrieval and delivery mission, where tasks demand precise, real-time control.',
        items: ['Arm operator at URC', 'Retrieval & delivery mission', 'Real-time precision control'] },
    },
    stackText: "Led the team's move to a cloud-based CAD platform and helped new members get up to speed on workflows, resources, and the engineering behind the rover.",
    stack: ['Onshape', 'Finite element analysis', 'Mechanical design', 'Teleoperation', 'Mentoring'],
    fig: ['Kinematic diagram', '6-DOF reach envelope'],
    models: { rover: 'Rover', arm: 'Arm' },
    phases: [
      { name: 'Arm redesign', detail: 'Led the mechanical redesign of the arm joints; designed joint housings and checked them with FEA.', status: 'COMPLETE' },
      { name: 'URC 2025', detail: 'Operated the arm at the University Rover Challenge. The team placed 4th of 114 teams from 15 countries.', status: 'COMPLETE' },
      { name: 'Cloud CAD + mentoring', detail: "Led the team's move to cloud-based CAD and mentored new members on integration.", status: 'COMPLETE' },
    ],
  },

  hexapod: {
    pill: 'Robotics / Legged Locomotion',
    title: ['18-DOF', 'hexapod', 'robot.'],
    lead: 'A six-legged walking robot built by a team of four that I led. I designed and assembled its custom parts, synchronized its motors from one Arduino, and refined how it walks across a series of prototypes.',
    statusLabel: 'Completed', statusSub: 'May 2024 – Jun 2025',
    metrics: [['Legs', '6'], ['Motors', '18'], ['Parts', '38'], ['Prototypes', '5']],
    modes: {
      locomotion: { label: 'Locomotion', title: 'Locomotion',
        desc: 'Inverse kinematics for smooth, precise leg motion, with dynamic simulations used to refine leg trajectories across five prototypes. Coilover shocks on each leg absorb impact and improve stability.',
        items: ['Per-leg inverse kinematics', 'Simulated leg trajectories', 'Coilover shock suspension'] },
      electronics: { label: 'Control', title: 'Control',
        desc: '18 motors synchronized from an Arduino R4, driven live from a wireless iPad interface I built.',
        items: ['UNO R4 + PCA9685 PWM driver', 'Synchronized 18-motor gait control', 'Wireless iPad interface'] },
    },
    stackText: 'Arduino UNO R4 commanding 18 servos via a PCA9685 16-channel PWM driver. Buck-converted LiPo power for the servo rail, full CAD assembly in Onshape.',
    stack: ['Arduino UNO R4', 'PCA9685 PWM', '18× servo', 'Buck + LiPo', 'Onshape CAD'],
    fig: ['Assembly diagram', 'Leg kinematics'],
    phases: [
      { name: 'Design & build', detail: '38 custom components designed and assembled in Onshape; 18 motors integrated.', status: 'COMPLETE' },
      { name: 'Five prototypes', detail: 'Leg trajectories refined with dynamic simulation and inverse kinematics across five versions.', status: 'COMPLETE' },
      { name: 'Remote control', detail: 'Wireless iPad interface for real-time operation.', status: 'COMPLETE' },
    ],
  },

  auto: {
    pill: 'Robotics / Autonomous Systems',
    title: ['Autonomous', 'course robot.'],
    lead: "A robot that runs an obstacle course on its own, using sensor data to complete tasks along the way. I led the hardware design and wrote the master control code that merged my teammates' task programs into one.",
    statusLabel: 'Completed', statusSub: 'Jan – Apr 2025',
    metrics: [['Iterations', '4'], ['Controller', 'PIC'], ['Code', 'C'], ['Parts', '3D-printed']],
    modes: {
      hardware: { label: 'Hardware', title: 'Hardware',
        desc: '3D-printed parts integrated with stock motors, sensors, and wheels. The final design handled sharp turns, servo-based retrieval and delivery, laser pointing to coordinates, and variable speeds without losing maneuverability.',
        items: ['3D-printed components', 'Servo retrieval & delivery', 'Laser pointing to coordinates'] },
      control: { label: 'Control', title: 'Control',
        desc: "Master control code in C on a PIC microcontroller, combining each teammate's task program into one unified program with smooth hand-offs between line following, IR detection, wall avoidance, and data transmission.",
        items: ['C on a PIC microcontroller', 'Unified master program', 'Line following · IR · wall avoidance'] },
    },
    stackText: 'Early versions each tested one task and struggled as a whole. By the fourth, hardware and code were designed together, and the robot ran the course in roughly half the time of other entries. That was an informal comparison, not a measured one.',
    stack: ['PIC microcontroller', 'Embedded C', '3D printing', 'IR sensing', 'Servo actuation'],
    fig: ['Assembly diagram', 'Mechanical system'],
    phases: [
      { name: 'Single-task prototypes', detail: 'Early versions tested specific tasks (line following, retrieval) but struggled as a whole.', status: 'COMPLETE' },
      { name: 'Integrated hardware', detail: 'The final design supported every required task, built to work hand in hand with the control code.', status: 'COMPLETE' },
      { name: 'Master control code', detail: "Merged teammates' task programs into one program that ran the full course autonomously.", status: 'COMPLETE' },
    ],
  },

  sip: {
    title: ['SIP hydration', 'tracker.'],
    lead: 'An early-stage startup building a hydration tracker that fits most water bottles. As co-founder and lead mechanical engineer, I lead the mechanical design and the cross-functional product and mechatronics decisions.',
    statusLabel: 'Early stage', statusSub: 'Since Sep 2025',
    metrics: [['Team', '11'], ['Interviews', '50+'], ['Waitlist', '30+'], ['LOIs', '2']],
    modes: {
      a: { label: 'Product', title: 'Product',
        desc: 'A tracker designed to fit most water bottles. I own the mechanical design in CAD and help drive product and mechatronics decisions across the team.',
        items: ['Fits most water bottles', 'Mechanical design (CAD)', 'Mechatronics decisions'] },
      b: { label: 'Venture', title: 'Venture',
        desc: "Recruited and lead a team of engineering and business students across two sub-teams, coordinating engineering and go-to-market every week. Pitched the venture to investors in BYU's ENT 401.",
        items: ['2 sub-teams, eng + business', 'Weekly eng / go-to-market sync', 'Investor pitch (ENT 401)'] },
    },
    stackText: 'Mechanical design, mechatronics, and market validation running side by side.',
    stack: ['CAD', 'Mechatronics', 'Customer discovery', 'Team leadership', 'Investor pitching'],
    phases: [
      { name: 'Team formed', detail: 'Recruited engineering and business students into two sub-teams.', status: 'COMPLETE' },
      { name: 'Market validation', detail: 'Customer interviews, a waitlist, and inbound letters of intent from ads.', status: 'COMPLETE' },
      { name: 'Product design', detail: 'Mechanical design of the tracker in CAD.', status: 'ACTIVE' },
    ],
  },

  struct: {
    pill: 'Structural Dynamics / Damping',
    title: ['Trapped-powder', 'dampers.'],
    lead: '3D-printed metal parts (made by laser powder-bed fusion, LPBF) can hide pockets of unfused powder that damp vibration. I built Abaqus models that predict that damping, treating the powder as an anisotropic viscoelastic material, and compared them against measured damping. The work is part of a conference paper submitted to IMAC.',
    statusLabel: 'IMAC short paper', paperLink: 'Read the paper ↗',
    metrics: [['Specimens', '3'], ['Material', '316L'], ['Solver', 'Abaqus'], ['Partners', 'DE · UK']],
    specimens: {
      beam: { label: 'Beam', tag: 'Calibration case', title: 'Powder-pocket beam',
        desc: "LPBF 316L beams with 1 mm pockets of trapped powder in different sizes. The powder's viscoelastic properties were calibrated on beams like these.",
        items: ['316L steel, LPBF', '1 mm powder pockets', 'Material calibration'] },
      fork: { label: 'Fork', tag: 'Out-of-sample test', title: 'Tuning fork',
        desc: 'Tuning forks with 2 mm chamfered pockets: a harder test of whether beam-calibrated properties carry over to a new shape. Impact modal testing gave the measured damping to compare against.',
        items: ['2 mm chamfered pockets', 'Impact modal testing', 'New-geometry test'] },
      gear: { label: 'Gear', tag: 'Real component', title: 'LPBF gear',
        desc: 'An LPBF gear with powder in its teeth, the step from test specimens to a real component. My gear models reached 95.6% damping-ratio prediction accuracy (not included in the IMAC paper).',
        items: ['Powder-filled teeth', '95.6% damping-ratio accuracy', 'Complex geometry'] },
    },
    stackText: 'Abaqus models using the complex-stiffness method, checked against impact-test measurements. The 3D viewer on this page shows mode shapes of the three specimen types for illustration.',
    stack: ['Abaqus FEA', 'Viscoelastic modeling', 'Complex frequency analysis', 'Modal testing', 'LPBF 316L'],
    fig: ['Modal energy damping', 'Strain + kinetic energy'],
    phases: [
      { name: 'Damping models', detail: 'Abaqus models of LPBF parts with anisotropic, viscoelastic powder properties.', status: 'COMPLETE' },
      { name: 'Collaboration', detail: 'Coordinated partners in Germany and the UK to extend the analysis to more LPBF geometries and verify model accuracy.', status: 'COMPLETE' },
      { name: 'IMAC paper', detail: 'Co-author, "Applying a Viscoelastic Model to Multiple Unique Additively-Manufactured Trapped-Powder Dampers."', status: 'SUBMITTED' },
    ],
  },
};
