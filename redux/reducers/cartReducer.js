let defaultState = {
    selectedItems: { items: [], restaurantName: "" },
};

let cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            let newState = { ...state };

            // when we add to cart (checkboxValue=true), update state with selected items and restaurant Name
            if (action.payload.checkboxValue) {
                console.log("ADD TO CART");

                newState.selectedItems = {
                    items: [...newState.selectedItems.items, action.payload],
                    restaurantName: action.payload.restaurantName,
                };
            } else {
                // checkboxValue=false
                console.log("REMOVE FROM CART");
                // if item currently in store (cart) now has checkboxValue=false,
                // then filter that item out by the title from the payload of the just unselected item
                newState.selectedItems = {
                    items: [
                        ...newState.selectedItems.items.filter(
                            (item) => item.title !== action.payload.title
                        ),
                    ],
                    restaurantName: action.payload.restaurantName,
                };
            }
            console.log(newState, "👉");
            return newState;
        }

        default:
            return state;
    }
};

export default cartReducer;
