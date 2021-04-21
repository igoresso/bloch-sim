const generateSphereMesh = (N=20) => {
  const n = 2 * Math.floor(N/2);
  let x = [];
  let y = [];
  let z = [];

  for (let m = 0; m < n / 2; m++) {
    const phi = 2 * Math.PI / n * (m+1);
    
    for (let p = 0; p <= 2*n; p++) {
      const theta = Math.PI * p / n;

      x.push(Math.sin(theta)*Math.cos(phi))
      y.push(Math.sin(theta)*Math.sin(phi))
      z.push(Math.cos(theta))

      if (m === n/2-1 && p === n) {
        break
      }
    }
  }

  for (let p = n-1; p > 0; p--) {
    const theta = -Math.PI * p / n;
    
    for (let m = 0; m <= n; m++) {
      const phi = 2 * Math.PI * m / n + Math.PI;
      
      x.push(Math.sin(theta)*Math.cos(phi))
      y.push(Math.sin(theta)*Math.sin(phi))
      z.push(Math.cos(theta))
    }
  }
      
  return { x, y, z }
}

export default generateSphereMesh;