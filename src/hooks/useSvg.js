import React, { useEffect, useState } from 'react';
const useSvg = (fileName) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Svg, setSvg] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../components/Logo/Great8Logo`); // change relative path to suit your needs
        setSvg(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [fileName]);

  console.log(Svg);
  return {
    loading,
    error,
    Svg,
  };
};

export default useSvg;
