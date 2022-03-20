export const save = ({ mergedCssAsJson }) => {
  if (localStorage.getItem('css') === null) {
    localStorage.setItem('css', JSON.stringify({}))
  }
  const css = localStorage.getItem('css');

  console.log('localStorage set', { ...JSON.parse(css), [window.location.pathname]: mergedCssAsJson });
  localStorage.setItem('css', JSON.stringify({ ...JSON.parse(css), [window.location.pathname]: mergedCssAsJson }));
}