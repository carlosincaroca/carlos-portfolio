const { useRef: _useRefR, useEffect: _useEffectR, useState: _useStateR } = React;

function Reveal({ children, delay = 0, threshold = 0.3, as = 'div', className = '', style = {} }) {
  const ref = _useRefR(null);
  const [shown, setShown] = _useStateR(false);
  _useEffectR(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return React.createElement(Tag, { ref, className: `fade-up ${shown ? 'in' : ''} ${className}`.trim(), style: { transitionDelay: `${delay}ms`, ...style } }, children);
}

window.Reveal = Reveal;