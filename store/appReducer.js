import { PlaySound, StopSound } from "react-native-play-sound";
import interval from "../interval";

const INITIAL_STATE = {
  medTimerSet: "01:00",
  shockTimerSet: "01:00",
  soundSelected: "Floop",
  log: [],
  isPlaying: false,
  speed: 110,
  sounds: null,
  medTimer: "00:00",
  medTimerShow: false,
  shockTimer: "00:00",
  shockTimerShow: false,
  startTimer: "00:00:00",
  startTimerShow: false,
  renderUpdate: false
};

const appReducer = (state = INITIAL_STATE, action) => {
  let newState = Object.assign({}, state);
  let data = action.payload;

  switch (action.type) {
    case "SET_SOUNDS":
      newState.sounds = {
        Beep: new interval(60000 / newState.speed, () => {
          if (newState.isPlaying === true) {
            StopSound();
          }
          PlaySound("beep");
        }),
        Click: new interval(60000 / newState.speed, () => {
          if (newState.isPlaying === true) {
            StopSound();
          }
          PlaySound("click");
        }),
        Floop: new interval(60000 / newState.speed, () => {
          if (newState.isPlaying === true) {
            StopSound();
          }
          PlaySound("floop");
        }),
        Laser: new interval(60000 / newState.speed, () => {
          if (newState.isPlaying === true) {
            StopSound();
          }
          PlaySound("laser");
        }),
        Metal: new interval(60000 / newState.speed, () => {
          if (newState.isPlaying === true) {
            StopSound();
          }
          PlaySound("metal");
        }),
        Pew: new interval(60000 / newState.speed, () => {
          if (newState.isPlaying === true) {
            StopSound();
          }
          PlaySound("pew");
        }),
        Zap: new interval(60000 / newState.speed, () => {
          if (newState.isPlaying === true) {
            StopSound();
          }
          PlaySound("zap");
        })
      };
      return newState;

    case "CLEAR_LOG":
      newState.log = [];
      return newState;

    case "UPDATE_LOG":
      newState.log.push({ item: data, key: String(newState.log.length + 1) });
      return newState;

    case "TOGGLE_ISPLAYING":
      newState.isPlaying = !newState.isPlaying;
      return newState;

    case "UPDATE":
      newState = Object.assign(newState, data);
      return newState;

    default:
      return state;
  }
};

export default appReducer;
