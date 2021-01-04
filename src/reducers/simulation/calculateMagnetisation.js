import ode45 from 'ode45-cash-karp';

const simulate = (state) => {
  const gamma = 2*Math.PI*state.params.gamma*10**6;
  const T1 = state.params.T1/10**3;
  const T2 = state.params.T2/10**3;
  const T_pulse = state.params.T_pulse/10**3;
  const dt = state.params.dt_pulse/10**3;
  const t_vec = state.output.t_vec.map(t => t/10**3);
  const B1_x_vec = state.output.B1_x_vec.map(B1_x => B1_x/10**3);
  const B1_y_vec = state.output.B1_y_vec.map(B1_y => B1_y/10**3);

  const bloch = (dMdt,M,t) => {
    let Bx = 0;
    let By = 0;

    if (t < T_pulse) {
      const index = t_vec.findIndex(v => v > t);
      const alpha = (t - t_vec[index-1]) / (t_vec[index] - t_vec[index-1]);
      Bx = B1_x_vec[index-1] + alpha * (B1_x_vec[index] - B1_x_vec[index-1]);
      By = B1_y_vec[index-1] + alpha * (B1_y_vec[index] - B1_y_vec[index-1]);
    }

    dMdt[0] = -1/T2*M[0] + gamma*By*M[2];
    dMdt[1] = -1/T2*M[1] + gamma*Bx*M[2];
    dMdt[2] = gamma*By*M[0] - gamma*Bx*M[1] - 1/T1*M[2] + 1/T1;
  };
  
  const M0 = [0,0,1];
  const t0 = 0;
  const dt0 = dt;
  let integrator = ode45(M0, bloch, t0, dt0 )

  let Mx_vec = [M0[0]];
  let My_vec = [M0[1]];
  let Mxy_vec = [Math.sqrt(M0[0]**2 + M0[1]**2)];
  let Mz_vec = [M0[2]];

  t_vec.slice(1).forEach(t => {
    integrator.steps(Infinity, t)
    Mx_vec.push(integrator.y[0])
    My_vec.push(integrator.y[1])
    Mxy_vec.push(Math.sqrt(integrator.y[0]**2+integrator.y[1]**2))
    Mz_vec.push(integrator.y[2])
  })

  return {
    params: {
      ...state.params
    },
    output: {
      ...state.output,
      ...{ Mx_vec, My_vec, Mxy_vec, Mz_vec }
    }
  }
}

export default simulate;