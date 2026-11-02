let network = null;
let isGraphAnimating = false;

function openGraphView() {
  const container = document.getElementById("graph-view-overlay");
  if (!container) return;

  container.style.display = "block";
  setTimeout(() => {
    container.style.opacity = "1";
    if (!network) {
      initGraph();
    }
    if (!isGraphAnimating) {
      isGraphAnimating = true;
      animateGraph();
    }
  }, 50);
}

function closeGraphView() {
  const container = document.getElementById("graph-view-overlay");
  if (!container) return;

  container.style.opacity = "0";
  setTimeout(() => {
    container.style.display = "none";
    isGraphAnimating = false;
  }, 400);
}

function animateGraph() {
  if (!isGraphAnimating || !network) return;
  network.redraw();
  requestAnimationFrame(animateGraph);
}

function initGraph() {
  const container = document.getElementById("graph-network-container");

  // Define nodes
  // Central node (fixed at the center)
  const nodes = new vis.DataSet([
    { id: "center", x: 0, y: 0, fixed: true, label: "Skills & Certs", shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf5dc", size: 65, color: "#ffffff", weight: "bold" }, font: { color: "#ffffff", weight: "bold", size: 16 }, shadow: { enabled: true, color: 'rgba(255,255,255,0.5)', size: 20 } },
    
    // Categories
    { id: "ia", label: "I.A e Dados", shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf544", size: 45, color: "#00f3ff", weight: "bold" }, font: { color: "#00f3ff", weight: "bold" }, shadow: { enabled: true, color: '#00f3ff', size: 15 } },
    { id: "backend", label: "Backend", shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf233", size: 45, color: "#ff003c", weight: "bold" }, font: { color: "#ff003c", weight: "bold" }, shadow: { enabled: true, color: '#ff003c', size: 15 } },
    { id: "frontend", label: "FrontEnd", shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf108", size: 45, color: "#00ff66", weight: "bold" }, font: { color: "#00ff66", weight: "bold" }, shadow: { enabled: true, color: '#00ff66', size: 15 } },
    { id: "hardware", label: "Hardware", shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf2db", size: 45, color: "#bc13fe", weight: "bold" }, font: { color: "#bc13fe", weight: "bold" }, shadow: { enabled: true, color: '#bc13fe', size: 15 } },
    { id: "cyber", label: "Cybersecurity", shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf3ed", size: 45, color: "#ff00a0", weight: "bold" }, font: { color: "#ff00a0", weight: "bold" }, shadow: { enabled: true, color: '#ff00a0', size: 15 } },

    // Certifications (Badges)
    // IA
    { id: "cert1", label: "AI Fundamentals\n(IBM)", group: "ia", hidden: true, shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf091", size: 30, color: "#00f3ff", weight: "bold" }, font: { color: "#00f3ff", size: 12 }, url: "https://www.credly.com/badges/ef2abd7c-8d98-44a6-a6dd-349fe0a470c9/public_url" },
    { id: "cert2", label: "Gemini for Cloud Arch.", group: "ia", hidden: true, shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf091", size: 30, color: "#00f3ff", weight: "bold" }, font: { color: "#00f3ff", size: 12 }, url: "https://www.skills.google/public_profiles/39ad1ca5-987a-4f2f-b077-50f9585590a9/badges/25920933" },
    { id: "cert3", label: "Gemini for App Dev.", group: "ia", hidden: true, shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf091", size: 30, color: "#00f3ff", weight: "bold" }, font: { color: "#00f3ff", size: 12 }, url: "https://www.skills.google/public_profiles/39ad1ca5-987a-4f2f-b077-50f9585590a9/badges/25920911" },
    { id: "cert4", label: "Intro to AI Agents", group: "ia", hidden: true, shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf091", size: 30, color: "#00f3ff", weight: "bold" }, font: { color: "#00f3ff", size: 12 }, url: "https://www.skills.google/public_profiles/39ad1ca5-987a-4f2f-b077-50f9585590a9/badges/25738321" },
    
    // Cybersecurity
    { id: "cert5", label: "Cybersecurity Intro\n(Cisco)", group: "cyber", hidden: true, shape: "icon", icon: { face: "\"Font Awesome 5 Free\"", code: "\uf091", size: 30, color: "#ff00a0", weight: "bold" }, font: { color: "#ff00a0", size: 12 }, url: "https://www.credly.com/badges/fbd124b0-b8b1-4207-99e7-177ed866408e/public_url" },
    
    // Backend
    { id: "cert6", label: "Python Essentials 1\n(Cisco)", group: "backend", hidden: true, shape: "icon", icon: { face: "\"Font Awesome 5 Brands\"", code: "\uf3e2", size: 30, color: "#ff003c", weight: "normal" }, font: { color: "#ff003c", size: 12 }, url: "https://www.credly.com/badges/3e2067e7-dc97-4220-8547-c9f3a28dbb99/public_url" },
  ]);

  // Define edges with glowing colors and specific lengths
  const edges = new vis.DataSet([
    // Arestas principais (do cérebro para as categorias) - mais curtas
    { id: "e1", from: "center", to: "ia", length: 150, color: { color: "rgba(0, 243, 255, 0.4)", highlight: "#00f3ff" } },
    { id: "e2", from: "center", to: "backend", length: 150, color: { color: "rgba(255, 0, 60, 0.4)", highlight: "#ff003c" } },
    { id: "e3", from: "center", to: "frontend", length: 150, color: { color: "rgba(0, 255, 102, 0.4)", highlight: "#00ff66" } },
    { id: "e4", from: "center", to: "hardware", length: 150, color: { color: "rgba(188, 19, 254, 0.4)", highlight: "#bc13fe" } },
    { id: "e5", from: "center", to: "cyber", length: 150, color: { color: "rgba(255, 0, 160, 0.4)", highlight: "#ff00a0" } },

    // Arestas secundárias (da categoria para os certificados) - mais longas para não amontoar
    { id: "e6", from: "ia", to: "cert1", length: 180, hidden: true, color: { color: "rgba(0, 243, 255, 0.2)", highlight: "#00f3ff" } },
    { id: "e7", from: "ia", to: "cert2", length: 180, hidden: true, color: { color: "rgba(0, 243, 255, 0.2)", highlight: "#00f3ff" } },
    { id: "e8", from: "ia", to: "cert3", length: 180, hidden: true, color: { color: "rgba(0, 243, 255, 0.2)", highlight: "#00f3ff" } },
    { id: "e9", from: "ia", to: "cert4", length: 180, hidden: true, color: { color: "rgba(0, 243, 255, 0.2)", highlight: "#00f3ff" } },
    
    { id: "e10", from: "cyber", to: "cert5", length: 180, hidden: true, color: { color: "rgba(255, 0, 160, 0.2)", highlight: "#ff00a0" } },
    { id: "e11", from: "backend", to: "cert6", length: 180, hidden: true, color: { color: "rgba(255, 0, 60, 0.2)", highlight: "#ff003c" } },
  ]);

  const data = { nodes: nodes, edges: edges };
  const options = {
    nodes: {
      font: {
        face: "Syne, sans-serif",
        multi: true,
      },
    },
    edges: {
      smooth: {
        type: "continuous",
        roundness: 0.3
      },
      width: 2,
      shadow: {
        enabled: true,
        color: "rgba(255,255,255,0.2)",
        size: 5,
      }
    },
    physics: {
      stabilization: false,
      solver: "repulsion",
      repulsion: {
        nodeDistance: 250,
        springLength: 150,
        springConstant: 0.05
      }
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
    }
  };

  network = new vis.Network(container, data, options);

  // Animation for "electrical current" flowing through edges
  network.on("afterDrawing", function(ctx) {
    if (!edges || edges.length === 0) return;
    
    const timeVal = Date.now() / 1000; // global time for animation speed
    
    // Only animate edges that are not hidden
    const visibleEdges = edges.get({
      filter: function(item) {
        return item.hidden !== true;
      }
    });

    visibleEdges.forEach(edge => {
      const edgeObj = network.body.edges[edge.id];
      if (!edgeObj || !edgeObj.edgeType || !edgeObj.edgeType.getPoint) return;
      
      const solidColor = edge.color.highlight || "#ffffff"; 
      
      // Draw 3 pulses per edge
      const numPulses = 3;
      for(let i=0; i<numPulses; i++) {
        let edgeOffset = edge.id.charCodeAt(1) * 0.15;
        let t = (timeVal + (i / numPulses) + edgeOffset) % 1;
        t = Math.max(0, Math.min(1, t));
        
        const pt = edgeObj.edgeType.getPoint(t);
        
        // Trail effect for the electric current
        for(let j=0; j<3; j++) {
            let trailT = t - (j * 0.02);
            if (trailT < 0 || trailT > 1) continue;
            const trailPt = edgeObj.edgeType.getPoint(trailT);
            
            const radius = 4 - j;
            ctx.beginPath();
            ctx.arc(trailPt.x, trailPt.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = solidColor;
            ctx.shadowColor = solidColor;
            ctx.shadowBlur = 10;
            ctx.globalAlpha = 1 - (j * 0.3);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;
        
        // Inner bright core
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 5;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }
    });
  });

  let expandedGroups = {};

  network.on("click", function(params) {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      const node = nodes.get(nodeId);
      
      // If it's a certification (has url), open it
      if (node && node.url) {
        window.open(node.url, "_blank");
        return;
      }

      // Check if node has children in the same group
      const childNodes = nodes.get({
        filter: function (item) {
          return item.group === nodeId;
        }
      });

      if (childNodes.length > 0) {
        const isExpanded = !!expandedGroups[nodeId];
        expandedGroups[nodeId] = !isExpanded;
        const newHiddenState = isExpanded;
        
        // Update nodes
        const updates = childNodes.map(child => ({ id: child.id, hidden: newHiddenState }));
        nodes.update(updates);
        
        // Update edges
        const childIds = childNodes.map(c => c.id);
        const childEdges = edges.get({
          filter: function(edge) {
            return childIds.includes(edge.to) || childIds.includes(edge.from);
          }
        });
        const edgeUpdates = childEdges.map(edge => ({ id: edge.id, hidden: newHiddenState }));
        edges.update(edgeUpdates);
      }
    }
  });

  network.on("hoverNode", function (params) {
    container.style.cursor = "pointer";
  });
  
  network.on("blurNode", function (params) {
    container.style.cursor = "default";
  });
}
