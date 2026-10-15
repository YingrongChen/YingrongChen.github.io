(() => {
  const canvas = document.querySelector("#knowledge-constellation");
  if (!canvas) return;

  const stage = canvas.closest(".constellation-stage");
  const tooltip = stage.querySelector(".constellation-tooltip");
  const detail = document.querySelector(".constellation-detail");
  const detailTitle = detail.querySelector("strong");
  const detailText = detail.querySelector("span");
  const filterButtons = [...document.querySelectorAll(".constellation-filter")];
  const context = canvas.getContext("2d");
  if (!context) return;

  const clusters = [
    {
      id: "algorithms",
      label: "Quantum algorithms",
      color: "#2dd4d7",
      summary: "Quantum algorithms for simulation, cryptography, state preparation, arithmetic, and resource estimation.",
      nodes: [
        { id: "algorithm-hub", label: "Quantum algorithms", x: 0.24, y: 0.28, radius: 7, hub: true, detail: "Designing and evaluating algorithms for cryptography, chemistry, and simulation." },
        { id: "model-hamiltonian-simulation", label: "Model Hamiltonian simulation", x: 0.5, y: 0.28, radius: 4, color: "#f8fafc", sharedWith: ["physics-math"], detail: "Simulating quantum dynamics for structured model Hamiltonians." },
        { id: "qpe", label: "Phase estimation", x: 0.24, y: 0.1, radius: 4, detail: "Quantum phase estimation implementations and precision-resource tradeoffs." },
        { id: "shor", label: "Shor's algorithm", x: 0.07, y: 0.31, radius: 4, detail: "Fault-tolerant factoring workflows built from modular quantum arithmetic." },
        { id: "block-encoding", label: "Block encoding", x: 0.39, y: 0.17, radius: 4, detail: "Encoding operators into larger unitaries for quantum algorithm primitives." },
        { id: "state-preparation", label: "State preparation", x: 0.1, y: 0.44, radius: 4, detail: "Clifford-efficient preparation of sparse molecular wavefunctions." },
        { id: "quantum-arithmetic", label: "Quantum arithmetic", x: 0.29, y: 0.44, radius: 4, detail: "Reusable Q# implementations of adders, multipliers, and modular arithmetic." },
        { id: "resource-estimation", label: "Resource estimation", x: 0.43, y: 0.29, radius: 4, detail: "Estimating logical qubits, operations, runtime, and error budgets." },
        { id: "quantum-information", label: "Quantum information", x: 0.43, y: 0.41, radius: 4, detail: "Qubits, quantum circuits, measurement, and information processing." },
      ],
      edges: [
        ["algorithm-hub", "model-hamiltonian-simulation"],
        ["algorithm-hub", "qpe"],
        ["algorithm-hub", "shor"],
        ["algorithm-hub", "block-encoding"],
        ["algorithm-hub", "state-preparation"],
        ["algorithm-hub", "quantum-arithmetic"],
        ["algorithm-hub", "resource-estimation"],
        ["algorithm-hub", "quantum-information"],
        ["algorithm-hub", "qsharp"],
        ["algorithm-hub", "cirq"],
        ["algorithm-hub", "complexity-theory"],
      ],
    },
    {
      id: "physics-math",
      label: "Physics & math",
      color: "#b99cff",
      summary: "Quantum mechanics, electrodynamics, density functional theory, linear algebra, numerical analysis, and group theory.",
      nodes: [
        { id: "physics-hub", label: "Physics & math", x: 0.75, y: 0.28, radius: 7, hub: true, detail: "Physical and mathematical foundations for quantum computing and molecular simulation." },
        { id: "molecular-quantum-mechanics", label: "Molecular quantum mechanics", x: 0.61, y: 0.12, radius: 4, detail: "Quantum-mechanical descriptions of molecular electronic structure." },
        { id: "quantum-chemistry", label: "Quantum chemistry", x: 0.78, y: 0.1, radius: 4, detail: "Applying quantum mechanics to chemical systems and their properties." },
        { id: "electrodynamics", label: "Electrodynamics", x: 0.92, y: 0.2, radius: 4, detail: "Electric and magnetic fields, waves, and their dynamics." },
        { id: "density-functional-theory", label: "Density functional theory", x: 0.91, y: 0.35, radius: 4, detail: "Electronic-structure calculations using density-based quantum mechanics." },
        { id: "linear-algebra", label: "Linear algebra", x: 0.61, y: 0.38, radius: 4, detail: "The mathematical language of quantum states, operators, and transformations." },
        { id: "group-theory", label: "Group theory", x: 0.61, y: 0.48, radius: 4, detail: "Symmetry, transformations, and algebraic structure in physics and chemistry." },
        { id: "numerical-analysis", label: "Numerical analysis", x: 0.77, y: 0.46, radius: 4, detail: "Stable and efficient numerical methods for scientific computation." },
      ],
      edges: [
        ["physics-hub", "molecular-quantum-mechanics"],
        ["physics-hub", "quantum-chemistry"],
        ["physics-hub", "electrodynamics"],
        ["physics-hub", "density-functional-theory"],
        ["physics-hub", "linear-algebra"],
        ["physics-hub", "group-theory"],
        ["physics-hub", "numerical-analysis"],
        ["physics-hub", "model-hamiltonian-simulation"],
        ["physics-hub", "molecular-dynamics"],
      ],
    },
    {
      id: "biochemistry",
      label: "Biochemistry",
      color: "#57dfa0",
      summary: "Molecular biology, proteins, biophysical chemistry, neuroscience, and computational molecular modeling.",
      nodes: [
        { id: "biochemistry-hub", label: "Biochemistry", x: 0.75, y: 0.72, radius: 7, hub: true, detail: "Connecting molecular structure, chemical behavior, and biological function." },
        { id: "molecular-biology", label: "Molecular biology", x: 0.61, y: 0.58, radius: 4, detail: "Molecular mechanisms underlying cellular structure and function." },
        { id: "biophysical-chemistry", label: "Biophysical chemistry", x: 0.91, y: 0.59, radius: 4, detail: "Physical chemistry approaches to biological systems." },
        { id: "computational-neuroscience", label: "Computational neuroscience", x: 0.91, y: 0.84, radius: 4, detail: "Computational models for neural systems and information processing." },
        { id: "computational-drug-design", label: "Computational drug design", x: 0.57, y: 0.73, radius: 4, detail: "Computational screening, docking, and molecular design workflows." },
        { id: "bioinformatics", label: "Bioinformatics", x: 0.64, y: 0.91, radius: 4, detail: "Computational analysis of biological sequences, structures, and systems." },
        { id: "molecular-dynamics", label: "Molecular dynamics", x: 0.75, y: 0.5, radius: 4, color: "#f8fafc", sharedWith: ["physics-math"], detail: "Atomistic simulation and structural analysis of molecular systems." },
      ],
      edges: [
        ["biochemistry-hub", "molecular-biology"],
        ["biochemistry-hub", "biophysical-chemistry"],
        ["biochemistry-hub", "computational-neuroscience"],
        ["biochemistry-hub", "computational-drug-design"],
        ["biochemistry-hub", "bioinformatics"],
        ["biochemistry-hub", "molecular-dynamics"],
      ],
    },
    {
      id: "software-engineering",
      label: "Software engineering",
      color: "#ff719d",
      summary: "Software foundations, systems, algorithms, languages, testing, cloud HPC, and production scientific computing.",
      nodes: [
        { id: "software-hub", label: "Software engineering", x: 0.25, y: 0.72, radius: 7, hub: true, detail: "Engineering tested, documented, and reusable software for scientific workflows." },
        { id: "python", label: "Python", x: 0.07, y: 0.61, radius: 4, detail: "Primary language for quantum algorithms, chemistry tooling, and workflow automation." },
        { id: "cpp", label: "C++", x: 0.07, y: 0.8, radius: 4, detail: "High-performance computational chemistry and scientific software." },
        { id: "qsharp", label: "Q#", x: 0.12, y: 0.49, radius: 4, color: "#f8fafc", sharedWith: ["algorithms"], detail: "Quantum algorithm and arithmetic implementation in the Microsoft QDK." },
        { id: "cirq", label: "Cirq", x: 0.25, y: 0.51, radius: 4, color: "#f8fafc", sharedWith: ["algorithms"], detail: "Circuit construction and algorithm experiments, including Shor's algorithm." },
        { id: "complexity-theory", label: "Complexity theory", x: 0.39, y: 0.49, radius: 4, color: "#f8fafc", sharedWith: ["algorithms"], detail: "Computational complexity, algorithmic limits, and resource scaling." },
        { id: "systems-programming", label: "Systems programming", x: 0.2, y: 0.91, radius: 4, detail: "Systems software, memory, processes, and low-level interfaces." },
        { id: "azure-hpc", label: "Azure HPC", x: 0.48, y: 0.59, radius: 4, detail: "Scalable cloud computing for high-throughput scientific workflows." },
        { id: "machine-learning", label: "Machine learning", x: 0.43, y: 0.72, radius: 4, detail: "Learning algorithms and data-driven scientific models." },
        { id: "testing", label: "Testing and CI", x: 0.41, y: 0.89, radius: 4, detail: "Automated validation and delivery for production-quality research software." },
      ],
      edges: [
        ["software-hub", "python"],
        ["software-hub", "cpp"],
        ["software-hub", "qsharp"],
        ["software-hub", "cirq"],
        ["software-hub", "complexity-theory"],
        ["software-hub", "systems-programming"],
        ["software-hub", "azure-hpc"],
        ["software-hub", "machine-learning"],
        ["software-hub", "testing"],
      ],
    },
  ];

  const nodes = [];
  const nodeById = new Map();
  const edges = [];

  clusters.forEach((cluster) => {
    cluster.nodes.forEach((node) => {
      const completeNode = { ...node, cluster: cluster.id, color: node.color || cluster.color };
      nodes.push(completeNode);
      nodeById.set(node.id, completeNode);
    });
    cluster.edges.forEach(([from, to]) => edges.push({ from, to, cluster: cluster.id, color: cluster.color }));
  });

  const clusterById = new Map(clusters.map((cluster) => [cluster.id, cluster]));
  const belongsToCluster = (node, cluster) => node.cluster === cluster || node.sharedWith?.includes(cluster);
  const visibleNodes = () => nodes.filter((node) => activeCluster === "all" || belongsToCluster(node, activeCluster));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const backgroundStars = createStars(95);

  let activeCluster = "all";
  let hoveredNode = null;
  let selectedNode = null;
  let keyboardIndex = 0;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let animationFrame = 0;
  let animationStart = 0;
  let isVisible = false;

  function createStars(count) {
    let seed = 4172;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    return Array.from({ length: count }, () => ({
      x: random(),
      y: random(),
      radius: 0.35 + random() * 1.15,
      alpha: 0.12 + random() * 0.42,
      phase: random() * Math.PI * 2,
      speed: 0.00035 + random() * 0.00055,
    }));
  }

  function resizeCanvas() {
    const bounds = stage.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    draw(performance.now());
  }

  function position(node) {
    return { x: node.x * width, y: node.y * height };
  }

  function isNodeEmphasized(node) {
    return activeCluster === "all" || belongsToCluster(node, activeCluster);
  }

  function draw(time) {
    const entrance = reducedMotion || !animationStart ? 1 : Math.min(1, (time - animationStart) / 1050);
    context.clearRect(0, 0, width, height);

    const backdrop = context.createRadialGradient(width * 0.5, height * 0.48, 0, width * 0.5, height * 0.48, width * 0.65);
    backdrop.addColorStop(0, "#131c31");
    backdrop.addColorStop(0.56, "#0b1222");
    backdrop.addColorStop(1, "#070b14");
    context.fillStyle = backdrop;
    context.fillRect(0, 0, width, height);

    backgroundStars.forEach((star) => {
      const twinkle = reducedMotion ? 0 : Math.sin(time * star.speed + star.phase) * 0.12;
      context.beginPath();
      context.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(235, 241, 250, ${Math.max(0.05, star.alpha + twinkle)})`;
      context.fill();
    });

    edges.forEach((edge) => {
      const fromNode = nodeById.get(edge.from);
      const toNode = nodeById.get(edge.to);
      if (!fromNode || !toNode) return;

      const from = position(fromNode);
      const to = position(toNode);
      const isConnected = hoveredNode && (hoveredNode.id === edge.from || hoveredNode.id === edge.to);
      const isActive = activeCluster === "all" || edge.cluster === activeCluster;
      const lineProgress = Math.max(0, Math.min(1, (entrance - 0.12) / 0.72));

      context.save();
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(from.x + (to.x - from.x) * lineProgress, from.y + (to.y - from.y) * lineProgress);
      context.strokeStyle = edge.color;
      context.globalAlpha = isConnected ? 0.9 : isActive ? 0.28 : 0.035;
      context.lineWidth = isConnected ? 2 : 1;
      context.stroke();
      context.restore();
    });

    nodes.forEach((node) => drawNode(node, time, entrance));

    if (isVisible && !reducedMotion) animationFrame = window.requestAnimationFrame(draw);
  }

  function drawNode(node, time, entrance) {
    const point = position(node);
    const emphasized = isNodeEmphasized(node);
    const interactiveNode = hoveredNode?.id === node.id || selectedNode?.id === node.id;
    const pulse = reducedMotion ? 0 : Math.sin(time * 0.0022 + node.x * 9) * 0.6;
    const radius = (node.radius + pulse + (interactiveNode ? 2 : 0)) * Math.min(1, entrance * 1.6);
    const opacity = emphasized ? 1 : 0.14;

    const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, Math.max(16, radius * 5));
    glow.addColorStop(0, node.color);
    glow.addColorStop(1, "transparent");
    context.save();
    context.globalAlpha = (interactiveNode ? 0.34 : 0.14) * opacity;
    context.fillStyle = glow;
    context.beginPath();
    context.arc(point.x, point.y, Math.max(16, radius * 5), 0, Math.PI * 2);
    context.fill();
    context.restore();

    context.save();
    context.globalAlpha = opacity * Math.min(1, entrance * 2);
    context.beginPath();
    context.arc(point.x, point.y, Math.max(0, radius), 0, Math.PI * 2);
    if (node.hub) {
      context.fillStyle = node.color;
      context.fill();
      context.beginPath();
      context.arc(point.x, point.y, radius + 5, 0, Math.PI * 2);
      context.strokeStyle = node.color;
      context.globalAlpha *= 0.42;
      context.lineWidth = 1.5;
      context.stroke();
    } else {
      context.strokeStyle = node.color;
      context.lineWidth = interactiveNode ? 2.5 : 1.8;
      context.stroke();
    }
    context.restore();

    const showLabel = width >= 620 || node.hub || belongsToCluster(node, activeCluster) || interactiveNode;
    if (!showLabel || entrance < 0.58) return;

    const alignLeft = node.x > 0.77;
    const labelOffset = radius + 7;
    context.save();
    context.font = `${node.hub ? "700" : "500"} ${width < 620 ? 10 : 11}px "DM Sans", sans-serif`;
    context.fillStyle = interactiveNode ? "#ffffff" : "#dbe5f1";
    context.globalAlpha = opacity * Math.min(1, (entrance - 0.58) * 3);
    context.textAlign = alignLeft ? "right" : "left";
    context.textBaseline = "middle";
    context.fillText(node.label, point.x + (alignLeft ? -labelOffset : labelOffset), point.y);
    context.restore();
  }

  function nodeAt(clientX, clientY) {
    const bounds = stage.getBoundingClientRect();
    const pointerX = clientX - bounds.left;
    const pointerY = clientY - bounds.top;
    let closest = null;
    let closestDistance = Infinity;

    visibleNodes().forEach((node) => {
      const point = position(node);
      const distance = Math.hypot(pointerX - point.x, pointerY - point.y);
      if (distance < 19 && distance < closestDistance) {
        closest = node;
        closestDistance = distance;
      }
    });

    return closest;
  }

  function showTooltip(node) {
    if (!node) {
      tooltip.classList.remove("is-visible");
      tooltip.setAttribute("aria-hidden", "true");
      return;
    }

    const point = position(node);
    tooltip.textContent = node.label;
    tooltip.style.left = `${point.x}px`;
    tooltip.style.top = `${point.y}px`;
    tooltip.style.transform = node.x > 0.78 ? "translate(-100%, -145%)" : node.x < 0.2 ? "translate(0, -145%)" : "translate(-50%, -145%)";
    tooltip.classList.add("is-visible");
    tooltip.setAttribute("aria-hidden", "false");
  }

  function setDetail(node) {
    if (node) {
      detail.hidden = false;
      detailTitle.textContent = node.label;
      detailText.textContent = node.detail;
      return;
    }

    const cluster = clusterById.get(activeCluster);
    detail.hidden = !cluster;
    detailTitle.textContent = cluster?.label || "";
    detailText.textContent = cluster?.summary || "";
  }

  function setHovered(node) {
    if (hoveredNode?.id === node?.id) return;
    hoveredNode = node;
    canvas.classList.toggle("is-pointing", Boolean(node));
    showTooltip(node);
    if (node) setDetail(node);
    else setDetail(selectedNode);
    if (reducedMotion || !isVisible) draw(performance.now());
  }

  stage.addEventListener("pointermove", (event) => setHovered(nodeAt(event.clientX, event.clientY)));
  stage.addEventListener("pointerleave", () => setHovered(null));
  stage.addEventListener("click", (event) => {
    const node = nodeAt(event.clientX, event.clientY);
    selectedNode = selectedNode?.id === node?.id ? null : node;
    setDetail(selectedNode);
    if (node) showTooltip(node);
  });

  canvas.addEventListener("keydown", (event) => {
    const availableNodes = visibleNodes();
    if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      const direction = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
      keyboardIndex = (keyboardIndex + direction + availableNodes.length) % availableNodes.length;
      setHovered(availableNodes[keyboardIndex]);
    }

    if ((event.key === "Enter" || event.key === " ") && hoveredNode) {
      event.preventDefault();
      selectedNode = hoveredNode;
      setDetail(selectedNode);
    }

    if (event.key === "Escape") {
      selectedNode = null;
      setHovered(null);
      setDetail(null);
    }
  });

  canvas.addEventListener("blur", () => {
    if (!selectedNode) setHovered(null);
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCluster = button.dataset.cluster;
      selectedNode = null;
      setHovered(null);
      keyboardIndex = 0;
      filterButtons.forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle("is-active", isActive);
        candidate.setAttribute("aria-pressed", String(isActive));
      });
      setDetail(null);
      draw(performance.now());
    });
  });

  const resizeObserver = new ResizeObserver(resizeCanvas);
  resizeCanvas();
  resizeObserver.observe(stage);

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible) {
      if (!animationStart) animationStart = performance.now();
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(draw);
    } else {
      window.cancelAnimationFrame(animationFrame);
    }
  }, { threshold: 0.08 });

  visibilityObserver.observe(stage);
  setDetail(null);
})();