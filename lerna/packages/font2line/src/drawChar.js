export default function(el, char, configs = {}) {
  if (!el) return;

  const ctx = el.getContext('2d');

  const width = window.innerWidth / 2;
  el.width = width;
  ctx.width = width;

  const height = window.innerHeight;
  el.height = height;
  ctx.height = height;

  ctx.textBaseline = configs.textBaseline || 'middle';
  ctx.font = configs.font || 'normal 30px PingFang SC';
  ctx.strokeText(
    char,
    configs.left !== undefined ? configs.left : 50,
    configs.top !== undefined ? configs.top : 100
  );
}
