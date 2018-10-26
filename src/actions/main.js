import {
  ACTION_CHANGE_FIRST_NAME,
  ACTION_CHANGE_SECOND_NAME
} from "../constants/main";

export const changeFirstName = value => {
  return {
    type: ACTION_CHANGE_FIRST_NAME,
    payload: value
  };
};

export const changeSecondName = value => {
  return {
    type: ACTION_CHANGE_SECOND_NAME,
    payload: value
  };
};
