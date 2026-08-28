export default function playSound(src) {
  const audio = new Audio(src);

  audio.play();
}