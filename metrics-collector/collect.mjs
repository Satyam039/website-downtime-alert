import axios from "axios";

const PROM_URL = "http://localhost:9090/api/v1/query";

async function query(promql) {
  const res = await axios.get(PROM_URL, {
    params: { query: promql },
  });
  return Number(res.data.data.result[0].value[1]);
}

(async () => {
  const cpu = await query(`
100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
  `);

  const memory = await query(`
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100
  `);

  const disk = await query(`
100 - (node_filesystem_free_bytes{mountpoint="/"}
/ node_filesystem_size_bytes{mountpoint="/"}) * 100
  `);

  
  await fetch("http://localhost:4000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      website: "3.111.252.227",
      cpu: Math.round(cpu),
      memory: Math.round(memory),
      disk: Math.round(disk),
    }),
  });

  console.log("✅ Metrics sent to AI");
})();
