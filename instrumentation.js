const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { registerOtel } = require("@medusajs/medusa");

export function register() {
  const traceExporter = new OTLPTraceExporter({
    url: "https://api.axiom.co/v1/traces", // Axiom API endpoint for trace data
    headers: {
      "Authorization": "Bearer xaat-ec4810cf-5578-449b-8663-682acc052a3d",
      "X-Axiom-Dataset": "seb-test", // Replace $DATASET with your dataset
    },
  });

  registerOtel({
    serviceName: "medusajs",
    exporter: traceExporter,
    instrumentation: {
      http: true,
      workflows: true,
    },
  });
}
