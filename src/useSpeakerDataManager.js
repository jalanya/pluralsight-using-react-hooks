import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { speakersReducer } from './speakersReducer';
//import SpeakerData from './SpeakerData';

function useSpeakerDataManager () {
  const [{ 
    isLoading, 
    speakerList, 
    favoriteClickCount,
    hasErrored,
    error
  }, dispatch] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
    favoriteClickCount: 0,
    hasErrored: false,
    error: null,
  });

  function incrementFavoriteClickCount() {
    dispatch({
      type: 'incrementFavoriteClickCount',
    });
  }

  function toggleSpeakerFavorite(speakerRec) {
    const updateData = async function() {
      axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, speakerRec);
      speakerRec.favorite === true ?
        dispatch({type: "unfavorite", id: speakerRec.id}) :
        dispatch({type: "favorite", id: speakerRec.id});
    };
    updateData();
  }

  useEffect(() => {
    // new Promise(function (resolve) {
    //   setTimeout(function () {
    //     resolve();
    //   }, 1000);
    // }).then(() => {
    //   //setSpeakerList(speakerListServerFilter);
    //   dispatch({
    //     type: "setSpeakerList",
    //     data: SpeakerData
    //   });
    // });
    const fetchData = async function() {
      try {
        let result = await axios.get('http://localhost:4000/speakers');
        dispatch({type: 'setSpeakerList', data: result.data})
      } catch (e) {
        dispatch({type: 'errored', error: e });
      }
    }
    fetchData();
    return () => {
      console.log('cleanup');
    };
  }, []); // [speakingSunday, speakingSaturday]);
  return {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
    hasErrored,
    error,
  };
}

export default useSpeakerDataManager;
