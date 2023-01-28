const BIRD_SPEED = 0.5;
const JUMP_DURATION = 125;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export default class Bird {
  birdElem: HTMLElement;

  constructor() {
    this.birdElem = document.querySelector('[data-bird]');
    this.setTop(window.innerHeight / 2);
    document.removeEventListener('keydown', this.handleJump);
    document.addEventListener('keydown', this.handleJump);
  }

  resetBird(): void {
    this.setTop(window.innerHeight / 2);
  }

  updateBird(delta: number): void {
    if (timeSinceLastJump < JUMP_DURATION) {
      this.setTop(this.getTop() - BIRD_SPEED * delta);
    } else {
      this.setTop(this.getTop() + BIRD_SPEED * delta);
    }
    timeSinceLastJump += delta;
  }

  handleJump(e: KeyboardEvent): void {
    if (e.code !== 'Space') return;
    timeSinceLastJump = 0;
  }

  setTop(top: number) {
    this.birdElem.style.setProperty('--bird-top', '' + top);
  }

  getTop(): number {
    return parseFloat(
      getComputedStyle(this.birdElem).getPropertyValue('--bird-top')
    );
  }

  getBirdRect(): DOMRect {
    return this.birdElem.getBoundingClientRect();
  }
}
