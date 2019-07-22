export default class interval {
  constructor(delay, func) {
    this.started = false;
    this.timer = null;
    this.target = 0;
    this.startTime = 0;

    this.run = () => {
      if (!this.started) {
        this.startTime = new Date().valueOf() - 1600;
        this.target = delay;
        this.started = true;
        this.run();
      } else {
        let elapsed = new Date().valueOf() - this.startTime;
        let adjust = this.target - elapsed;
        func();
        this.target += delay;
        this.timer = setTimeout(this.run, delay + adjust);
      }
    };

    this.stop = () => {
      clearTimeout(this.timer);
      this.started = false;
      this.timer = null;
      this.target = 0;
      this.startTime = 0;
    };
  }
}
