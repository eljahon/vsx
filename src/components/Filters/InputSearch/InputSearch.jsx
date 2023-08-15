import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import './index.scss'
import React from "react";
export  const InputSearch = (props)=> {
    const {text,isInput, value, setValue, time=2000, placeholder} = props;
    const debounce = function (func, time){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, time);
        };
    }
    return <div className="header__search">
         <div className='header__text'>
            <h3> {text}</h3>
         </div>
        {
          !isInput&&  <div className='header__input'>
                <input onInput={(val) => debounce((val) => setValue((old) =>({...old, search: val})))} type="text" placeholder={placeholder} className="header__search__input" />
                <SearchIcon className='icon'/>
            </div>
        }
    </div>
}
