import Bird from './Bird';
import {
  updatePipes,
  setupPipes,
  getPassedPipesCount,
  getPipeRects,
} from './Pipes';

document.addEventListener('keypress', handleStart, { once: true });
const title = document.querySelector('[data-title]');
const subtitle = document.querySelector('[data-subtitle]');

const bird = new Bird();

let lastTime: number;
function updateLoop(time: number): void {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;
  bird.updateBird(delta);
  updatePipes(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}

function checkLose(): boolean {
  const birdRect = bird.getBirdRect();
  const insidePipe = getPipeRects().some((rect) => isCollision(birdRect, rect));
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;

  return outsideWorld || insidePipe;
}

function isCollision(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function handleStart(): void {
  title.classList.add('hide');
  lastTime = null;
  bird.resetBird();
  setupPipes();
  window.requestAnimationFrame(updateLoop);
}

function handleLose(): void {
  setTimeout(() => {
    title.classList.remove('hide');
    subtitle.classList.remove('hide');
    subtitle.textContent = `${getPassedPipesCount()} Pipes`;
    document.addEventListener('keypress', handleStart, { once: true });
  }, 100);
}
