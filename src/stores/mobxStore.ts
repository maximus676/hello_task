import { observable, action, computed } from "mobx";
import { persist } from "mobx-persist";

export interface GlobalStore {
  name: string;
  surname: string;
  greeting: string;
  setName(name: string): void;
  setSurname(surname: string): void;
}

export class MobxStore implements GlobalStore {
  @persist @observable name = "";
  @persist @observable surname = "";

  @computed
  public get greeting(): string {
    return `Hello ${this.name} ${this.surname}`;
  }

  @action.bound
  public setName(name: string): void {
    this.name = name;
  }
  @action.bound
  public setSurname(surname: string): void {
    this.surname = surname;
  }
}
