import generatePulse from './generatePulse';
import generateGradient from './generateGradient';

const update = (state, payload) => {
  for (let [key, value] of Object.entries(payload)) {
    let params = {};
    let output = {};

    switch (key) {
      case 'B0':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'gamma':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'T1':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'T2':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'T_pulse':
        params = {
          ...state.params,
          ...{ [key]: value },
          ...{ dt_pulse: value/(state.params.N_pulse-1) }
        };
        break
      case 'N_pulse':
        params = {
          ...state.params,
          ...{ [key]: value },
          ...{ dt_pulse: state.params.T_pulse/(value-1) },
          ...{ current_index: value-1 }
        };
        break
      case 'dt_pulse':
        params = {
          ...state.params,
          ...{ [key]: value },
          ...{ T_pulse: (state.params.N_pulse-1)*value }
        };
        break
      case 'amp_pulse':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'shape':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'lobes':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'sd':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'amp_Gz':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'l_profile':
        params = {
          ...state.params,
          ...{ [key]: value },
          ...{ dl_profile: value/(state.params.N_profile-1) }
        };
        break
      case 'N_profile':
        params = {
          ...state.params,
          ...{ [key]: value },
          ...{ dl_profile: state.params.l_profile/(value-1) }
        };
        break
      case 'dl_profile':
        params = {
          ...state.params,
          ...{ [key]: value },
          ...{ dl_profile: (state.params.N_profile-1)*value }
        };
        break
      case 'isBusy':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'current_index':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      default:
        return state;
    }

    output = {
      ...state.output,
      ...generatePulse(params),
      ...generateGradient(params)
    }

    return { params, output }
  }
}

export default update;