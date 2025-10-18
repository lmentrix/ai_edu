"use client";

import { useEffect } from "react";

interface MathJaxComponentProps {
  children?: React.ReactNode;
}

export function MathJaxComponent({ children }: MathJaxComponentProps) {
  useEffect(() => {
    // Configure MathJax
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
      },
      startup: {
        ready: () => {
          console.log('MathJax is loaded');
          MathJax.startup.defaultReady();
          MathJax.startup.promise.then(() => {
            console.log('MathJax initial typesetting complete');
          });
        }
      }
    };

    // Load MathJax script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js';
    script.async = true;
    script.defer = true;
    
    document.head.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return <>{children}</>;
}