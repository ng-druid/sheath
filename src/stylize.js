import domElementPath from 'dom-element-path';
import { toJSON } from 'cssjson';
import { camelize } from 'inflected';
import merge from 'deepmerge-json';

export default function stylize() {
  console.log('stylize');
  const overlay = new Map();

  const observer = new MutationObserver((records) => {
    records.forEach(r => {
      if (r.type === 'attributes' && r.attributeName === 'style' && r.target) {

        const path = domElementPath(r.target);

        const oldCssAsJson = toJSON(`${path} { ${r.oldValue} }`);
        console.log('oldCssAsJson', oldCssAsJson);

        const oldCssAsObject = Object.keys(oldCssAsJson.children[path].attributes).reduce((p, c) => ({ ...p, [camelize(c.replace('-', '_'), false)]: oldCssAsJson.children[path].attributes[c] }), {});
        console.log('oldCssAsObject', oldCssAsObject);

        const newCssAsObject = Object.keys(r.target.style).reduce((p, c) => parseInt(c) !== NaN ? { ...p, [camelize(r.target.style[c].replace('-', '_'), false)]: r.target.style[camelize(r.target.style[c].replace('-','_'), false)] } : p, {});
        console.log('newCssAsObject', newCssAsObject);

        const merged = merge(oldCssAsObject, newCssAsObject);
        console.log('merged', merged);

        overlay.set(path, merged);
        console.log('overlay changed', overlay);
      }
    });
  });

  const targetNode = document.getElementsByTagName('body')[0];
  const observerOptions = { childList: true, attributes: true, subtree: true, attributeFilter: [ 'style' ], attributeOldValue: true }
  observer.observe(targetNode, observerOptions);

}