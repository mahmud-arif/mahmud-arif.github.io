// Annotated OpenObserve screenshots for the Monitoring showcase.
// Images live in public/<image>. Each callout's box is a percentage of the
// image (x/y = top-left corner), so it scales with the screenshot.

export interface CalloutBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Callout {
  title: string;
  body: string;
  box: CalloutBox;
}

// An edge of a traffic graph in the screenshot, animated as moving dots.
// `d` is an SVG path in image pixels; `dur` is seconds per trip.
export interface Flow {
  label: string;
  kind: "http" | "tcp";
  d: string;
  dur: number;
  dots: number;
}

export interface MonitoringShot {
  id: string;
  image: string;
  // Image size in pixels, needed to place `flows` over it.
  size?: { w: number; h: number };
  flows?: Flow[];
  dashboard: string;
  tab: string;
  label: string;
  question: string;
  callouts: Callout[];
  built: string[];
}

export const monitoringShots: MonitoringShot[] = [
  {
    id: "platform",
    image: "monitoring/platform-overview.png",
    dashboard: "Platform Health",
    tab: "Overview",
    label: "Cluster health",
    question: "Is the EKS cluster healthy right now, and where is the pressure building?",
    callouts: [
      {
        title: "Cluster at a glance",
        body: "Nodes, running and failing pods, restarts, Gateway traffic, and 5xx split into app errors vs Envoy errors. The first thing on-call reads.",
        box: { x: 1.2, y: 18.2, w: 97.8, h: 16.7 },
      },
      {
        title: "Node CPU & memory vs allocatable",
        body: "Kubelet and host metrics collected by the OpenTelemetry agent running on every node.",
        box: { x: 1.2, y: 35.8, w: 97.8, h: 30.8 },
      },
      {
        title: "Pods by phase",
        body: "A rise in Pending pods exposes scheduling or capacity problems before users feel them.",
        box: { x: 1.2, y: 67.7, w: 48.5, h: 30.8 },
      },
      {
        title: "Top 10 pods by memory",
        body: "Candidates for right-sizing limits; pairs with the 'memory over 90% of limit' alert.",
        box: { x: 50.4, y: 67.7, w: 48.6, h: 30.8 },
      },
    ],
    built: [
      "OTel agent DaemonSet (kubeletstats, hostmetrics)",
      "kube-state-metrics + node-label allowlist",
      "Dashboard generated in Python, applied with OpenTofu",
    ],
  },
  {
    id: "karpenter",
    image: "monitoring/nodes-karpenter.png",
    dashboard: "Platform Health",
    tab: "Nodes & Karpenter",
    label: "Autoscaling",
    question: "Is Karpenter scaling the right nodes, and are we paying for idle capacity?",
    callouts: [
      {
        title: "NodePool CPU & memory vs limit",
        body: "How close each NodePool (Graviton arm64 and x86 fallback) is to its cap, so a hard ceiling never surprises a deploy.",
        box: { x: 1.2, y: 15.0, w: 97.8, h: 17.0 },
      },
      {
        title: "Karpenter activity",
        body: "Nodes launched and disrupted, pods waiting for a node, and AWS errors: the autoscaler's decisions, visible.",
        box: { x: 1.2, y: 32.8, w: 97.8, h: 13.9 },
      },
      {
        title: "Pods per node & start time (p90)",
        body: "How densely pods are packed onto nodes, and how long a pod waits for a fresh node: the real cost of scaling up.",
        box: { x: 1.2, y: 47.5, w: 97.8, h: 25.8 },
      },
      {
        title: "Launches & disruptions",
        body: "Node launches per NodePool and disruptions by reason (empty, underutilized, drift, spot), to confirm cost savings aren't costing stability.",
        box: { x: 1.2, y: 74.1, w: 97.8, h: 25.7 },
      },
    ],
    built: [
      "Graviton (arm64) NodePool first, x86 fallback",
      "Spot-first in dev, on-demand in stage/prod",
      "Karpenter's 18k-series instance catalog dropped at scrape",
    ],
  },
  {
    id: "service-map",
    image: "monitoring/service-map.png",
    size: { w: 2672, h: 4158 },
    // Traced over the Mesh traffic graph; faster, denser dots on busier edges.
    flows: [
      { label: "internet → gateway", kind: "http", d: "M388,1305 Q600,1270 800,1308", dur: 2.8, dots: 2 },
      { label: "gateway → booking-engine-go", kind: "http", d: "M868,1280 C920,1200 1060,1040 1292,900", dur: 3.2, dots: 2 },
      { label: "gateway → keycloak", kind: "http", d: "M876,1315 C1000,1315 1180,1340 1288,1388", dur: 3.6, dots: 1 },
      { label: "gateway → argocd-server", kind: "http", d: "M910,1360 C1050,1460 1200,1580 1292,1720", dur: 3.6, dots: 1 },
      { label: "booking-engine-go → valkey", kind: "tcp", d: "M1323,912 L1325,988", dur: 1.2, dots: 1 },
      { label: "booking-engine-go → fx-exchangerate", kind: "tcp", d: "M1355,882 C1500,895 1650,955 1775,1038", dur: 3.0, dots: 1 },
      { label: "booking-engine-go → supplier-esimgo", kind: "tcp", d: "M1350,898 C1500,960 1660,1080 1778,1200", dur: 2.4, dots: 2 },
      { label: "booking-engine-go → rds-postgres", kind: "tcp", d: "M1350,900 C1500,1000 1680,1170 1782,1365", dur: 1.6, dots: 4 },
      { label: "booking-engine-go → keycloak", kind: "tcp", d: "M1380,1000 C1440,1100 1410,1240 1325,1342", dur: 3.2, dots: 1 },
      { label: "keycloak → rds-postgres", kind: "tcp", d: "M1360,1392 C1500,1365 1650,1365 1775,1395", dur: 2.6, dots: 1 },
      { label: "keycloak → unknown", kind: "http", d: "M1420,1408 C1550,1450 1680,1500 1775,1555", dur: 3.6, dots: 1 },
      { label: "apps → o2c-gateway-collector", kind: "tcp", d: "M1315,1120 C1300,1420 1200,1820 1095,2050", dur: 4.0, dots: 1 },
      { label: "keycloak → o2c-gateway-collector", kind: "tcp", d: "M1300,1530 C1260,1770 1180,1920 1105,2050", dur: 4.0, dots: 1 },
    ],
    dashboard: "Service Map",
    tab: "Map",
    label: "Service mesh",
    question: "Who talks to whom inside the mesh, and which hop is failing?",
    callouts: [
      {
        title: "Mesh at a glance",
        body: "Gateway traffic, 5xx split into app errors vs Envoy errors, p95 latency, and the share of TCP bytes encrypted with mTLS.",
        box: { x: 1.2, y: 8.25, w: 97.7, h: 7.75 },
      },
      {
        title: "Mesh traffic graph",
        body: "Internet → Istio Gateway → services → external dependencies (RDS, supplier APIs), grouped by namespace. Edges are coloured by 5xx rate and marked mTLS or plain text.",
        box: { x: 1.2, y: 16.5, w: 97.7, h: 38.65 },
      },
      {
        title: "Services: health",
        body: "Requests/s, 5xx/s and 5xx % for every service in the mesh, side by side.",
        box: { x: 1.2, y: 55.65, w: 48.5, h: 14.25 },
      },
      {
        title: "Calls between services",
        body: "Each source → destination edge with its own rate and errors, which pinpoints the failing hop.",
        box: { x: 50.4, y: 55.65, w: 48.5, h: 14.25 },
      },
      {
        title: "TCP connections (ztunnel)",
        body: "L4 view for traffic Istio can't see as HTTP (Postgres, Valkey), with throughput and how much of it is mTLS.",
        box: { x: 1.2, y: 70.4, w: 97.7, h: 14.2 },
      },
      {
        title: "Requests/s & p95 latency per call",
        body: "Rate and tail latency for each Gateway → service route over time, so a slow route stands out from the rest.",
        box: { x: 1.2, y: 85.15, w: 97.7, h: 14.2 },
      },
    ],
    built: [
      "Istio ambient (ztunnel + waypoints), Gateway API",
      "istio_requests_total / istio_tcp_* metrics",
      "Custom graph panel built by the dashboard generator",
    ],
  },
  {
    id: "reliability",
    image: "monitoring/reliability.png",
    dashboard: "Reliability",
    tab: "SLOs & Alerts",
    label: "Reliability",
    question: "Are we keeping our promise to users, and will someone be told the moment we aren't?",
    callouts: [
      {
        title: "SLO status at a glance",
        body: "5 SLOs over a 30-day window: 4 meeting target, 1 budget blown, none at risk or without data.",
        box: { x: 18.0, y: 6.75, w: 81.2, h: 2.6 },
      },
      {
        title: "An SLO doing its job",
        body: "booking-engine-go availability is 99.478% against a 99.5% target. Its error budget is spent (−4.4%), the signal to put reliability work ahead of features.",
        box: { x: 17.25, y: 11.64, w: 70.75, h: 2.15 },
      },
      {
        title: "21 platform alerts",
        body: "Crash-looping pods, unavailable replicas, full disks, Gateway 5xx, istiod down, mesh certificate expiry, Karpenter failures… P1 pages on-call, P3 warns. All 21 active, none failing.",
        box: { x: 17.1, y: 38.6, w: 82.8, h: 24.0 },
      },
      {
        title: "Burn-rate alerts per SLO",
        body: "Two alerts per SLO: burn:page (P1) when the budget burns 14.4× too fast, burn:ticket (P3) at 6×. Valkey is covered too, through its readiness SLO.",
        box: { x: 17.1, y: 77.1, w: 82.8, h: 22.2 },
      },
      {
        title: "Defined as code",
        body: "Both folders, Crown Routes Platform and Crown Routes SLOs, are created by OpenTofu, never clicked together in the UI. Changes land on stage first, then prod.",
        box: { x: 0.5, y: 37.25, w: 16.0, h: 4.25 },
      },
    ],
    built: [
      "SLOs & alerts as code (OpenTofu), stage → prod branches",
      "Targets: 99.5% availability, 95% < 500 ms, 99.9% readiness",
      "Multi-window burn-rate alerts (14.4× page, 6× ticket)",
    ],
  },
  {
    id: "troubleshooting",
    image: "monitoring/troubleshooting-gateway.png",
    dashboard: "Troubleshooting",
    tab: "Gateway: requests from the internet",
    label: "Incident triage",
    question: "A user says it's broken. What failed, where, and why?",
    callouts: [
      {
        title: "Gateway right now",
        body: "Traffic, 5xx from apps vs from Envoy, 4xx, p95 latency and ready Gateway pods. Answers 'is it us?' in seconds.",
        box: { x: 1.2, y: 7.75, w: 97.7, h: 7.25 },
      },
      {
        title: "5xx by service and source",
        body: "Separates application errors from proxy-level failures, so the right team gets the incident.",
        box: { x: 1.2, y: 15.5, w: 48.5, h: 13.3 },
      },
      {
        title: "Latency: p50 / p95 / p99 and by service",
        body: "A p99 spike to ~8 s around 11:05 while p95 stays flat: a handful of slow requests, not a slow platform.",
        box: { x: 1.2, y: 29.25, w: 97.7, h: 13.3 },
      },
      {
        title: "Slowest endpoints",
        body: "Explains that spike: one long-lived Argo CD streaming call (6.3 s), not a user-facing API. Found in one click instead of digging through logs.",
        box: { x: 1.2, y: 43.05, w: 48.5, h: 14.9 },
      },
      {
        title: "Unrouted requests (404 NR)",
        body: "Requests that matched no HTTPRoute: catches routing mistakes right after a deploy, and scanners probing hostnames.",
        box: { x: 1.2, y: 58.35, w: 48.5, h: 14.9 },
      },
      {
        title: "The edge proxy itself",
        body: "CPU, memory and restarts of the Istio Gateway pods: ~50 MB and no restarts, so the front door isn't the problem.",
        box: { x: 1.2, y: 87.45, w: 97.7, h: 11.8 },
      },
    ],
    built: [
      "Istio Gateway JSON access log → searchable columns (OTTL)",
      "Severity derived from HTTP status",
      "Envoy response flags explain each 5xx",
    ],
  },
  {
    id: "traces",
    image: "monitoring/traces.png",
    dashboard: "Traces",
    tab: "Overview",
    label: "Distributed tracing",
    question: "Why was this request slow, and which service added the time?",
    callouts: [
      {
        title: "Traces at a glance",
        body: "Span volume, error spans and latency for every service in one place.",
        box: { x: 1, y: 8, w: 98, h: 16 },
      },
      {
        title: "Who calls whom (from traces)",
        body: "Dependencies discovered from real requests, not from a diagram someone drew.",
        box: { x: 1, y: 26, w: 48, h: 36 },
      },
      {
        title: "p95 / p99 span duration by service",
        body: "Tail latency per service, to find the hop that makes a request slow.",
        box: { x: 51, y: 26, w: 48, h: 36 },
      },
      {
        title: "Error & slowest spans",
        body: "Open a span to see the full trace, and the log lines that share its trace_id.",
        box: { x: 1, y: 64, w: 98, h: 34 },
      },
    ],
    built: [
      "Istio Gateway starts every trace; apps continue via traceparent",
      "OTel Operator auto-instrumentation (100% dev, 25% stage/prod)",
      "Logs ↔ traces linked by trace_id",
    ],
  },
  {
    id: "node-details",
    image: "monitoring/node-details.png",
    dashboard: "Platform Health",
    tab: "Node details",
    label: "Node capacity",
    question: "What is each node, and what is actually filling it up?",
    callouts: [
      {
        title: "Node inventory",
        body: "Every node with its NodePool, spot or on-demand, instance type and zone: Graviton spot (c9g.large) from Karpenter for apps, an on-demand m7g.large node group for add-ons.",
        box: { x: 1.15, y: 12.0, w: 97.7, h: 24.25 },
      },
      {
        title: "CPU & memory allocation",
        body: "Where the node's capacity goes: system reserved, DaemonSets, pods, free. CPU is 68% free while memory is 82% used, so memory decides when this node is full.",
        box: { x: 1.15, y: 36.8, w: 97.7, h: 23.2 },
      },
      {
        title: "Pod slots & ephemeral storage",
        body: "10 of 110 pod slots used and 88% of disk free: pod density and disk aren't the constraint here.",
        box: { x: 1.15, y: 61.5, w: 97.7, h: 20.5 },
      },
      {
        title: "Used vs requested vs allocatable",
        body: "Memory in use (~2.2 GB of 2.7 GB) is far above what workloads request (844 MB). That gap is a right-sizing signal: the scheduler sees room the node doesn't really have.",
        box: { x: 1.15, y: 82.5, w: 97.7, h: 17.0 },
      },
    ],
    built: [
      "kube-state-metrics node labels (NodePool, capacity type, instance type, zone)",
      "Kubelet stats from the OTel agent",
      "Capacity donuts built by the dashboard generator",
    ],
  },
];
