import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.LOGIN:
            newAppState.userType = action.payload;
            newAppState.isLoggedIn = true;
            sessionStorage.setItem("isLoggedIn",String("1"));
            break;
        case ActionType.LOGOUT:
            newAppState.isLoggedIn = false;
            newAppState.userType= null;
            sessionStorage.setItem("isLoggedIn",String("0"));
            break;
        
         
        // case ActionType.GetAllCoupons:
        //     newAppState.coupons = action.payload;
        //     break;
    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}