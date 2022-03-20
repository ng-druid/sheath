export default function stylize() {
  console.log('stylize');

  const observer = new MutationObserver((records) => {
    records.forEach(r => {
      console.log('mutation record', r);
    });
  });

  const targetNode = document.getElementsByTagName('body')[0];
  const observerOptions = { childList: true, attributes: true, subtree: true, attributeFilter: [ 'style' ], attributeOldValue: true }
  observer.observe(targetNode, observerOptions);

}