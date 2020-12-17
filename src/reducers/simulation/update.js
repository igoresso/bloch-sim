import generatePulse from './generatePulse';

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
          ...{ dt_pulse: value/state.params.N_pulse }
        };
        break
      case 'N_pulse':
        params = {
          ...state.params,
          ...{ [key]: value },
          ...{ dt_pulse: state.params.T_pulse/value }
        };
        break
      case 'dt_pulse':
        params = {
          ...state.params,
          ...{ [key]: value },
          ...{ T_pulse: state.params.N_pulse*value }
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
      case 'Gz':
        params = {
          ...state.params,
          ...{ [key]: value }
        }
        break
      case 'isBusy':
          params = {
            ...state.params,
            ...{ [key]: value }
          }
          break
      default:
        return state;
    }

    output = generatePulse(params, state.output);
    return { params, output }
  }
}

export default update;