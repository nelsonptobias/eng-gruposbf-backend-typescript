import { Counter } from "prom-client";

// Crie um contador
const CounterMetric = new Counter({
    name: 'convert_requests_total',
    help: 'Total number of convert requests',
    labelNames: ['currency'],
  });
   
export default CounterMetric;