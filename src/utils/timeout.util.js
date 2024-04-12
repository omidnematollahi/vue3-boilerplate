class Timeout {
  #timerId;
  #callback;
  #startTime;
  #remainingTime;
  #params;
  #delay;

  constructor(callback, delay, ...params) {
    this.#callback = callback;
    this.#params = params;
    this.#delay = delay;
    this._startTimer();
  }

  _startTimer() {
    this.#startTime = Date.now();
    this.#remainingTime = this.#delay;
    this.#timerId = setTimeout(this.#callback, this.#delay, ...this.#params);
  }

  pause() {
    if (!this.#timerId) return;

    clearTimeout(this.#timerId);
    this.#timerId = null;

    this.#remainingTime -= Date.now() - this.#startTime;
  }

  resume() {
    if (this.#timerId) return;

    this.#startTime = Date.now();
    this.#timerId = setTimeout(
      this.#callback,
      this.#remainingTime,
      ...this.#params
    );
  }

  get remainingTime() {
    return this.#remainingTime;
  }
}

export default Timeout;
