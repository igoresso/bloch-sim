const generatePulse = params => {
  let t_vec = Array.from({ length: params.N_pulse }, (v, i) => i/(params.N_pulse-1)*params.T_pulse);
  let B1_x_vec = [];
  let B1_y_vec = [];

  switch (params.shape) {
    case 1:
      B1_x_vec = Array.from({ length: params.N_pulse }, (v, i) => params.amp_pulse);
      B1_y_vec = Array.from({ length: params.N_pulse }, (v, i) => 0);
      break
    case 2:
      B1_x_vec = t_vec.map(t =>
        params.amp_pulse*Math.sin(Math.PI*(params.lobes+1)/params.T_pulse*(t-params.T_pulse/2))/(Math.PI*(params.lobes+1)/params.T_pulse*(t-params.T_pulse/2))
      );
      B1_y_vec = Array.from({ length: params.N_pulse }, (v, i) => 0);
      break
    case 3:
      const alpha = 0.46;
      B1_x_vec = t_vec.map(t => 
        params.amp_pulse*Math.sin(Math.PI*(params.lobes+1)/params.T_pulse*(t-params.T_pulse/2))/(Math.PI*(params.lobes+1)/params.T_pulse*(t-params.T_pulse/2))
        *((1-alpha)+alpha*Math.cos(Math.PI*(params.lobes+1)/params.T_pulse*(t-params.T_pulse/2)/Math.round(params.lobes/2)))
      );
      B1_y_vec = Array.from({ length: params.N_pulse }, (v, i) => 0);
      break
    case 4:
      B1_x_vec = t_vec.map(t => 
        params.amp_pulse*Math.exp(-1*(t-params.T_pulse/2)**2/(2*params.sd**2))
      );
      B1_y_vec = Array.from({ length: params.N_pulse }, (v, i) => 0);
      break
    default:
      return { t_vec, B1_x_vec, B1_y_vec }
  }

  return { t_vec, B1_x_vec, B1_y_vec }
};

export default generatePulse;