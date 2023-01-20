function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomName(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let name = "";
  for (let i = 0; i < 5; i++) {
    name = name + letters[getRandomInt(0, letters.length - 1)];
  }

  return name;
}
export function randomColor() {
  return {
    r: getRandomInt(0, 255),
    g: getRandomInt(0, 255),
    b: getRandomInt(0, 255),
  };
}
