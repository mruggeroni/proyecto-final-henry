import { useEffect, useState } from "react";
import s from './BacktoTop.module.css';

export default function BacktoTop(){
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  function scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return ( showButton && (
        <button onClick={scrollToTop} className={s.backtoTop_btn}>
          &#8679;
        </button>
      )
  );
};
