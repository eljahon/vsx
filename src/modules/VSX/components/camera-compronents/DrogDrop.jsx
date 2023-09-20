import React, {useEffect, useState} from 'react'
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'
import {PrisonersPlaceNow} from './index'
import './styles/main.scss'
import { ReactComponent as DeleteIcon } from "assets/icons/profile-step.svg";
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
    const {isNewPrsonerAdd, boardsList,refetch, boardItemRemove,boardItemUpdata, routerPush} = props;
    console.log(boardsList)
    const notif = useNotification()
    const {pr_id} = useParams()
    const [fileurl, setFileUlr] = useState(config.FielUrl)
    const boardUpdata = async (boardPrisoner, e) => {
        try {
            if(e && e.stopPropagation) e.stopPropagation();
            console.log(boardPrisoner)
          return await httpClient.put(`/rooms/change-prisoner-room`, {...boardPrisoner})
        } catch (err) {
            const {response:{data:{error: {message}}}} = err;
            notif.error(message)
            throw new Error(err)
        }
    }
    const handlerItem = (item) => {
        routerPush(item.id)
    }
    const boardItemSee = async (boardPrisoner, e) => {
        if(e && e.stopPropagation) e.stopPropagation();
        console.log(boardPrisoner)
        try {
            // setDraggable(false)
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
    const dragEndHandler = async  ( item)  => {
        console.log(item)
        // const {destination:{droppableId}, draggableId, source:{droppableId}} = item;
        if(item && item.destination && item.source && item.destination.droppableId !== item.source.droppableId) {
            await boardUpdata({prisonerId: item.draggableId, fromRoomId: item.source.droppableId, toRoomId: item.destination.droppableId})
            await refetch()
        }
    }
    const itemAddUser =async (board) => {
        const _items = [Number(pr_id)];
        // board.attributes.prisoners.data.forEach(el => {
        //     _items.push(el.id)
        // })
        await httpClient.put(`/rooms/${board.id}`,{data:{prisoners:_items}})
            .then(res => {
                refetch()
            })
    }
    return(<div className="row">
        <DragDropContext className='w_full' onDragEnd={(result,) => dragEndHandler(result)}>
            <div className="row">
                {boardsList?.map((board, index) => {
                    return <div key={index} className='col-sm-12 col-md-6 col-lg-4 col-xl-4'>
                        <div className="board__title__wrapper" onClick={()=> handlerItem(board)}>
                            <div className="board__title">
                                {board.name}
                            </div>
                            {!isNewPrsonerAdd && <div className="board__icon">
                                <Button onClick={(e) => boardItemUpdata(board,e)}><EditIcon/></Button>
                                {/*<Button onClick={(e) => boardItemSee(board,e)}><DeleteIcon/></Button>*/}
                            </div>}
                        </div>
                        <Droppable type="COLUMN" droppableId={`${board.id}`}  index={index}>
                            {(provided, snapshot) => {
                                return<div {...provided.droppableProps}
                                         ref={provided.innerRef} className='board'>
                                        {board?.prisoners?.map((item, key) =>
                                                <Draggable draggableId={`${item.id}`} key={item.id} index={key}>
                                                    {(provided) => (
                                                        <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            className='item'
                                                        ><span className='item__text'>
                               <img className='images'
                                    src={fileurl+item.image} alt="dadsd"/>
                                                            {item.sureName} {item.firstName}
                                                            <PrisonersPlaceNow index={key + 1} text={'Kamerada'}/>
                           </span>
                                                        </div>
                                                    )}
                                                </Draggable>
                                        )}
                                    </div>
                            }
                            }
                        </Droppable>
                        {isNewPrsonerAdd &&
                            <Button className="bnt" design={'primary'} onClick={() => itemAddUser(board)}>Add+</Button>}
                    </div>
                })}
            </div>
        </DragDropContext>
    </div>)
}
