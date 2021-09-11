import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Toast from "./Toast"
import Loading from "./Loading"


export default function Notify() {
    const {state, dispatch} = useContext(DataContext);
    const { notify } = state;
    return (
        <> 
        {notify.loading && <Loading />}

        {notify.success && 
            <Toast
                message={{ msg: notify.success, title: "Success" }}
                handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                bgColor="bg-success"
            />
        }
        {notify.error && 
            <Toast
                message={{ msg: notify.error, title: "Error" }}
                handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                bgColor="bg-danger"
            />
        }
         {notify.warning && 
            <Toast
                message={{ msg: notify.warning, title: "Ticket sent" }}
                handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                bgColor="bg-warning"
            />
        }

       
    </>
    )
}
