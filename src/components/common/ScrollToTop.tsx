import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.querySelector('main');
    if (!main?.querySelector('[data-route-loading]')) return;

    const observer = new MutationObserver(() => {
      if (!main.querySelector('[data-route-loading]')) {
        window.scrollTo(0, 0);
        observer.disconnect();
      }
    });
    observer.observe(main, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
