function easeJump(t) {
    let p = 0.5 * sin(2 * PI * t - PI * 0.5) + 0.5
    return pow(p, 2)
  }