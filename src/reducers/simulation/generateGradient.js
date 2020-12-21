const generateGradient = params => {
  const Gz_vec = Array.from({ length: params.N_pulse }, (v, i) => params.amp_Gz);
  return { Gz_vec }
};

export default generateGradient;