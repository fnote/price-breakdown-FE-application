/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 9/30/20. Wed 2020 13:19
 */

const initialState = {
    businessUnits: [
        { id: '054', name: 'Philadelphia' },
        { id: '067', name: 'New York'},
    ]
};

export default function appReducer(state = initialState) {
    return state;
}
