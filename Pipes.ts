const HOLE_HEIGHT = 200;
const PIPE_WIDTH = 120;
const PIPE_INTERVAL = 1500;
const PIPE_SPEED = 0.75;
let pipes: Pipe[] = [];
let timeSinceLastPipe: number;
let passedPipeCount: number;

export function updatePipes(delta: number) {
  timeSinceLastPipe += delta;
  if (timeSinceLastPipe > PIPE_INTERVAL) {
    timeSinceLastPipe -= PIPE_INTERVAL;
    new Pipe();
  }
  pipes.forEach((pipe) => {
    if (pipe.getLeft() + PIPE_WIDTH < 0) {
      passedPipeCount++;
      return pipe.remove();
    }
    pipe.setLeft(pipe.getLeft() - delta * PIPE_SPEED);
  });
}

export function setupPipes() {
  document.documentElement.style.setProperty('--pipe-width', '' + PIPE_WIDTH);
  document.documentElement.style.setProperty('--hole-height', '' + HOLE_HEIGHT);
  pipes.forEach((pipe) => pipe.remove());
  timeSinceLastPipe = PIPE_INTERVAL;
  passedPipeCount = 0;
}

export function getPassedPipesCount(): number {
  return passedPipeCount;
}

export function getPipeRects() {
  return pipes.flatMap((pipe) => pipe.rects());
}

class Pipe {
  pipe: any;
  pipeElem: HTMLElement;
  topElem: HTMLElement;
  bottomElem: HTMLElement;

  constructor() {
    this.pipeElem = document.createElement('div');
    this.topElem = this.createPipeSegment('top');
    this.bottomElem = this.createPipeSegment('bottom');
    this.pipeElem.append(this.topElem);
    this.pipeElem.append(this.bottomElem);
    this.pipeElem.classList.add('pipe');
    this.pipeElem.style.setProperty(
      '--hole-top',
      this.randomNumberBetween(
        HOLE_HEIGHT * 1.5,
        window.innerHeight - HOLE_HEIGHT * 0.5
      )
    );
    this.setLeft(window.innerWidth);
    document.body.append(this.pipeElem);
    pipes.push(this);
  }

  getLeft(): number {
    return parseFloat(
      getComputedStyle(this.pipeElem).getPropertyValue('--pipe-left')
    );
  }

  setLeft(value: number) {
    this.pipeElem.style.setProperty('--pipe-left', '' + value);
  }

  createPipeSegment(position: string): HTMLElement {
    const segment = document.createElement('div');
    segment.classList.add('segment', position);
    return segment;
  }

  remove(): void {
    pipes = pipes.filter((p) => p !== this);
    this.pipeElem.remove();
  }

  rects(): DOMRect[] {
    return [
      this.topElem.getBoundingClientRect(),
      this.bottomElem.getBoundingClientRect(),
    ];
  }

  randomNumberBetween(min: number, max: number): string {
    return '' + Math.floor(Math.random() * (max - min + 1) + min);
  }
}
