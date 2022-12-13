enum Fruit {
    peer,
    appel,
    cocosnoot,
    sinsappel
}

enum Display {
    Emoji,
    Char,
    Word
}

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
  }

function showFruit(fruit: Fruit, display: Display) {
    switch (display) {
        case Display.Emoji: return showFruitAsEmotji(fruit)
        case Display.Word: return showFruitAsWord(fruit)
        default: return showFruitAsChar(fruit)
    }
}

function showFruitAsEmotji(fruit: Fruit): string {
    switch (fruit) {
        case Fruit.peer: return "🍐"
        case Fruit.appel: return "🍎"
        case Fruit.cocosnoot: return "🥥"
        default: return "🍊"
    }
}

function showFruitAsWord(fruit: Fruit): string {
    switch (fruit) {
        case Fruit.peer: return "peer"
        case Fruit.appel: return "appel"
        case Fruit.cocosnoot: return "cocosnoot"
        default: return "sinasappel"
    }
}

function showFruitAsChar(fruit: Fruit): string {
    return showFruitAsWord(fruit).slice(0, 1)
}

// Todo: make recursive
function randomFruitOrderOfLength(length: number): Fruit[] {
    let order: Fruit[] = []
    for (let i = 0; i < length; i++) {
        order.push(randomEnum(Fruit))
    }
    return order
}

function randomFruit(): Fruit {
    return randomEnum(Fruit)
}

function fruitOrderToString(order: Fruit[], display: Display): string {
    return order.map(fruit => showFruit(fruit, display)).reduce((p, c) => p + c)
}       

function stringInChunks(input: string, chunkSize: number): string {
    return input.slice(0, chunkSize) + " " + (input.length >= chunkSize ? stringInChunks(input.slice(chunkSize), chunkSize) : "")
}

function renderFruitOrder(order: Fruit[]): void {
    renderVisualOrder(order)
    renderAccessibleOrder(order)
}

function renderVisualOrder(order: Fruit[]): void {
    (document.getElementById("visual-order") as HTMLElement).innerHTML = stringInChunks(fruitOrderToString(order, Display.Char), 4)  + charToSelectedChar("b")
}

function renderAccessibleOrder(order: Fruit[]): void {
    (document.getElementById("accessible-order") as HTMLTextAreaElement).value =stringInChunks(fruitOrderToString(order, Display.Char), 4)
}

function charToSelectedChar(char: string): string {
    return `<span id=\"visual-selected\">${char}</span>`
}



let displayedFruitOrder: Fruit[] = randomFruitOrderOfLength(20)



window.onload = function() {
    renderFruitOrder(displayedFruitOrder)
}