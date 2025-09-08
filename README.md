# @ismael1361/utils

Uma coleção de funções e classes utilitárias, fortemente tipadas, construídas com TypeScript para acelerar o desenvolvimento de projetos em JavaScript/TypeScript.

## Instalação

```bash
npm install @ismael1361/utils
# ou
yarn add @ismael1361/utils
```

---

## Indice

- [@ismael1361/utils](#ismael1361utils)
  - [Instalação](#instalação)
  - [Indice](#indice)
  - [Array](#array)
    - [`chunk<T>(array: T[], size: number): T[][]`](#chunktarray-t-size-number-t)
    - [`shuffle<T>(array: T[]): T[]`](#shuffletarray-t-t)
  - [Function](#function)
    - [`debounce<T>(func: T, wait: number): (...args) => void`](#debouncetfunc-t-wait-number-args--void)
    - [`throttle<T>(func: T, limit: number): (...args) => void`](#throttletfunc-t-limit-number-args--void)
  - [Object](#object)
    - [`deepClone<T>(obj: T): T`](#deepclonetobj-t-t)
    - [`merge<T, U>(target: T, source: U): T & U`](#merget-utarget-t-source-u-t--u)
  - [String](#string)
    - [`capitalize(str: string): string`](#capitalizestr-string-string)
    - [`slugify(str: string): string`](#slugifystr-string-string)
    - [`uuidv4(separator?: string): string`](#uuidv4separator-string-string)
  - [Math](#math)
    - [`interpolate(value: number, input: readonly number[], output: readonly number[], extrapolate?: ExtrapolationType): number`](#interpolatevalue-number-input-readonly-number-output-readonly-number-extrapolate-extrapolationtype-number)
  - [`EventEmitter<T>`](#eventemittert)
    - [`class EventEmitter<T>()`](#class-eventemittert)
    - [Propriedades da Instância](#propriedades-da-instância)
      - [`.prepared: boolean`](#prepared-boolean)
    - [Métodos da Instância](#métodos-da-instância)
      - [`.prepare(value?: boolean): void`](#preparevalue-boolean-void)
      - [`.ready<R = never>(callback?: () => R | Promise<R>): Promise<R>`](#readyr--nevercallback---r--promiser-promiser)
      - [`.clearEvents(): void`](#clearevents-void)
      - [`.on<K>(event: K, callback: SubscriptionCallback<T[K]>): EventHandler`](#onkevent-k-callback-subscriptioncallbacktk-eventhandler)
      - [`.once<K, R>(event: K, callback?: (...args: T[K]) => R): Promise<R | undefined>`](#oncek-revent-k-callback-args-tk--r-promiser--undefined)
      - [`.emit<K>(event: K, ...args: T[K]): EventEmitter<T>`](#emitkevent-k-args-tk-eventemittert)
      - [`.emitOnce<K>(event: K, ...args: T[K]): EventEmitter<T>`](#emitoncekevent-k-args-tk-eventemittert)
      - [`.off<K>(event: K, callback?: SubscriptionCallback<T[K]>): void`](#offkevent-k-callback-subscriptioncallbacktk-void)
      - [`.offOnce<K>(event: K, callback?: (...args: T[K]) => any): void`](#offoncekevent-k-callback-args-tk--any-void)
      - [`.pipe<K>(event: K, eventEmitter: EventEmitter<T>): EventHandler`](#pipekevent-k-eventemitter-eventemittert-eventhandler)
      - [`.pipeOnce<K>(event: K, eventEmitter: EventEmitter<T>): EventHandler`](#pipeoncekevent-k-eventemitter-eventemittert-eventhandler)
  - [Color](#color)
    - [`class Color(value: ColorValue)`](#class-colorvalue-colorvalue)
    - [Propriedades da Instância](#propriedades-da-instância-1)
      - [`.rgba: RGBA`](#rgba-rgba)
      - [`.rgb: RGB`](#rgb-rgb)
      - [`.hex: HEX`](#hex-hex)
      - [`.hsl: HSL`](#hsl-hsl)
      - [`.alpha: number`](#alpha-number)
      - [`.luminance: number`](#luminance-number)
      - [`.negative: Color`](#negative-color)
      - [`.grayScale: Color`](#grayscale-color)
      - [`.palette: ColorPalette`](#palette-colorpalette)
    - [Métodos da Instância](#métodos-da-instância-1)
      - [`.blend(color: ColorValue, ratio: number): Color`](#blendcolor-colorvalue-ratio-number-color)
      - [`.lighten(ratio: number): Color`](#lightenratio-number-color)
      - [`.darken(ratio: number): Color`](#darkenratio-number-color)
    - [Métodos Estáticos](#métodos-estáticos)
      - [`Color.parse(str: string): HEX | RGB | RGBA | HSL | HSLA`](#colorparsestr-string-hex--rgb--rgba--hsl--hsla)
      - [`Color.convert<T extends "hex" | "rgb" | "rgba" | "hsl" | "hsla">(value: ColorValue, to: T): HEX | RGB | RGBA | HSL | HSLA`](#colorconvertt-extends-hex--rgb--rgba--hsl--hslavalue-colorvalue-to-t-hex--rgb--rgba--hsl--hsla)
      - [`Color.fromHex(hex: string): Color`](#colorfromhexhex-string-color)
      - [`Color.fromRgb(red: number, green: number, blue: number): Color`](#colorfromrgbred-number-green-number-blue-number-color)
      - [`Color.fromRgba(red: number, green: number, blue: number, alpha: number): Color`](#colorfromrgbared-number-green-number-blue-number-alpha-number-color)
      - [`Color.fromHsl(hue: number, saturation: number, lightness: number): Color`](#colorfromhslhue-number-saturation-number-lightness-number-color)
      - [`Color.fromHsla(hue: number, saturation: number, lightness: number, alpha: number): Color`](#colorfromhslahue-number-saturation-number-lightness-number-alpha-number-color)
      - [`Color.random(): Color`](#colorrandom-color)
      - [`Color.textToColor(text: string): Color`](#colortexttocolortext-string-color)
      - [`Color.distance(color1: ColorValue, color2: ColorValue): number`](#colordistancecolor1-colorvalue-color2-colorvalue-number)
      - [`Color.palettes: ColorPalettes`](#colorpalettes-colorpalettes)

## Array

### `chunk<T>(array: T[], size: number): T[][]`

Cria um array de elementos divididos em grupos com o tamanho (`size`) especificado. Se o array não puder ser dividido igualmente, o último grupo conterá os elementos restantes.

**Exemplo:**
```typescript
import { chunk } from '@ismael1361/utils';

const letters = ['a', 'b', 'c', 'd', 'e'];
const chunks = chunk(letters, 2);

console.log(chunks);
// Saída: [['a', 'b'], ['c', 'd'], ['e']]
```

### `shuffle<T>(array: T[]): T[]`

Cria uma cópia embaralhada de um array usando o algoritmo Fisher-Yates. A função não modifica o array original.

**Exemplo:**
```typescript
import { shuffle } from '@ismael1361/utils';

const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffle(numbers);

console.log(shuffledNumbers);
// Saída possível: [4, 1, 5, 3, 2]

console.log(numbers);
// Saída: [1, 2, 3, 4, 5] (o array original permanece intacto)
```

## Function

### `debounce<T>(func: T, wait: number): (...args) => void`

Cria uma função "debounced" que atrasa a invocação de `func` até que `wait` milissegundos tenham se passado desde a última vez que a função foi invocada.

**Exemplo:**
```typescript
import { debounce } from '@ismael1361/utils';

// Evita cálculos custosos enquanto a janela está sendo redimensionada.
const handleResize = () => {
  console.log('Janela redimensionada');
};

const debouncedResize = debounce(handleResize, 200);

window.addEventListener('resize', debouncedResize);
```

### `throttle<T>(func: T, limit: number): (...args) => void`

Cria uma função "throttled" que invoca `func` no máximo uma vez a cada `limit` milissegundos.

**Exemplo:**
```typescript
import { throttle } from '@ismael1361/utils';

// Limita o número de vezes que a função de rolagem é chamada.
const handleScroll = () => {
  console.log('Rolagem detectada!');
};

const throttledScroll = throttle(handleScroll, 1000); // Executa no máximo uma vez por segundo

window.addEventListener('scroll', throttledScroll);
```

## Object

### `deepClone<T>(obj: T): T`

Cria uma cópia profunda (deep clone) de um objeto ou valor, garantindo que objetos e arrays aninhados também sejam clonados.

**Exemplo:**
```typescript
import { deepClone } from '@ismael1361/utils';

const original = { a: 1, d: { e: [10, 20] } };
const clone = deepClone(original);

// Modificar o clone não afeta o original
clone.d.e[0] = 99;

console.log(original.d.e[0]); // Saída: 10
```

### `merge<T, U>(target: T, source: U): T & U`

Mescla recursivamente as propriedades de dois objetos em um novo objeto, sem modificar os originais.

**Exemplo:**
```typescript
import { merge } from '@ismael1361/utils';

const target = { a: 1, b: { c: 2, d: 3 } };
const source = { b: { c: 4, e: 5 }, f: 6 };

const result = merge(target, source);
// result é { a: 1, b: { c: 4, d: 3, e: 5 }, f: 6 }
```

## String

### `capitalize(str: string): string`

Converte o primeiro caractere de uma string para maiúsculo e o restante para minúsculo.

**Exemplo:**
```typescript
import { capitalize } from '@ismael1361/utils';

capitalize('olá mundo'); // => 'Olá mundo'
capitalize('JÁ EM MAIÚSCULO'); // => 'Já em maiúsculo'
```

### `slugify(str: string): string`

Converte uma string em um "slug" amigável para URLs.

**Exemplo:**
```typescript
import { slugify } from '@ismael1361/utils';

const title = '  Exemplo de Título com Acentuação & Símbolos!  ';
const slug = slugify(title);

console.log(slug);
// => 'exemplo-de-ttulo-com-acentuao-smbolos'
```

### `uuidv4(separator?: string): string`

Gera um identificador único universal (UUID) versão 4. Esta implementação não é criptograficamente segura e é baseada em `Math.random()`. É adequada para gerar identificadores únicos em cenários onde a segurança não é a principal preocupação.

**Exemplo:**
```typescript
import { uuidv4 } from '@ismael1361/utils';

// Gera um UUID sem separadores
const id1 = uuidv4();
console.log(id1);
// => "a1b2c3d4e5f64a7b8c9d0e1f2a3b4c5d" (exemplo)

// Gera um UUID com hífens como separadores (formato padrão)
const id2 = uuidv4("-");
console.log(id2);
// => "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" (exemplo)
```

## Math

### `interpolate(value: number, input: readonly number[], output: readonly number[], extrapolate?: ExtrapolationType): number`

Mapeia um valor de um intervalo de entrada para um intervalo de saída usando interpolação linear. É útil para animações, mapeamento de gestos e normalização de dados.

**Exemplo:**
```typescript
import { interpolate } from '@ismael1361/utils';

// Um valor de 0 a 1 → traduz para 0 a 100%
interpolate(0.75, [0, 1], [0, 100]); // 75

// Nota vai de 0 a 10 → quero transformar para 0 a 5 estrelas
interpolate(8, [0, 10], [0, 5]); // 4

// Temperatura em °C (0 a 40) → Opacidade (0 a 1)
interpolate(20, [0, 40], [0, 1]); // 0.5

// Valores reais de vendas (1000 a 5000) → Posição em pixels (0 a 300)
interpolate(3500, [1000, 5000], [0, 300]); // 187.5

// Valores reais de vendas (1 a 5 a 20) → Posição em pixels (0 a 100 a 400)
interpolate(8, [1, 5, 20], [0, 100, 400]);  // 160

// Fora do intervalo → pode "estender" (extend), "travar" (clamp) ou manter o próprio valor (identity)
interpolate(-5, [0, 10], [0, 100], 'clamp');    // 0
interpolate(-5, [0, 10], [0, 100], 'extend');   // -50
interpolate(-5, [0, 10], [0, 100], 'identity'); // -5
```

## `EventEmitter<T>`

### `class EventEmitter<T>()`

Uma classe para gerenciar e emitir eventos personalizados de forma tipada.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

// Define a interface de eventos
interface MyEvents {
  saudacao: [nome: string];
  despedida: [nome: string, motivo: string];
}

const emitter = new EventEmitter<MyEvents>();

// Adiciona um ouvinte
const handler = emitter.on("saudacao", (nome) => {
  console.log(`Olá, ${nome}!`);
});

// Emite o evento
emitter.emit("saudacao", "Mundo"); // Saída: Olá, Mundo!

// Remove o ouvinte
handler.remove();

// Adiciona um ouvinte que só executa uma vez
emitter.once("despedida", (nome, motivo) => {
  console.log(`Adeus, ${nome}! Motivo: ${motivo}`);
});

emitter.emit("despedida", "Mundo", "fim do exemplo");
// Saída: Adeus, Mundo! Motivo: fim do exemplo

emitter.emit("despedida", "Mundo", "não será exibido");
// Nenhuma saída
```

---

### Propriedades da Instância

#### `.prepared: boolean`

Indica se a instância foi preparada.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter();

console.log(emitter.prepared); // false

emitter.prepare();

console.log(emitter.prepared); // true
```

---

### Métodos da Instância

#### `.prepare(value?: boolean): void`

Prepara a instância para receber ou emitir eventos.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter();

emitter.ready(() => {
  console.log("O emissor está pronto!");
});

emitter.prepare();
// Saída: O emissor está pronto!
```

#### `.ready<R = never>(callback?: () => R | Promise<R>): Promise<R>`

Registra uma função para ser executada quando a instância estiver pronta.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter();

emitter.ready(() => {
    console.log("O emissor está pronto!");
});

emitter.prepared = true;
// Saída: O emissor está pronto!
```

#### `.clearEvents(): void`

Limpa todos os eventos armazenados na instância.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter();
emitter.clearEvents();
// Todos os eventos foram removidos.
```

#### `.on<K>(event: K, callback: SubscriptionCallback<T[K]>): EventHandler`

Adiciona um ouvinte para um evento.

**Exemplo:**

```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter<{
  saudacao: [nome: string];
  despedida: [nome: string];
}>();

emitter.on("saudacao", (nome) => {
  console.log(`Olá, ${nome}!`);
});

emitter.emit("saudacao", "Alice");
// Saída: Olá, Alice!
```

#### `.once<K, R>(event: K, callback?: (...args: T[K]) => R): Promise<R | undefined>`

Adiciona um ouvinte que executa uma vez para um evento.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter<{
  greet: [name: string];
  farewell: [name: string];
}>();

emitter.once("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit("greet", "Alice");
// Saída: Hello, Alice!

emitter.emit("greet", "Bob");
// Nenhuma saída
```

#### `.emit<K>(event: K, ...args: T[K]): EventEmitter<T>`

Emite um evento.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter<{
  saudacao: [nome: string];
}>();

emitter.on("saudacao", (nome) => {
  console.log(`Olá, ${nome}!`);
});

emitter.emit("saudacao", "Alice");
// Saída: Olá, Alice!
```

#### `.emitOnce<K>(event: K, ...args: T[K]): EventEmitter<T>`

Emite um evento uma vez.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter<{
  configuracao: [config: object];
}>();

emitter.emitOnce("configuracao", { tema: "dark" });

// Este ouvinte será chamado imediatamente porque 'configuracao' já foi emitido.
emitter.on("configuracao", (config) => {
  console.log(`Configuração recebida:`, config);
});
// Saída: Configuração recebida: { tema: 'dark' }
```

#### `.off<K>(event: K, callback?: SubscriptionCallback<T[K]>): void`

Remove um ouvinte de um evento.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter<{
  saudacao: [nome: string];
}>();

const ouvinte = (nome) => {
  console.log(`Olá, ${nome}!`);
}

emitter.on("saudacao", ouvinte);
emitter.off("saudacao", ouvinte);

emitter.emit("saudacao", "Alice");
// Nenhuma saída
```

#### `.offOnce<K>(event: K, callback?: (...args: T[K]) => any): void`

Remove um ouvinte que executou uma vez de um evento.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter<{
  greet: [name: string];
  farewell: [name: string];
}>();

const ouvinte = (nome) => {
  console.log(`Olá, ${nome}!`);
}

emitter.once("greet", ouvinte);
emitter.offOnce("greet", ouvinte);

emitter.emit("greet", "Alice");
// Nenhuma saída
```

#### `.pipe<K>(event: K, eventEmitter: EventEmitter<T>): EventHandler`

Redireciona eventos de um emissor para outro.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter<{
  mensagem: [texto: string];
}>();

const anotherEmitter = new EventEmitter<{
  mensagem: [texto: string];
}>();

emitter.pipe("mensagem", anotherEmitter);

anotherEmitter.on("mensagem", (texto) => {
  console.log(`Outro emissor recebeu: ${texto}`);
});

emitter.emit("mensagem", "Olá mundo!");
// Saída: Outro emissor recebeu: Olá mundo!
```

#### `.pipeOnce<K>(event: K, eventEmitter: EventEmitter<T>): EventHandler`

Redireciona eventos de um emissor para outro uma vez.

**Exemplo:**
```typescript
import { EventEmitter } from '@ismael1361/utils';

const emitter = new EventEmitter<{
  login: [usuario: string];
}>();

const anotherEmitter = new EventEmitter<{
  login: [usuario: string];
}>();

emitter.pipeOnce("login", anotherEmitter);

anotherEmitter.on("login", (usuario) => {
  console.log(`${usuario} logado no outro emissor.`);
});

emitter.emit("login", "Alice");
// Saída: Alice logado no outro emissor.

emitter.emit("login", "Bob");
// Nenhuma saída
```

---

## Color

### `class Color(value: ColorValue)`

Uma classe robusta para manipulação e conversão de cores. Permite criar, modificar e converter cores entre diferentes formatos como HEX, RGB, e HSL.

**Exemplo de Criação:**
```typescript
import { Color } from '@ismael1361/utils';

// Criando cores de diferentes formas
const red = new Color('#ff0000');
const blue = Color.fromRgb(0, 0, 255);
const randomColor = Color.random();

// Convertendo e acessando valores
console.log(red.rgb.value); // "rgb(255, 0, 0)"
console.log(blue.hsl.value); // "hsl(240, 100%, 50%)"

// Manipulando cores
const pink = red.lighten(0.5);
console.log(pink.hex.value); // "#ff8080"

const darkBlue = blue.darken(0.25);
console.log(darkBlue.hex.value); // "#0000bf"

// Misturando cores
const purple = red.blend(blue, 0.5);
console.log(purple.hex.value); // "#800080"

// Gerando cor a partir de texto
const userColor = Color.textToColor('Ismael');
console.log(userColor.hex.value); // "#00ff44" (sempre o mesmo para o mesmo texto)
```

---

### Propriedades da Instância

#### `.rgba: RGBA`
Obtém a representação da cor como um objeto `RGBA` (vermelho, verde, azul, alfa).

**Exemplo:**
```typescript
const color = new Color('tomato');
console.log(color.rgba.value); // "rgba(255, 99, 71, 1)"
console.log(color.rgba.r);     // 255
```

#### `.rgb: RGB`
Obtém a representação da cor como um objeto `RGB`, descartando a transparência.

**Exemplo:**
```typescript
const color = new Color('rgba(0, 0, 255, 0.5)');
console.log(color.rgb.value); // "rgb(0, 0, 255)"
```

#### `.hex: HEX`
Obtém a representação da cor como um objeto `HEX`.

**Exemplo:**
```typescript
const color = new Color('rgb(0, 255, 0)');
console.log(color.hex.value); // "#00ff00"
```

#### `.hsl: HSL`
Obtém a representação da cor como um objeto `HSL` (matiz, saturação, luminosidade).

**Exemplo:**
```typescript
const color = new Color('blue');
console.log(color.hsl.value); // "hsl(240, 100%, 50%)"
console.log(color.hsl.h);     // 240
```

#### `.alpha: number`
Obtém ou define o valor do canal alfa (transparência) da cor, variando de 0 (transparente) a 1 (opaco).

**Exemplo:**
```typescript
const color = new Color('red');
console.log(color.alpha); // 1

color.alpha = 0.5;
console.log(color.rgba.value); // "rgba(255, 0, 0, 0.5)"
```

#### `.luminance: number`
Calcula o brilho percebido (luminância) da cor, de 0 (preto) a 255 (branco).

**Exemplo:**
```typescript
console.log(new Color('white').luminance); // 255
console.log(new Color('black').luminance); // 0
console.log(new Color('red').luminance);   // 54
```

#### `.negative: Color`
Obtém a cor negativa (inversa).

**Exemplo:**
```typescript
const color = new Color('rgb(50, 100, 150)');
console.log(color.negative.rgb.value); // "rgb(205, 155, 105)"
```

#### `.grayScale: Color`
Converte a cor para sua equivalente em escala de cinza.

**Exemplo:**
```typescript
const color = new Color('#ff8800'); // Laranja
console.log(color.grayScale.hex.value); // "#828282"
```

#### `.palette: ColorPalette`

Gera uma paleta de cores completa com base na cor atual.

A paleta é um objeto que contém várias tonalidades e sombras da cor base, geralmente indexadas por chaves numéricas (ex: '50', '100', ..., '900'), onde a chave '500' costuma representar a cor original.

A estrutura também pode incluir outros esquemas de cores, como complementares, análogas, etc.

**Exemplo:**
```typescript
const color = new Color('#f44336'); // Vermelho
console.log(color.palette['500'].hex.value); // "#f44336"
console.log(color.palette['700'].hex.value); // "#ba000d"
```

---

### Métodos da Instância

#### `.blend(color: ColorValue, ratio: number): Color`
Mistura a cor atual com outra cor em uma determinada proporção.

**Exemplo:**
```typescript
const red = new Color('red');
const blue = new Color('blue');
const purple = red.blend(blue, 0.5);
console.log(purple.hex.value); // "#800080"
```

#### `.lighten(ratio: number): Color`
Clareia a cor misturando-a com branco.

**Exemplo:**
```typescript
const red = new Color('red');
const pink = red.lighten(0.5);
console.log(pink.hex.value); // "#ff8080"
```

#### `.darken(ratio: number): Color`
Escurece a cor misturando-a com preto.

**Exemplo:**
```typescript
const blue = new Color('blue');
const darkBlue = blue.darken(0.5);
console.log(darkBlue.hex.value); // "#000080"
```

---

### Métodos Estáticos

#### `Color.parse(str: string): HEX | RGB | RGBA | HSL | HSLA`

Analisa uma string de cor e a converte para o objeto de classe correspondente.

**Exemplo:**
```typescript
const hexColor = Color.parse("#FF5733");
console.log(hexColor instanceof HEX); // Output: true
console.log(hexColor.value); // Output: "#FF5733"

const rgbColor = Color.parse("rgb(255, 87, 51)");
console.log(rgbColor instanceof RGB); // Output: true
```

#### `Color.convert<T extends "hex" | "rgb" | "rgba" | "hsl" | "hsla">(value: ColorValue, to: T): HEX | RGB | RGBA | HSL | HSLA`

Converte um valor de cor para um formato de destino específico.

**Exemplo:**
```typescript
const redRgb = Color.convert("#FF0000", "rgb");
console.log(redRgb instanceof RGB); // Output: true
console.log(redRgb.value); // Output: "rgb(255, 0, 0)"

const blueHsla = Color.convert("blue", "hsla");
console.log(blueHsla instanceof HSLA); // Output: true
console.log(blueHsla.value); // Output: "hsla(240, 100%, 50%, 1)"
```

#### `Color.fromHex(hex: string): Color`

Cria uma nova instância de `Color` a partir de uma string hexadecimal.

**Exemplo:**
```typescript
const red = Color.fromHex("#FF0000");
console.log(red.hex.value); // "#FF0000"
```

#### `Color.fromRgb(red: number, green: number, blue: number): Color`

Cria uma nova instância de `Color` a partir de valores RGB.

**Exemplo:**
```typescript
const blue = Color.fromRgb(0, 0, 255);
console.log(blue.hex.value); // "#0000FF"
```

#### `Color.fromRgba(red: number, green: number, blue: number, alpha: number): Color`

Cria uma nova instância de `Color` a partir de valores RGBA.

**Exemplo:**
```typescript
const transparentGreen = Color.fromRgba(0, 255, 0, 0.5);
console.log(transparentGreen.hex.value); // "#00FF0080"
```

#### `Color.fromHsl(hue: number, saturation: number, lightness: number): Color`

Cria uma nova instância de `Color` a partir de valores HSL.

**Exemplo:**
```typescript
const cyan = Color.fromHsl(180, 100, 50);
console.log(cyan.hex.value); // "#00FFFF"
```

#### `Color.fromHsla(hue: number, saturation: number, lightness: number, alpha: number): Color`

Cria uma nova instância de `Color` a partir de valores HSLA.

**Exemplo:**
```typescript
const transparentMagenta = Color.fromHsla(300, 100, 50, 0.5);
console.log(transparentMagenta.hex.value); // "#FF00FF80"
```

#### `Color.random(): Color`
Gera uma cor aleatória.

**Exemplo:**
```typescript
const randomColor = Color.random();
console.log(randomColor.hex.value); // ex: "#A4F2B9"
```

#### `Color.textToColor(text: string): Color`
Gera uma cor determinística a partir de uma string de texto.

**Exemplo:**
```typescript
const userColor = Color.textToColor('Ismael');
// Sempre retornará a mesma cor para o mesmo texto
console.log(userColor.hex.value); // "#00ff44"
```

#### `Color.distance(color1: ColorValue, color2: ColorValue): number`

Calcula a distância euclidiana entre duas cores no espaço de cores RGB.

**Exemplo:**
```typescript
const distance = Color.distance("red", "blue");
console.log(distance); // Output: 255
```

#### `Color.palettes: ColorPalettes`

Acessa uma coleção de paletas de cores predefinidas (ex: Material Design).

Este getter estático retorna um objeto onde cada chave é o nome de uma cor (ex: 'red', 'blue') e o valor é a paleta de tons correspondente. Cada paleta é um objeto com chaves numéricas ('50', '100', ..., '900') que representam as diferentes tonalidades da cor.

**Exemplo:**
```typescript
// Obtendo a paleta de cor 'red'
const redPalette = Color.palettes.red;

// Acessando o tom '500' (base) da paleta 'red'
const red500 = redPalette["500"];
console.log(red500.hex.value); // ex: "#f44336"

// Acessando diretamente o valor hexadecimal de um tom mais claro
const red100Hex = Color.palettes.red["100"].hex.value;
console.log(red100Hex); // ex: "#ffcdd2"

// Acessando um tom mais escuro de outra paleta
const blue700 = Color.palettes.blue["700"];
console.log(blue700.rgb.value); // ex: "rgb(25, 118, 210)"
```
