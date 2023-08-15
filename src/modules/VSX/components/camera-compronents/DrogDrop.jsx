import React, {useState} from 'react'
import {PrisonersPlaceNow} from './index'
import './styles/main.scss'
import {elementType} from "prop-types";
import {DropData} from "../../../../mock-data";
export const DrogDrop = (props) => {
    const {isNewPrsonerAdd} = props;
    const [boards, setBoards] = useState(DropData)
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const dranOverHandler = (e, board, item)  => {
        e.preventDefault()
        if(e.target.className == 'item') {
            e.target.style.boxShadow = '0 2px 3px gray'
        }
    }
    const dranLeaveHandler = (e, board, item)  => {
        console.log("dranLeaveHandler")
        // e.target.style.boxShadow = 'none'
    }
    const dranStartHandler = (e, board, item)  => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }
    const dranEndHandler = (e, board, item)  => {
        console.log("dranEndHandler")
        // e.target.style.boxShadow = 'none'
    }
    const dranHandler = (e, board, item)  => {
        e.preventDefault()
        if(currentBoard.id === board.id) return
        const  currentIndex = currentBoard.items.indexOf(currentItem)
        const removeItem=currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
       const itemdrop =  board.items.splice(dropIndex+1, 1, currentItem)
        console.log(board, item, removeItem, itemdrop)
        setBoards(boards.map((b) => {
            if(b.id == board.id) {
                return board
            }
            if(b.id === currentBoard.id) {
                return currentBoard
            }
            return b;
        }))

    }
    const itemAddUser = (board) => {
        console.log(board)
            const _Array = boards.map(el => {
                if(el.id === board.id){
                    el.items.push({id: Math.round(Math.random()*10000), title: `prisoners ${Math.round(Math.random()*10000)}`});
                    return el;
                }
                return el;
            })
        setBoards(_Array)
    }
    return(<div className="row">
        {boards.map((board, index) => {
                return <div key={index} className='col-4 col-md-3 col-sm-6 col-lg-3'>
                    <h2 className="board__title">
                        {board.title} {index+1}
                    </h2>
                   <div className='board'>
                       {board.items.map((item, key) =>
                           <div
                               key={key}
                               onDragOver={(e) => dranOverHandler(e, board, item)}
                               onDragLeave={(e) => dranLeaveHandler(e, board, item)}
                               onDragStart={(e) => dranStartHandler(e, board, item)}
                               onDragEnd={(e) => dranEndHandler(e, board, item)}
                               onDrop={(e) => dranHandler(e, board, item)}
                               draggable={true}
                               className='item'
                           ><span className='item__text'>
                               {key+1} {item.title} <PrisonersPlaceNow index={key+1} text={'Kamerda'}/>
                           </span>
                           </div>
                       )}
                   </div>
                    {isNewPrsonerAdd&&<button className='boar__item__add__btn' onClick={() => itemAddUser(board)}>Add+</button>}
                </div>;
            }
        )}
    </div>)
}
