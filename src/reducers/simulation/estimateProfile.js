import ode45 from 'ode45-cash-karp';

const estimateProfile = (state) => {
  const gamma = 2*Math.PI*state.params.gamma*10**6;
  const T1 = state.params.T1/10**3;
  const T2 = state.params.T2/10**3;
  const T_pulse = state.params.T_pulse/10**3;
  const dt = state.params.dt_pulse/10**3;
  const l_profile = state.params.l_profile/10**3;
  const N_profile = state.params.N_profile;
  const t_vec = state.output.t_vec.map(t => t/10**3);
  const B1_x_vec = state.output.B1_x_vec.map(B1_x => B1_x/10**3);
  const B1_y_vec = state.output.B1_y_vec.map(B1_y => B1_y/10**3);
  const z_vec = Array.from({ length: N_profile }, (v, i) => -l_profile/2 + l_profile/(N_profile-1)*i);
  const Gz_vec = state.output.Gz_vec.map(Gz => Gz/10**3);

  let SPx_vec = [];
  let SPy_vec = [];
  let SPxy_vec = [];
  let SPz_vec = [];

  z_vec.forEach( z => {
    const bloch = (dMdt,M,t) => {
      let delw0 = 0;
      let Bx = 0;
      let By = 0;
  
      if (t < T_pulse) {
        const index = t_vec.findIndex(v => v > t);
        const alpha = (t - t_vec[index-1]) / (t_vec[index] - t_vec[index-1]);
        const Gz = Gz_vec[index-1] + alpha * (Gz_vec[index] - Gz_vec[index-1]);
        delw0 = gamma*Gz*z;
      }
  
      if (t < T_pulse) {
        const index = t_vec.findIndex(v => v > t);
        const alpha = (t - t_vec[index-1]) / (t_vec[index] - t_vec[index-1]);
        Bx = B1_x_vec[index-1] + alpha * (B1_x_vec[index] - B1_x_vec[index-1]);
        By = B1_y_vec[index-1] + alpha * (B1_y_vec[index] - B1_y_vec[index-1]);
      }
  
      dMdt[0] = -1/T2*M[0] + gamma*By*M[2] + delw0*M[1];
      dMdt[1] = -1/T2*M[1] + gamma*Bx*M[2] - delw0*M[0];
      dMdt[2] = gamma*By*M[0] - gamma*Bx*M[1] - 1/T1*M[2] + 1/T1;
    };

    const M0 = [0,0,1];
    const t0 = 0;
    const dt0 = dt;

    let integrator = ode45(M0, bloch, t0, dt0 )
    integrator.steps(Infinity, T_pulse)
    
    SPx_vec.push(integrator.y[0])
    SPy_vec.push(integrator.y[1])
    SPxy_vec.push(Math.sqrt(integrator.y[0]**2+integrator.y[1]**2))
    SPz_vec.push(integrator.y[2])
  })

  return {
    params: {
      ...state.params,
      ...{ isBusy: false }
    },
    output: {
      ...state.output,
      ...{ 
        z_vec: z_vec.map(z => z*10**3),
        SPx_vec,
        SPy_vec,
        SPxy_vec,
        SPz_vec
      }
    }
  }
}

export default estimateProfile;