import {
  ADD_NEW_FRIEND,
  NEW_OUTGOING_REQUEST,
  NEW_INCOMING_REQUEST,
  DELETE_OUTGOING_REQUEST,
  DELETE_INCOMING_REQUEST
} from '../constants/friends';

export function AddNewFriend(friend) {
  return {
    type: ADD_NEW_FRIEND,
    friend,
  };
}

export function NewOutgoingRequest(request) {
  return {
    type: NEW_OUTGOING_REQUEST,
    request,
  };
}

export function NewIncomingRequest(request) {
  return {
    type: NEW_INCOMING_REQUEST,
    request,
  };
}

export function DeleteOutgoingRequest(request) {
  return {
    type: DELETE_OUTGOING_REQUEST,
    request,
  };
}

export function DeleteIncomingRequest(request) {
  return {
    type: DELETE_INCOMING_REQUEST,
    request,
  };
}
