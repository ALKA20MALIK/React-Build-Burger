import { put, delay } from 'redux-saga/effects';
import axios from '../../axios';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

export function* initIngredientsSaga() {
    const response=yield axios.get('https://burger-builder-9c141.firebaseio.com/ingredients.json')

    try {
        yield put(actions.setIngredients(response.data));
    }
    catch(error) {
        yield put(actions.fetchIngredientsFailed());
    }

}