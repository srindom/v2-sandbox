const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { registerOtel } = require("@medusajs/medusa");

module.exports = {
  register() {
    const traceExporter = new OTLPTraceExporter({
      url: "https://api.axiom.co/v1/traces", // Axiom API endpoint for trace data
      headers: {
        Authorization: `Bearer ${process.env.AXIOM_TOKEN}`,
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
}
