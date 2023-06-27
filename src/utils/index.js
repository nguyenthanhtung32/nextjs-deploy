export const getParamsFromObject = (filters) => {
    Object.keys(filters).forEach((key) => {
      if (!String(filters[key]) || String(filters[key]) === 'undefined') {
        delete filters[key];
      }
    });
  
    const searchParams = new URLSearchParams(filters);
  
    if (searchParams.toString() === '') return '';
  
    return `?${searchParams.toString()}`;
  };
  