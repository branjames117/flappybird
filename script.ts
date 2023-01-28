import Bird from './Bird';

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
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}

function checkLose(): boolean {
  const birdRect = bird.getBirdRect();
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;

  return outsideWorld;
}

function handleStart(): void {
  title.classList.add('hide');
  lastTime = null;
  bird.resetBird();
  window.requestAnimationFrame(updateLoop);
}

function handleLose(): void {
  setTimeout(() => {
    title.classList.remove('hide');
    subtitle.classList.remove('hide');
    subtitle.textContent = '0 Pipes';
    document.addEventListener('keypress', handleStart, { once: true });
  }, 100);
}
