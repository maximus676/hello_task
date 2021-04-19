import React from "react";
import s from "./Modal.module.scss";
import exit from "../../Icons/exit.png";



type PropsType = {
    isAuth: boolean
    greeting: string

    toggleModal:(isAuth:boolean) => void
}

const AuthModal: React.FC<PropsType>  = (props) => {

    const onExit = () => {
        props.toggleModal(false)
   }

    return (
        <div className={props.isAuth ? s.container__open : s.container }>
            <div className={s.container__content}>
                <div className={s.block__exit}>
                    <img className={s.exit} src={exit} onClick={onExit}/>
                </div>
                <div className={s.block__logo}>
                    {props.greeting}
                </div>
            </div>
        </div>
    );
}


export default AuthModal;