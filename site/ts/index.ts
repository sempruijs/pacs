enum Fruit {
    peer,
    appel,
    kokosnoot,
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

function chunks<T>(arr: Array<T>, chunkSize: number): Array<Array<T>> {
    const res: Array<Array<T>> = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}



function showFruit(fruit: Fruit, display: Display, highlighted: boolean) {
    switch (display) {
        case Display.Emoji: return showFruitAsEmotji(fruit, highlighted)
        case Display.Word: return showFruitAsWord(fruit, highlighted)
        default: return showFruitAsChar(fruit, highlighted)
    }
}

function showFruitAsEmotji(fruit: Fruit, highlighted: boolean): string {
    switch (fruit) {
        case Fruit.peer: return "🍐"
        case Fruit.appel: return "🍎"
        case Fruit.kokosnoot: return "🥥"
        default: return "🍊"
    }
}

function showFruitAsWord(fruit: Fruit, highlighted: boolean): string {
    switch (fruit) {
        case Fruit.peer: return "peer"
        case Fruit.appel: return "appel"
        case Fruit.kokosnoot: return "kokosnoot"
        default: return "sinasappel"
    }
}

function showFruitAsChar(fruit: Fruit, highlighted: boolean): string {
    let char: string;
    switch (fruit) {
        case Fruit.peer: 
            char = "p"
            break
        case Fruit.appel: 
            char = "a"
            break
        case Fruit.kokosnoot: 
            char= "k"
            break
        default: char = "s"
    }
    return highlighted ? `<span id=\"visual-selected\">${char}</span>` : char
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
    return order.map(fruit => showFruit(fruit, display, false)).reduce((p, c) => p + c)
}       

function fruitInChunks(input: string, chunkSize: number): string {
    return input.slice(0, chunkSize) + (input.length >= chunkSize ? fruitInChunks(input.slice(chunkSize), chunkSize) : "")
}

function renderFruitOrder(order: Fruit[]): void {
    renderVisualOrder(order)
    renderAccessibleOrder(order)
}

function renderVisualOrder(order: Fruit[]): void {
    const orderInChunks = chunks(order, 4)
    orderInChunks.forEach(chunk => renderLine(fruitOrderToString(chunk, Display.Char)))        
}

function renderAccessibleOrder(order: Fruit[]): void {
    (document.getElementById("accessible-order") as HTMLTextAreaElement).value =fruitInChunks(fruitOrderToString(order, Display.Char), 4)
}

function charToSelectedChar(char: string): string {
    return `<span id=\"visual-selected\">${char}</span>`
}

function renderLine(line: string): void {
    // create element
    const div: HTMLElement = document.createElement("div")
    div.innerHTML = line + "<br>"

    // render element
    const container: HTMLElement = document.getElementById("lines-container")
    container.appendChild(div)

}

let displayedFruitOrder: Fruit[] = randomFruitOrderOfLength(20)

window.onload = function() {
    renderFruitOrder(displayedFruitOrder)
}