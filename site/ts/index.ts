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

console.log(showFruit(Fruit.appel, Display.Emoji))

