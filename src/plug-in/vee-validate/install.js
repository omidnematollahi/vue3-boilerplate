import { configure, defineRule } from 'vee-validate';
import allRules from '@/plug-in/vee-validate/rules.js';

const messageGenerator = ({ rule }) => {
  return rule;
};

const setupRules = (rules) => {
  Object.entries(rules).forEach(([ruleName, validator]) => {
    defineRule(ruleName, validator);
  });
};

const DEFAULT_CONFIG = Object.freeze({
  generateMessage: messageGenerator,
});

export default (_, userConfig) => {
  setupRules(allRules);

  const config = { ...DEFAULT_CONFIG, ...userConfig };
  configure(config);
};
