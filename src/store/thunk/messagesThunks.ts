import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store";
import MessagesAction from "../actions/messagesActions";
import {MessagesActionType} from "../actions/actionTypes";
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../../firebase";
import Message from "../../models/Message";

export const getMessages = (id: string):
    ThunkAction<void, RootState, unknown, MessagesAction> => {
  return async (
      dispatch: ThunkDispatch<RootState, unknown, MessagesAction>) => {
    try {
      dispatch({type: MessagesActionType.LOAD});
      const coll = collection(firestore, "messages");
      const messagesQuery = query(coll, where("id", "==", id));

      let messages: Message[] = [];
      const response = await getDocs(messagesQuery);
      response.forEach((doc)=> {
        messages.push(doc.data() as Message);
      });
      dispatch({type: MessagesActionType.LOADED, payload: messages});
    } catch (err: any) {
      dispatch({type: MessagesActionType.ERROR, payload: err});
    }
  }
}