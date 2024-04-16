const componentSourceMap = import.meta.globEager(
  ['@/components/common/**/*.component.vue'],
  { import: 'default' }
);

const componentSourceList = Object.keys(componentSourceMap);

/**
 * Determine the component name by it's source path
 * @param {string} source
 * @param {Object} config
 * @param {Object} [config.direction="backward"] - (forward) root-(nestedDirectory)*-fileName | (backward) fileName-(nestedDirectory)*-root
 * @returns {string} - component name from source using direction
 */
const getComponentNameByPath = (source, { direction = 'backward' }) => {
  const sourceSegments = source.split('/');
  const fileName = sourceSegments.pop().replace(/\.(.*)/, '');

  const isBackward = direction === 'backward';

  if (isBackward) {
    sourceSegments.reverse();
  }

  const kebabCaseDirectories = sourceSegments.join('-');

  if (kebabCaseDirectories === fileName) {
    return fileName;
  }

  const prefix = isBackward ? `${fileName}-` : '';
  const postfix = !isBackward ? `-${fileName}` : '';

  const componentName = `${prefix}${kebabCaseDirectories}${postfix}`;
  return componentName;
};

/**
 * Register all the components inside the src/components/common/* no mater how deep if they follow `*.component.vue`
 * @param {Object} vueInstance - the app created by createVueApp
 * @param {Array.<string>} [reversedNamePaths] - a path nested in /common/ to reverse travel the path
 */
export const registerCommonComponents = (
  vueInstance,
  reversedNamePaths = []
) => {
  componentSourceList.forEach((sourceFromRoot) => {
    const source = sourceFromRoot.split('/common/')[1];
    const component = componentSourceMap[sourceFromRoot];

    const shouldReverseName = reversedNamePaths.some((path) =>
      source.startsWith(path)
    );

    const direction = shouldReverseName ? 'forward' : 'backward';
    const componentName = getComponentNameByPath(source, { direction });

    vueInstance.component(componentName, component);
  });
};
