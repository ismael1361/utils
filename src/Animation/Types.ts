import type { SharedValue, SharedValues } from "../SharedValue";

export type EasingFunction = (t: number) => number;

export interface InputGeneratorProps {
    deltaTime: number;
    onClear: (callback: () => void) => void;
}

export type InputGenerator<T = void> = Generator<undefined, T, InputGeneratorProps>;
export type Input = (() => InputGenerator) | InputGenerator;
export type Inputs = Input[];

export type LoopCallback = (i: number) => InputGenerator;

export interface TimingConfig {
    from: number;
    to: number;
    easing?: EasingFunction;
    delay?: number;
    duration?: number;
}

export type TimingCallback = (i: number) => void | boolean;

export type AnimationState = Record<string, unknown>;

export type AnimationFn<S> = (state: SharedValues<S>["current"]) => InputGenerator;

export interface AnimationProps<S> {
    /**
     * Um objeto contendo os `SharedValue`s reativos do estado da animação.
     * Você pode usar isso para ler o estado atual da sua animação de fora do gerador.
     * @example
     * ```ts
     * const myAnimation = create(..., { progress: 0 });
     * // Em um loop de renderização ou efeito:
     * console.log(myAnimation.state.progress.value);
     * ```
     */
    state: { [K in keyof S]: SharedValue<S[K]> };
    /**
     * Inicia a animação do começo. Se já estiver em execução, ela será reiniciada.
     * @example myAnimation.start();
     */
    start(): void;
    /**
     * Limpa quaisquer recursos ou listeners criados pela animação (ex: via `onClear`).
     * @example myAnimation.clear();
     */
    clear(): void;
    /**
     * Pausa a animação em seu estado atual.
     * @example myAnimation.pause();
     */
    pause(): void;
    /**
     * Retoma uma animação que foi pausada.
     * @example myAnimation.resume();
     */
    resume(): void;
    /**
     * Um atalho para `resume()`. Retoma uma animação pausada.
     * @see {@link resume}
     * @example myAnimation.play();
     */
    play(): void;
    /**
     * Para a animação completamente, limpa seus recursos e redefine seu estado.
     * @example myAnimation.stop();
     */
    stop(): void;
    /**
     * Um atalho para `stop()` seguido de `start()`. Reinicia a animação.
     * @see {@link stop}
     * @see {@link start}
     * @example myAnimation.restart();
     */
    restart(): void;
}
