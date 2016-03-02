export function rightArrow() {
  'ngInject';
  return function(input = '') {
    let out = '> ' + input;
    return out;
  };
};
