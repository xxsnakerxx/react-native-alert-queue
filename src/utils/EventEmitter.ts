export class EventEmitter<T> {
  private listeners: Listener<T | undefined>[] = [];

  emit(state?: T): void {
    this.listeners.forEach((listener) => listener(state));
  }

  once(listener: Listener<T | undefined>): Unsubscribe {
    const onceWrapper = (state?: T) => {
      listener(state);
      this.off(onceWrapper);
    };

    return this.on(onceWrapper);
  }

  on(listener: Listener<T | undefined>): Unsubscribe {
    this.listeners.push(listener);

    return () => this.off(listener);
  }

  off(listener: Listener<T | undefined>): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}

type Listener<T> = (value?: T) => void;

type Unsubscribe = () => void;
