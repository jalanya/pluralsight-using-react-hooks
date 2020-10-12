import { useEffect, useReducer } from 'react';

import { speakersReducer } from './speakersReducer';
import SpeakerData from './SpeakerData';

function useSpeakerDataManager () {
  const [{ isLoading, speakerList }, dispatch] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
  });

  function toggleSpeakerFavorite(speakerRec) {
    speakerRec.favorite === true ?
      dispatch({type: "unfavorite", id: speakerRec.id}) :
      dispatch({type: "favorite", id: speakerRec.id});
  }

  useEffect(() => {
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      //setSpeakerList(speakerListServerFilter);
      dispatch({
        type: "setSpeakerList",
        data: SpeakerData
      });
    });
    return () => {
      console.log('cleanup');
    };
  }, []); // [speakingSunday, speakingSaturday]);
  return { isLoading, speakerList, toggleSpeakerFavorite };
}

export default useSpeakerDataManager;
