import React, {useEffect, useState} from 'react'
import {PrisonersPlaceNow} from './index'
import './styles/main.scss'
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import {elementType} from "prop-types";
import {DropData} from "../../../../mock-data";
import {useFetchList} from "../../../../hooks";
import config from "../../../../config";
import {httpClient} from "../../../../services";
import {useParams} from "react-router-dom";
import {Button} from "../../../../components";
import {useNotification} from "../../../../hooks";
export const DrogDrop = (props) => {
    const {isNewPrsonerAdd, boardsList,refetch, boardItemRemove,boardItemUpdata} = props;
    const notif = useNotification()
    const {pr_id} = useParams()
    const [currentBoard, setCurrentBoard] = useState(null)
    const [draggable, setDraggable] = useState(true)
    const [currentItem, setCurrentItem] = useState(null)
    const boardUpdata = async (boardPrisoner) => {
        try {
            setDraggable(false)
          return await httpClient.put(`/rooms/change-prisoner-room`, {...boardPrisoner})
        } catch (err) {
            const {response:{data:{error: {message}}}} = err;
            notif.error(message)
            throw new Error(err)
        }
        finally {
            setDraggable(true)
        }
    }
    const dragOverHandler = (e, board, item)  => {
        e.preventDefault()
        // console.log(board, item,'dranOverHandler')
    }
    const dragLeaveHandler = (e, board, item)  => {
        console.log(board,item, 'dranLeaveHandler')
    }
    const dragStartHandler = (e, board, item)  => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }
    const dragEndHandler = (e, board, item)  => {
        console.log(board,item,'dranEndHandler')
    }
    const dragHandler = async (e, board, item)  => {
        e.preventDefault()
         try {
             await boardUpdata({prisonerId: currentItem.id, fromRoomId: currentBoard.id, toRoomId:board.id})
             await refetch()
         } catch (err) {

         }

    }
    const itemAddUser =async (board) => {
        console.log(board)
        const _items = [Number(pr_id)];
        board.attributes.prisoners.data.forEach(el => {
            _items.push(el.id)
        })
        await httpClient.put(`/rooms/${board.id}`,{data:{prisoners:_items,freePlace: board.attributes.capacity-_items.length}})
            .then(res => {
                refetch()
            })
    }
    return(<div className="row">
        {boardsList?.map((board, index) => {
                return <div key={index} className='col-4 col-md-3 col-sm-6 col-lg-3'>
                    <div className="board__title__wrapper">
                        <div className="board__title">
                            {board.attributes.name}{board.id}
                        </div>
                        {!isNewPrsonerAdd&&<div className="board__icon">
                            <Button onClick={() => boardItemUpdata(board)}><EditIcon/></Button>
                            <Button onClick={() => boardItemRemove(board)}><DeleteIcon/></Button>
                        </div>}
                    </div>
                   <div className='board'>
                       {board?.attributes?.prisoners?.data?.map((item,key) =>
                           <div
                               key={key}
                               onDragOver={(e) => dragOverHandler(e, board, item)}
                               onDragLeave={(e) => dragLeaveHandler(e, board, item)}
                               onDragStart={(e) => dragStartHandler(e, board, item)}
                               onDragEnd={(e) => dragEndHandler(e, board, item)}
                               onDrop={(e) => dragHandler(e, board, item)}
                               draggable={draggable}
                               className='item'
                           ><span className='item__text'>
                               <img className='images' src={process.env.REACT_APP_IMAGE_BASE_URL+item.attributes.image} alt="dadsd"/>
                               {item.attributes.sureName} {item.attributes.firstName} <PrisonersPlaceNow index={key+1} text={'Kamerada'}/>
                           </span>
                           </div>
                       )}
                   </div>
                    {isNewPrsonerAdd && board.attributes.freePlace!==0&&<button className='boar__item__add__btn' onClick={() => itemAddUser(board)}>Add+</button>}
                </div>;
            }
        )}
    </div>)
}
