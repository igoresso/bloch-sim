import generatePulse from './generatePulse';
import generateGradient from './generateGradient';

const B0 = 3;                     // T
const gamma = 42.5775;            // MHz/T
const T1 = 950;                   // ms
const T2 =  100;                  // ms
const T_pulse = 10;               // ms
const N_pulse = 100;
const dt_pulse = T_pulse/N_pulse; // ms
const amp_pulse = 0.001;          // mT
const shape_options = [
  {
    value: 1,
    label: 'rect'
  },
  {
    value: 2,
    label: 'sinc'
  },
  {
    value: 3,
    label: 'Hm(sinc)'
  },
  {
    value: 4,
    label: 'Gaussian'
  },
];
const shape = 2;
const lobes = 3;
const sd = 1;                             // s              
const amp_Gz = 30;                        // mT/m
const l_profile = 5;                      // mm
const N_profile = 100;
const dl_profile = l_profile/N_profile;   // mm


const params = {
  B0,
  gamma,
  T1,
  T2,
  T_pulse,
  N_pulse,
  dt_pulse,
  amp_pulse,
  shape_options,
  shape,
  lobes,
  sd,
  amp_Gz,
  l_profile,
  N_profile,
  dl_profile,
}

const output = {
  ...generatePulse(params),
  ...generateGradient(params),
  Mx_vec: [],
  My_vec: [],
  Mxy_vec: [],
  Mz_vec: [],
  z_vec: [],
  SPx_vec: [],
  SPy_vec: [],
  SPxy_vec: [],
  SPz_vec: []
};

const initialState = {
  params,
  output
};

export default initialState;