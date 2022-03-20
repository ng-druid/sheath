import { getDiff } from 'recursive-diff';
import domElementPath from 'dom-element-path';

export default function stylize() {
  console.log('stylize');
  const overlay = new Map();

  const observer = new MutationObserver((records) => {
    records.forEach(r => {
      console.log('mutation record', r);
      // Could be part of rules engine -> pass changes through rules engine = much more flexible.
      if (r.type === 'attributes' && r.attributeName === 'style' && r.target) {
        const diff = getDiff(r.oldValue);
        const path = domElementPath(r.target);
        overlay.set(path, { ...(overlay.has(path) ? overlay.get(path)  : { [r.attributeName]: r.target[r.attributeName] })  });
        console.log('overlay changed', overlay);
      }
    });
  });

  const targetNode = document.getElementsByTagName('body')[0];
  const observerOptions = { childList: true, attributes: true, subtree: true, attributeFilter: [ 'style' ], attributeOldValue: true }
  observer.observe(targetNode, observerOptions);

}