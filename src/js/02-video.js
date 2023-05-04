import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

player.on(
  'timeupdate',
  Throttle(currentTime => {
    console.log('played the video!');

    localStorage.setItem(CURRENT_TIME, Math.floor(currentTime.seconds));
  }, 1000)
);

const savedTime = localStorage.getItem(CURRENT_TIME);
if (!savedTime) {
  return;
}
player.setCurrentTime(savedTime);
