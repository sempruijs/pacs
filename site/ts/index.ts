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
            char = "k"
            break
        default: char = "s"
    }
    return highlighted ? `<span id=\"visual-selected\">${char}</span>` : char
}

function showFruit(fruit: Fruit, display: Display, highlighted: boolean) {
    switch (display) {
        case Display.Emoji: return showFruitAsEmotji(fruit, highlighted)
        case Display.Word: return showFruitAsWord(fruit, highlighted)
        default: return showFruitAsChar(fruit, highlighted)
    }
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


function fruitInChunks(input: string, chunkSize: number): string {
    return input.slice(0, chunkSize) + (input.length >= chunkSize ? fruitInChunks(input.slice(chunkSize), chunkSize) : "")
}

function renderVisualOrder(order: Fruit[], highlightedIndex: number): void {
    const lineWidth = 4
    const display = Display.Char
    const fruitLines = chunks(order, lineWidth)

    let lines: string[] = []
    for (let y = 0; y < fruitLines.length; y++) {
        let line: string = ""
        for (let x = 0; x < fruitLines[x].length; x++) {
            line += showFruit(fruitLines[y][x], display, (y * lineWidth) + x == highlightedIndex)
        }
        lines.push(line)
    }

    lines.forEach(line => renderLine(line))
}

function renderAccessibleOrder(order: Fruit[], highlightedIndex: number): void {
    (document.getElementById("accessible-order") as HTMLTextAreaElement).value = orderToAccessibleString(order, 4)
    highlightAccessibleOrder(highlightedIndex)
}

function highlightAccessibleOrder(index: number): void {
    const input = (document.getElementById("accessible-order") as HTMLTextAreaElement)
    input.focus()
    const charPosition = index + (Math.floor(index / 4))
    input.setSelectionRange(charPosition, charPosition + 1)
}

function orderToAccessibleString(order: Fruit[], chunkSize: number): string {
    return flatmapString(order.slice(0, chunkSize).map(fruit => showFruit(fruit, Display.Char, false))) + " " + (order.length > chunkSize ? orderToAccessibleString(order.slice(chunkSize), chunkSize) : "")
}

function flatmapString(array: string[]): string {
    return array[0] += array.length > 1 ? flatmapString(array.slice(1)) : ""
}


function renderFruitOrder(order: Fruit[], index: number): void {
    renderVisualOrder(order, index)
    renderAccessibleOrder(order, index)
}

function clearDom(): void {
    // clear visual order
    const container: HTMLElement = document.getElementById("lines-container")
    container.innerHTML = ""
}




// function renderAccessibleOrder(order: Fruit[]): void {
// (document.getElementById("accessible-order") as HTMLTextAreaElement).value =
// }

function charToSelectedChar(char: string): string {
    return `<span id=\"visual-selected\">${char}</span>`
}

function renderLine(line: string): void {
    // create element
    const div: HTMLElement = document.createElement("div")
    div.innerHTML = line + "<br>"
    div.className = "fruit-line"

    // render element
    const container: HTMLElement = document.getElementById("lines-container")
    container.appendChild(div)
}


let displayedFruitOrder: Fruit[] = randomFruitOrderOfLength(20)

window.onload = function () {
    renderFruitOrder(displayedFruitOrder, highlightedFruitIndex)
}

let highlightedFruitIndex = 0

const interval = setInterval(function () {
    highlightedFruitIndex == 19 ? highlightedFruitIndex = 0 : highlightedFruitIndex++
    clearDom()
    renderFruitOrder(displayedFruitOrder, highlightedFruitIndex)
}, 1000);

// clearInterval(interval);

