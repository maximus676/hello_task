import React, { Component } from "react";
import s from "./App.module.scss";
import { observer, inject } from "mobx-react";
import { GlobalStore } from "./stores/mobxStore";
import AuthModal from "./component/Modal/AuthModal";
import { ChangeEvent } from 'react';

interface AppProps {
  mobxStore?: GlobalStore;
}

interface AppState {
  name: string
  surname: string
  isAuth:boolean
  nameError: string
  surnameError: string
}

@inject("mobxStore")
@observer
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      name: "",
      surname: "",
      isAuth:false,
      nameError: "",
      surnameError:"",
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onSurnameChange = this.onSurnameChange.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.clearState = this.clearState.bind(this)
    this.setErrorName = this.setErrorName.bind(this)
    this.setErrorSurname = this.setErrorSurname.bind(this)
  }

  onNameChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({name: e.target.value})
  }

  onSurnameChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({surname:  e.target.value})
  }

  toggleModal() {
    this.setState({isAuth: !this.state.isAuth})
  }
  clearState() {
    this.setState({name:"", surname:""})
  }
  setErrorName(){
    this.setState({nameError:"Введите имя *"})
  }
  setErrorSurname(){
    this.setState({surnameError:"Введите фамилию *"})
  }

  render() {
    const { greeting } = this.props.mobxStore!;    //greeting строка приветствия

    return (
      <div className={s.App}>
        <header className={s.App__header}>
          <AuthModal  greeting={greeting.toString()} toggleModal={this.toggleModal} isAuth={this.state.isAuth}/>
          <form onSubmit={this.submitForm} className={s.container__form}>
            <input id={"name"} placeholder={"name"} onChange={this.onNameChange} value={this.state.name} className={s.input}/>
            <label htmlFor={"name"} className={s.Error}>{this.state.nameError}</label>
            <input id={"surname"} placeholder={"surname"} onChange={this.onSurnameChange} value={this.state.surname} className={s.input} />
            <label htmlFor={"surname"} className={s.Error}>{this.state.surnameError}</label>
            <button type={"submit"} className={s.button}>
              Готово
            </button>
          </form>
        </header>
      </div>
    );
  }

  private submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const { setName, setSurname } = this.props.mobxStore!;
    const { name, surname } = this.state   // достаю из локального стейта
    if(name !== "" && surname !== ""){
      setName(this.state.name);
      setSurname(this.state.surname);
      this.toggleModal()
      this.clearState()
    }else {
      if (name === ""){
        this.setErrorName()
      }
      if (surname === "") {
        this.setErrorSurname()
      }
    }
  };
}

export default App;
